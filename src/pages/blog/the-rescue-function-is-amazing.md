---
layout: ../../layouts/BlogPostLayout.astro
title: "Laravel's \"rescue\" Helper Function is Amazing"
author: Clint Winter
publishedAt: 2022-03-23 16:26:34
createdAt: 2022-03-23 10:00:18
updatedAt: 2022-12-27 23:21:20
---

[The `rescue` function](https://laravel.com/docs/9.x/helpers#method-rescue) is an alternative to the traditional try/catch block syntax required when you want to manually handle a thrown exception. It takes a callback and executes it inside of a try block for you. The result of the callback will be returned if no exception is thrown. 

Let's look at a typical use-case of a try/catch block.

```php
$country = 'USA';

try {
    $alpha2 = (new ISO3166)->alpha3($country)['alpha2'];
} catch (\Exception $e) {
    $alpha2 = null;
}
```

![Disgusting...](https://media.giphy.com/media/DsdVe5jhHWNC8/giphy.gif)

What an ugly piece of code for something that is really quite simple.

# `rescue` to the rescue

Now let's see that using our fancy new `rescue` function.

```php
$alpha2 = rescue(fn () => (new ISO3166)->alpha3($country)['alpha2']);
```

What happens here is when the callback executes without an exception being thrown, what's returned from the callback is assigned to our `$alpha2` variable. If an exception is thrown, `$alpha2` is assigned `null`.

But what if you don't want the value to be assigned `null`? Well, you have some options.

First, you can return a different value. For example, you may want to get `false` back instead. That's where `rescue`'s second parameter comes in:

```php
$isFalse = rescue(function () {
  throw new Exception;
}, false);
```

Second, you can make the second parameter a callback, where you can do anything you'd normally do inside of a catch block, and whatever is returned from that callback is returned from `rescue` if an exception is thrown. You'll even get the exception as an argument to your callback.

```php
rescue(function () {
  throw new Exception;
}, function ($e) {
  // do exception related stuff

  return false;
});

// => false
```

I don't think this function adds a ton of utility when you're in a situation where you're passing two callbacks to it. However, when you just want to attempt to do something in your first callback and get a different value if it fails, `rescue` is a handy little helper function.

In my opinion, functions like `rescue` are what make programming fun. They strip away the syntax-y parts that are distracting, and can leave you with a clean block of code that focuses on what it's actually doing. It's the epitome of clean code. A simple, reusable, beautiful, little function that allows you to ditch the hideousness of the try/catch block when you can.

For your reading pleasure, here is a real, live coding sample that I've written.

```php
public function getCountryByFormat(string $country, CountryFormat $format): array|null
{
    return rescue(fn () => match ($format) {
        CountryFormat::NAME    => (new ISO3166)->name($country),
        CountryFormat::ALPHA_2 => (new ISO3166)->alpha2($country),
        CountryFormat::ALPHA_3 => (new ISO3166)->alpha3($country),
        CountryFormat::NUMERIC => (new ISO3166)->numeric($country),
    }, null, false);
}
```

> NOTE: That third parameter of `false` tells the function not to report the exception to the error logger. Since we are kind of *expecting* this exception, we don't want to report it. Watch out for that potential gotcha.

For comparison's sake, here's what it would look like in a try/catch block.

```php
public function getCountryByFormat(string $country, CountryFormat $format): array|null
{
    try {
        return match ($format) {
            CountryFormat::NAME    => (new ISO3166)->name($country),
            CountryFormat::ALPHA_2 => (new ISO3166)->alpha2($country),
            CountryFormat::ALPHA_3 => (new ISO3166)->alpha3($country),
            CountryFormat::NUMERIC => (new ISO3166)->numeric($country),
        };
    } catch (\Exception $e) {
        return null;
    }
}
```

A pretty sweet improvement if you ask me. Thanks Taylor Otwell!

Now that you know about `rescue`, I expect you'll be using it all over the place like me. Enjoy!
