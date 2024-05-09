---
layout: ../../layouts/BlogPostLayout.astro
title: "Digging into Laravel's Conditionable trait"
description: "A dive into Laravel's Conditionable trait: how to use it and how it works under the hood."
author: Clint Winter
publishedAt: 2024-05-07 18:07
createdAt: 2024-05-07 18:07
---

`Conditionable` is a trait that adds two methods to any class: `when` and `unless`. They are essentially syntactic sugar. They allow an unbroken chain of method calls that keep the reader from having to continually evaluate whether the next if-block they are looking at is doing anything other than continuing to work with the original object. Its value is most obvious when used by builder classes. A prime example is Eloquent.

A standard implementation of a query that has optional filter parameters would look like this:

```php
<?php

class ContactController
{
    public function index(Request $request)
    {
        $query = Contact::query();
        $search = $request->query('search');

        if ($search) {
            $query->where('first_name', 'like', '%' . $search . '%')
                ->orWhere('last_name', 'like', '%' . $search . '%');
        }

        $contacts = $query->get();

        return view('contacts', ['contacts' => $contacts]);
    }
}
```

There's nothing wrong with the above solution, to be sure. However, I've seen some mighty complex queries in my time — when there are many conditionals happening, it becomes _very_ confusing to follow along to a conclusive end result.

This is where the `Conditionable` trait shines! It provides the benefit of keeping all the context of the query in a single chain of events. You see the single block of code and know that it all is related.

### Two or three argument variant

There are multiple "variants" of the `when` method. The method works differently based on the number of arguments, sort of like a poor man's method overloading.

The two to three argument variant is the most commonly seen variant. The first argument is the _predicate_ — the condition being evaluated for true/false. The second argument is the _consequent_ — the callback that's executed when the condition is truthy. The third and optional argument is the _alternative_ — the callback that's executed when the condition is falsy.

Here is the previous example re-written using the 2-argument variant of `when` afforded by `Conditionable`:

```php
<?php

class ContactController
{
    public function index(Request $request)
    {
        $contacts = Contact::query()
            ->when($request->query('search'), fn (Builder $query, $search)
                => $query->where('first_name', 'like', '%' . $search . '%')
                         ->orWhere('last_name', 'like', '%' . $search . '%'))
            ->get();

        return view('contacts', ['contacts' => $contacts]);
    }
}
```

All the logic for building our query is now in a single chain. You'll also notice that the predicate of our condition (`$request->query('search')`) is provided back to us in the callback (`$search`), so we don't have to declare an intermediate variable or re-write the expression.

### One argument variant

We are going to talk about how this variant and the zero argument variant work in a bit, but first let me explain what they look like.

Here's the syntax:

```php
$conditionable->when(true)->consequent();
```

The one argument variant moves the consequent from the second argument position of the `when` method chained directly after `when`. Take a look at this example to see what I mean.

```php
$email = $request->query('email');

$query->when($email)->where('email', $email);
```

`->where('email', $email)` is only called if `->when($email)` evaluates to true. This variant makes sense if you are calling a single method if the predicate is true.

### Zero argument variant

This one is even more niche than the last variant. It looks like this:

```php
$conditionable->when()->predicate()->consequent();
```

And using a real example, like this:

```php
now()->when()->isWeekend()->nextWeekDay();
```

We call `when()`, and we evaluate `isWeekend()` for truthiness. If truthy, we call `nextWeekDay()`, otherwise skip it.

Like I said, very niche, but neat if you recognize an opportunity.

## Higher-order message

So what black magic is powering this overloaded little trait?

