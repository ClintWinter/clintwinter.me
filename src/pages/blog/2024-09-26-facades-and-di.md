---
layout: ../../layouts/BlogPostLayout.astro
title: "Creating a Facade in Laravel"
author: Clint Winter
slug: facade
publishedAt: 2024-09-26 20:00:00
---

Here's a cheat sheet on how to make your simple service class more useful by adding dependency injection, a facade, and a way to easily swap in a fake.

The skeleton is simple:
* The original service class
* Create a contract the service class abides by
* In a service provider, register the service class in the container
* Create a facade
* Create a fake implementation of the contract that can be swapped for testing

## The original service class

Here's our original service class that we are starting with (apologies for not having a compelling example, but it isn't really necessary to contrive one for this).

```php
<?php

namespace App\Foo;

class FooService
{
    public function foo(): string
    {
        return 'bar';
    }

    public function fizz(): string
    {
        return 'buzz';
    }
}
```

First, we should create a contract so we can ensure that our eventual fake and our original service both meet expectations. As well as any future implementations.


```php
<?php

namespace App\Foo\Contracts;

interface Foo
{
    public function foo(): string;

    public function fizz(): string;
}
```

Don't forget to make sure the service implements it.

```php
<?php

namespace App;

use App\Foo\Contracts\Foo;

class FooService implements Foo
{
   // ...
}
```

Next, we should bind the concrete implementation to the contract in our service provider.

```php
<?php

namespace App\Providers;

use App\Foo\Contracts\Foo;
use App\FooService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(Foo::class, FooService::class);
    }

   // ...
}
```

Now, we can create our facade class.

```php
<?php

namespace App\Foo\Facades;

use Illuminate\Support\Facades\Facade;

/**
* @method static string foo(): string
* @method static string fizz(): string
*/
class Foo extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \App\Foo\Contracts\Foo::class;
    }
}
```

The facade simply needs the name of the binding it will pull from the container to be returned from `getFacadeAccessor`. In our case, that's the name of the contract that currently has our service bound to it.

> Note that if you want IDE support, you'll have to re-define the method signatures in the doc block above the class.

At this point, we can use our facade.

```php
<?php

namespace App\Http\Controllers;

use App\Foo\Facades\Foo;

class FooController extends Controller
{
    public function index()
    {
        return response()->json([
            'foo' => Foo::foo(),
        ]);
    }
}
```

Alternatively, we can also inject it as a dependency.


```php
<?php

namespace App\Http\Controllers;

use App\Foo\Contracts;

class FooController extends Controller
{
   public function __construct(protected Foo $foo) {}

    public function index()
    {
        return response()->json([
            'foo' => $this->foo->foo(),
        ]);
    }
}
```

Laravel often offers a neat way to easily fake a facade (`Foo::fake()`).

All we have to do is create the fake implementation of our contract, then add the `fake` method to our facade.

```php
<?php

namespace App\Foo;

use App\Foo\Contracts\Foo;

class FakeFooService implements Foo
{
    public function foo(): string
    {
        return 'fake';
    }

    public function fizz(): string
    {
        return 'very fake';
    }
}
```

And our facade `fake` implementation.

```php
<?php

namespace App\Foo\Facades;

use App\Foo\FakeFooService;
use Illuminate\Support\Facades\Facade;

/**
* @method static string foo(): string
* @method static string fizz(): string
*/
class Foo extends Facade
{
    public static function fake()
    {
        $actual = static::isFake()
            ? static::getFacadeRoot()->sentinel
            : static::getFacadeRoot();

        tap(new FakeFooService($actual), function ($fake) {
            static::swap($fake);
        });
    }

   // ...
}
```

Now let's write a quick test that hits the controller example we created above.

```php
<?php

namespace Tests\Feature;

use App\Foo\Facades\Foo;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class FooTest extends TestCase
{
    public function test_foo(): void
    {
        $response = $this->get('/');

        $response->assertJson(fn (AssertableJson $json)
            => $json->where('foo', 'bar'));
    }

    public function test_fake_foo(): void
    {
        Foo::fake();

        $response = $this->get('/');

        $response->assertJson(fn (AssertableJson $json)
            => $json->where('foo', 'fake'));
    }
}
```

The tests are not useful but they show how easy it is to use our fake. In `test_fake_foo` we get `foo=fake` while `test_foo` returns `foo=bar`.

The fun thing about fakes is that in our fake implementation, we can add extra methods to test anything we may find useful. For example, we could slap a counter in our fake's `foo` method that increments every time we call `foo`. Then we could add a method called `assertFakeCalls` where we can assert that the method was called as many times as we are expecting.

That's it! Not everything needs a facade, but when you are building tools/packages that are used internally, a facade is often a strong pattern to rely upon.
