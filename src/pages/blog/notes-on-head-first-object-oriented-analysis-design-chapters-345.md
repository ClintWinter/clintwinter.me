---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Chapters 3/4/5"
author: Clint Winter
publishedAt: 2020-07-24 14:38:30
createdAt: 2020-07-24 14:28:52
updatedAt: 2022-12-27 23:52:14
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it.

## Definitions

- **Noun Analysis** - You do this to your use case to figure out what classes you need in your system.
- **Multiplicity** - Describes how many of a specific type can be stored in an attribute of a class.
- **Attribute** - Equivalent to a member variable in a class.
- **Class Diagram** - Lists all the code-level constructs, along with their attributes and operations.
- **Operation** - This is the UML term that usually represents a method in one of your classes.
- **Association** - Visually shows that one class has a relation to another class, often through an attribute.
- **Verb Analysis** - Helps you figure out the candidates for methods on the objects in your system.

In the real world, requirements are always changing, and it's up to you to roll with these changes and keep the customer satisfied.

> *The one thing you can always count on in writing software is change*.

**Abstract classes** are *placeholders* for actual implementation classes.

The abstract class *defines behavior,* and the subclasses *implement that behavior*.

> Whenever you find common behavior in two or more places, look to abstract that behavior into a class, and then reuse that behavior in the common classes.

Coding to an **interface**, rather than an implementation, makes your software *easier to extend*.

By coding to an interface, your code will work with *all* of the interface's subclasses—even ones that *haven't been created yet*.

**Encapsulation** also helps you *protect your classes from unnecessary changes*. Anytime you have behavior in an application that you think is likely to change, you want to move that behavior away from parts of your application that probably won't change very frequently. In other words, *encapsulate what varies*.

Software that isn't well-designed falls apart at the first sign of change. The easiest way to make your software resilient to change is make sure *each class has only one reason to change*.

When a class has more than one reason to change, it's probably *trying to do too many things*. Break it up so *each individual class does only one thing*.

```
Automobile
---
start()
stop()
changeTires(Tire [*])
drive()
wash()
checkOil()
getOil(): int

-vs-

Automobile
---
start()
stop()
getOil(): int

CarWash
---
wash(Automobile)

Driver
---
drive(Automobile)

Mechanic
---
checkOil(Automobile)
changeTires(Automobile, Tire [*])
```

Classes are really about ***behavior***.

We know something is wrong with the design, but we aren't sure what. When you don't know how to solve a design problem, run through the OO principles you know, and see if any may help improve the design.

- Inheritance
- Polymorphism
- Abstraction
- Encapsulation

Design is *iterative*...and you have to be willing to *change your own designs*, as well as those that you inherit from other programmers.

When you have a set of properties that vary across your objects, use a collection, like a Map, to store those properties dynamically. You'll remove a lot of methods from your classes, and avoid having to change your code when new properties are added to your app.

Seeing how easy it is to change your software is one of the best ways to figure out if you really have well-designed software.

- How many classes did you have to add to support the change?
- How many classes did you have to change to support the change?
- How many classes would need to change to support new/additional data?

A cohesive class does one thing really well and does not try to do or be something else.

Cohesive classes are focused on *specific tasks*.

Do the methods of your classes all relate to the name of it's class? If you have a method that looks out of place, it might belong somewhere else.

Sometimes it's hard to tell when to stop working on the design. If the software works, the customer is happy, and you've done your best to make sure things are designed well, then it may be time to move on. Spending a ton of time to write \"perfect software\" is a waste of time. Spend enough time to write software that's just great or *good enough* and you'll have more success.

[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