The answer is [higher order messages](https://laravel.com/docs/11.x/collections#higher-order-messages) (or proxies).

> A higher-order proxy is a shortcut that allows you to chain directly to the method name when doing a basic function.

You may have been using Laravel for years without being aware of their existence, but Laravel uses them everywhere.

* `HigherOrderWhenProxy` — used in `Conditionable` like we just covered.
* `HigherOrderCollectionProxy` — used by collections.
* `HigherOrderTapProxy` — used by the `tap` helper and therefor by the `Tappable` trait.

### How does it work?

Well, they work thanks to ✨magic✨. No, seriously — PHP magic methods to be exact. First let's look at `Conditionable`'s `when` method, and then we can dive into the proxy class.

```php
public function when($value = null, callable $callback = null, callable $default = null)
{
    $value = $value instanceof Closure ? $value($this) : $value;
    if (func_num_args() === 0) { // [!code highlight:7]
        return new HigherOrderWhenProxy($this);
    }

    if (func_num_args() === 1) {
        return (new HigherOrderWhenProxy($this))->condition($value);
    }

    if ($value) {
        return $callback($this, $value) ?? $this;
    } elseif ($default) {
        return $default($this, $value) ?? $this;
    }

    return $this;
}
```

Focusing on the highlighted area, we can see the one and zero argument variants are handled here. And those are the ones that use the `HigherOrderWhenProxy`.

As you can see, the one argument variant uses the value passed to `when` as the condition, while the zero argument variant does not set a condition because we didn't provide one!

Now let's look at `HigherOrderWhenProxy` and see how it handles it (once again, comments removed for brevity).

```php
<?php

namespace Illuminate\Support;

class HigherOrderWhenProxy
{
    protected $target;

    protected $condition;

    protected $hasCondition = false;

    protected $negateConditionOnCapture;

    public function __construct($target)
    {
        $this->target = $target;
    }

    public function condition($condition)
    {
        [$this->condition, $this->hasCondition] = [$condition, true];

        return $this;
    }

    public function negateConditionOnCapture()
    {
        $this->negateConditionOnCapture = true;

        return $this;
    }

    public function __get($key)
    {
        if (! $this->hasCondition) {
            $condition = $this->target->{$key};

            return $this->condition($this->negateConditionOnCapture ? ! $condition : $condition);
        }

        return $this->condition
            ? $this->target->{$key}
            : $this->target;
    }

    public function __call($method, $parameters)
    {
        if (! $this->hasCondition) {
            $condition = $this->target->{$method}(...$parameters);

            return $this->condition($this->negateConditionOnCapture ? ! $condition : $condition);
        }

        return $this->condition
            ? $this->target->{$method}(...$parameters)
            : $this->target;
    }
}
```

Fix your eyes on the `__call` method here.

> `__call`, as I said earlier, is a poor man's [method overloading](https://www.php.net/manual/en/language.oop5.overloading.php#object.call). `__call` is triggered whenever we attempt to invoke a method that does not exist on the object that implements it. It takes the method name being invoked and its arguments and you can do whatever you want with it!

The `__call` method diverges into two distinct branches here.

The first branch is the if-block, `! $this->hasCondition`. The zero argument variant does not have a condition. It calls the `$method` on the `$target` (in our original example, the target was `now()` and the method was `isWeekend()`).

Here's something clever: they call their `condition` method with the result of the method call and return it. `condition()` returns `$this` and acts as a form of recursion because then the following method will only be called (`nextWeekDay`) if that previous method (`isWeekend`) was true.

The second branch is the final return statement which, as you can see, simply calls the method if the condition is true. The condition was provided in the `when` method when it was called.

And that is how the `when` proxy works! This blew my mind when I first dug into it. So much power in a couple miniscule files. This is what makes Laravel great in my opinion — truly embodying the artisan ethos.

## How to implement yourself

The awesome thing about many of these internal patterns, including `Conditionable`, is that you don't have to do almost any leg-work. To use the power of the `Conditionable` trait, add it to a class that you think it would benefit.

The caveat is to not get carried away with it since it's so fun to use. Personally, I would reserve its use to _Builder_ pattern classes, or classes that have a large API surface area where many method calls are expected behavior. Other examples where Laravel uses `Conditionable` are in collections, Carbon, and pending batches.

## Conclusion

Some developers operating from a different set of ideals do not like Laravel because of its use of magic like we've seen in this article. Whether you should like it or not is for you to decide. Either way, Laravel has some interesting patterns under the hood, and I encourage you to take the time to look below the surface and understand them. You'll learn a lot, and it'll make you a better developer.

## Resources

* [PHP magic methods](https://www.php.net/manual/en/language.oop5.magic.php)
* [Laravel docs](https://laravel.com/docs/11.x/collections#higher-order-messages)
* [Laravel framework repository](https://github.com/search?q=repo%3Alaravel%2Fframework+HigherOrder&type=code)
