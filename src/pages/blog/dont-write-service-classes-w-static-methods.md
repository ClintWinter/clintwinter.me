---
layout: ../../layouts/BlogPostLayout.astro
title: "Don't Use Service Classes with Static Methods"
author: Clint Winter
publishedAt: 2022-03-22 16:05:31
createdAt: 2022-03-21 15:34:30
updatedAt: 2022-12-27 23:21:20
---

A service class in the context of this post is a class used to encapsulate domain logic. When creating an endpoint to create a new blog post, for example, many will opt to put the core logic of creating that new post inside of a service class method rather than operate directly in the controller.

The reason developers choose to encapsulate that logic is usually to be able to reuse it in other places within the project. For instance, when creating a blog post may be possible through their front-end implementation or their API.

# Why static methods are used in the first place

It's hard to determine exactly why this pattern is used, but my guess would be this: It resembles a clean design (like a Facade pattern could provide) without the overhead. Instead of writing out the boilerplate to turn the class into a usable facade, it's easier to drop a `static` keyword in front of the method. And just like a facade, it looks clean. You don't have to do any ugly dependency injection.

```php
class PostService
{
  public static function create()
  {
    // do some creating...
  }
}

class PostController
{
  public function store(Request $request)
  {
    // validate and whatever else...
    PostService::create($request->all());

    return back();
  }
}
```
Doesn't that look awesome?

# Why you shouldn't do it

Testing.

You are going to have a hell of a time trying to test anything that utilizes these service classes. Let's say you're testing a controller method that uses a service. That service does a lot of complex logic behind the scenes. You'll have to arrange everything that the service needs to execute without failure from within your test. All just to test this other unrelated thing.

There are ways (sorta) to [mock a static method](https://docs.mockery.io/en/latest/reference/public_static_properties.html#mocking-public-static-methods), but is not recommended, which is even stated directly in the Mockery documentation.

The moral of the story is, save yourself a lot of headaches down the road and stick with good, old-fashioned dependency injection. With Laravel, using the container to auto-resolve all of your dependencies is a cinch anyway.

# The easiest alternative

```php
class PostController
{
  public function store(Request $request, PostService $service)
  {
    // validate and whatever else...
    $service->create($request->all());

    return back();
  }
}
```

Let's be honest, the code block above isn't much worse, especially when you think about how much easier testing will be.

# How to test

Laravel leverages the container to auto-resolve your dependencies, so they've provided [a way to hijack that and sub in a mocked version](https://laravel.com/docs/9.x/mocking#mocking-objects).

```php
$this->mock(PostService::class, function (MockInterface $mock) {
    $mock->shouldReceive('create')->once();
});
```
