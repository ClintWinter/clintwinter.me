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

There's nothing wrong with the above solution, to be sure. However, I've seen some mighty complex queries in my time—when there are many conditionals happening, it becomes _very_ confusing to follow along to a conclusive end result.

This is where the `Conditionable` trait shines! It provides the benefit of keeping all the context of the query in a single chain of events. You see the single block of code and know that it all is related. This is more readable compared to seeing disjointed if-statements littered everywhere, where you aren't sure if there are other side-effects happening within them without trying to read and follow every line.

Here is the previous example re-written using the methods afforded by `Conditionable`:

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

All the logic for building our query is now in a single chain. You'll also notice that the predicate of our condition (`$request->query('search')`) is provided back to us in the callback, so we don't have to declare an intermediate variable or re-write the expression.

## Higher-order message

What you may not realize is that these methods are [higher order messages](https://laravel.com/docs/11.x/collections#higher-order-messages) or proxies.

> A higher-order proxy is a shortcut that allows you to chain directly to the method name when doing a basic function.

This means we can chain `when` directly, and apply the subsequent method when the condition is true. For example:

```php
$email = $request->query('email');

$query->when($email)->where('email', $email);
```

The trait also provides a _zero_ argument version which uses the subsequent method as the condition and the method after that as the conditionally applied modifier. The use-case is niche, but useful when you recognize the opportunity.

```php
now()->when()->isWeekend()->nextWeekDay();
```

## How to implement yourself

The awesome thing about many of these internal patterns, including `Conditionable`, is that you don't have to do almost any leg-work. To use the power of the `Conditionable` trait, add it to a class that you think it would benefit.

The caveat is to not get carried away with it since it's so fun to use. Personally, I would reserve its use to _Builder_ pattern classes, or classes that have a large API surface area where many method calls are expected behavior. Other examples where Laravel uses `Conditionable` are in collections, Carbon, and pending batches.

## More on higher-order proxies

The `Conditionable` trait is cool, but it's cool because the underlying pattern of higher-order proxies are really cool. Laravel uses them everywhere. 

* `HigherOrderWhenProxy` — used in `Conditionable` like we just covered.
* `HigherOrderCollectionProxy` — used by collections.
* `HigherOrderTapProxy` — used by the `tap` helper and therefor by the `Tappable` trait.

### How do they work?

Well, they work thanks to ✨magic✨. No, seriously—PHP magic methods to be exact. Take a look at the code for the `HigherOrderTapProxy` for yourself. It's alarmingly simple (comments removed).

```php
<?php

namespace Illuminate\Support;

class HigherOrderTapProxy
{
    public $target;

    public function __construct($target)
    {
        $this->target = $target;
    }

    public function __call($method, $parameters)
    {
        $this->target->{$method}(...$parameters);

        return $this->target;
    }
}
```

Literally all this class does is make sure you have the original thing you are tapping returned back to you.

Let's look at a simple example before I explain the code.

```php
public function updateContact(Contact $contact, array $data): Contact
{
  return tap($contact)->update($data);
}
```

The `tap()` function passes its argument to the `HigherOrderTapProxy` constructor. `update` normally returns a boolean, but because of `tap` it returns the `$contact`.

So what's going on here? `HigherOrderTapProxy` has a method `__call()`, which, if you're not aware, will be called any time a method is called that does not exist on the class. It's like a catch-all.

The order of operations goes like this:
* `tap($contact)` returns a `HigherOrderTapProxy` instance.
* We call `update($data)`, and it's actually invoking the `__call($method, $parameters)` on the proxy object.
* It passes the method call (`update`) to the target held by the proxy (`$contact`) and then returns `$contact`.

Pretty cool, huh?

All the other proxy classes operate in similar ways, sometimes using `__get()`, too.

## Conclusion

Some developers operating from a different set of ideals do not like Laravel because of its use of magic like we've seen in this article. Whether you should like it or not is for you to decide. Either way, Laravel has some interesting patterns under the hood, and I encourage you to take the time to look below the surface and understand them. You'll learn a lot, and it'll make you a better developer.

## Resources

* [Laravel docs](https://laravel.com/docs/11.x/collections#higher-order-messages)
* [Laravel framework repository](https://github.com/search?q=repo%3Alaravel%2Fframework+HigherOrder&type=code)
