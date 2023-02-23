---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Appendix II (Start Here)"
author: Clint Winter
publishedAt: 2020-07-24 07:50:09
createdAt: 2020-07-24 07:50:04
updatedAt: 2022-12-28 03:21:55
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it. Let's get started!

## Inheritance

When one class inherits behavior from another class, and can then change that behavior if needed.

`Jet` is a subclass of `Airplane`. `Airplane` is the superclass for `Jet`.

`Jet` extends from the `Airplane` class. That means it inherits all of `Airplane`'s behavior to use for its own.

`super` is a special keyword that refers to the class that this class has inherited behavior from.

`Jet` also inherits the `getSpeed()` method from `Airplane`. Since `Jet` uses the same version, we don't need to write any code to change it. 

```java
public class Jet extends Airplane {
	private static final int MULTIPLIER = 2; // the subclass can add its own vars
	public Jet() {
		super(); // calls the constructor of `Airplane`
	}
	public void setSpeed(int speed) {
		// the sublcass can change the behavior of its superclass
		// as well as call the superclass's methods. This is called
		// overriding the superclass's behavior.
		super.setSpeed(speed * MULTIPLIER);
	}
	// a sublcass can add its own methods to the methods it inherits from
	// its superclass
	public void accelerate() {
		// You can call `super.getSpeed()`, but you can also
		// just call `getSpeed()`, just as if `getSpeed()` were
		// a normal method defined in `Jet`.
		super.setSpeed(getSpeed() * 2);
	}
}
```

## Polymorphism

Closely related to inheritance. When one class inherits from another, then polymorphism allows a subclass to stand in for the superclass.

`Jet` subclasses `Airplane`, that means anywhere you use `Airplane`, you can use `Jet`.

```java
Airplane plane = new Airplane();
Airplane plane = new Jet();
Airplane plane = new Rocket();
```

*What's so useful about polymorphism?* 

You can write code that works on the superclass, like `Airplane`, but will work with any subclass type, like `Jet` or `Rocket`, so your code is more flexible.

*I still don't get how polymorphism makes my code flexible.* 

Well, if you need new functionality, you could write a new subclass of `Airplane`. Since your code uses the superclass, your new subclass will work without any changes to the rest of our code. That means your code can change easily.

## Encapsulation

When you hide the implementation of a class in such a way that it is easy to use and easy to change. It makes the class act as a black box that provides a service to its users, but does not open up the code so someone can change it or use it the wrong way. Encapsulation is a key technique in being able to follow the Open-Closed principle. 

If we made the `speed` variable public in our `Airplane` class, that means anyone can use it. Even incorrectly.

[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
