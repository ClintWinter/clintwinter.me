---
layout: ../../layouts/BlogPostLayout.astro
title: "PHP Attributes: Use Conservatively"
description: PHP Attributes can provide interesting solutions, but often there's a better way.
author: Clint Winter
publishedAt: 2022-03-29 19:58:02
---

[PHP Attributes](https://www.php.net/manual/en/language.attributes.overview.php), introduced in PHP 8, open up a lot of interesting new patterns. However, similar to the outdated but cliché saying: "PHP allows for poor development practices", I think attributes allow for some wonky programming, which is why my instincts say use them sparingly. Don't revert to a junior developer who just discovered design patterns and start shoe-horning them into every possible solution.

One example to look at is Spatie's [data-transfer-object package](https://github.com/spatie/data-transfer-object). In this case, they can be an interesting way to provide a different DX (Developer Experience).

I like to think of Attributes as ways to tag various structures in your PHP code.

# My Experience

In our Laravel application we use a package for filtering our models, used like so:

```php
// the array provided usually gets 
// passed in directly from the request
Model::filter([
  'created_at' => ['>', '2022-03-01'],
  // ...
]);
```

The `filter` method invokes a filter class that will call methods that match the keys of the filters provided here and build a query for us.

Well, we expanded the package to also handle sorting and some advanced filter stuff that requires different data depending on the keys passed into the `filter` method. The problem was the logic that found the method and passed the data to it was too rudimentary for our new use-cases. We needed to handle it differently based on what we wanted it to do.

Initially, I started going down a rabbit hole of logic that checked the data being passed to each item in the filter array, but this was unreliable as the data could be incorrect and sometimes it was just plain impossible to differentiate.

It was something along the lines of, "If the value is an array, treat it like a filter; if it's a string, treat it like a sort...", and you can see how that goes... to a bad place no doubt.

# Enter Attributes

Attributes were the saving grace in this scenario. For the methods that were supposed to function as filters, we had to pass data to those methods in a certain way. To determine if that was the case, I simply added an attribute to those methods.

```php title="FilterClass.php"
use Attributes\Filter;

class FilterClass
{
  #[Filter]
  public function filterMe($operation, $data)
  {
    // filtering
  }

  public function sortMe($data)
  {
    // sorting
  }
}
```

Now, the underlying filtering method could check if each method had a `Filter` attribute, and if so, pass the proper signature.

Let's see how to actually check that.

```php
use Attributes\Filter;

class Filter
{
  // This method loops through the key/vals passed 
  // to the Model's `filter()` method.
  public function filterInput()
  {
    foreach ($this->input as $key => $val) {
      $method = $this->getMethod($key);

      // If the method has the attribute, 
      // call the method in our special way.
      if ($this->isFilter($method)) {
        $this->{$method}(...$val);
        continue;
      }      

      // Otherwise, call it the normal way.
      $this->{$method}($val);
    }
  }

  // Get the reflection of the method and 
  // see if it has the Filter attribute attached to it.
  public function isFilter($method)
  {
    return ! empty(
      (new ReflectionMethod($this, $method))
        ->getAttributes(Filter::class)
    );
  }
}
```

```php
// trait on the model

trait HasFilter
{
  public function filter($data)
  {
    return (new Filter($data))->filterInput();
  }
}
```

> Keep in mind, the `Filter` class above is the parent of the filter classes for each model, which is why it's calling the `$method` on itself and is passing `$this` into the `ReflectionMethod` class.

**Ignoring context**, this solution is overall *pretty good*, but not fantastic. Using attributes often feels like a band-aid to me. With a more thoughtful approach to our class design, we could likely come up with something better that doesn't involve attributes. 

**Considering context**, I acknowledge that we are already extending a package's class to do this modification. Sometimes it's safer to take a less involved but more band-aid-like approach like this in order to not over-commit to a bespoke solution that could break because of a change in the underlying package. If we committed to going that far, we may as well write the entire thing ourselves. Who knows, we may end up doing that.

Using attributes here feels like a simple solution that delays us from having to choose a full-on abstraction that could end up being the wrong choice. [Sandi Metz](https://sandimetz.com/) (who you should most certainly be reading) often says to delay your decision-making as much as possible because you'll always know more in the future than you do now. 

I agree with that, so I'm comfortable with my solution.

Happy coding.
