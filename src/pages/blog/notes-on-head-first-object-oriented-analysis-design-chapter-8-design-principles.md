---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Chapter 8 - Design Principles"
author: Clint Winter
publishedAt: 2020-08-10 10:52:38
createdAt: 2020-08-10 10:52:15
updatedAt: 2022-12-27 23:21:21
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it.
## Originality is Overrated
There's nothing as satisfying as coming up with a completely new and original solution to a problem that's been troubling you for days—until you find out someone else solved the same problem long before you did, and even did better job, too.
This chapter looks at *design principles* that people have invented over the years and how they can make you a better programmer.
## Definitions
- **Design Principle** - A design principle is a basic tool or technique that can be applied to designing or writing code to make that code more maintainable, flexible, or extensible.\n- **Delegation** - Delegation is when you hand over the responsibility for a particular task to another class or method.\n- **Composition** - Composition allows you to use behavior from a family of other classes, and to change that behavior at runtime.\n- **Aggregation** - Aggregation ****is when one class is used as part of another class, but still exists outside of that other class.
## Principles from earlier chapters
- Encapsulate what varies\n- Code to an interface rather than to an implementation\n- Each class in your application should have only one reason to change\n- Classes are about behavior and functionality
> Using proven OO design principles results in more *maintainable*, *flexible*, and *extensible* software.
### Principle #1: The Open-Closed Principle (OCP)
OCP is about *allowing change*, but doing it *without requiring you to modify existing code*.
Classes should be open for extension, and closed for modification.
Once you have a class that works and is being used, you don't want to make changes to it unless you have to. Change is a constant in software development. With OCP, we allow for change through extension rather than through modification of existing code.
### Principle #2: Don't Repeat Yourself Principle (DRY)
Avoid duplicate code by abstracting out things that are common and placing those things in a single location.
> The *wrong abstraction* is **worse** than having duplicate code, so consider holding off in some scenarios until the situation becomes more clear. Otherwise, don't be afraid to reverse the abstraction and try it again if the abstraction becomes messy and no longer serves its original purpose.
When you're trying to avoid duplicate code, you're really trying to make sure that you only implement each feature and requirement in your application one single time.
DRY is about having each piece of information and behavior in your system in a *single, sensible place*.
### Principle #3: The Single Responsibility Principle (SRP)
You want each object that you design to have just one responsibility to focus on—and when something about that responsibility changes, you'll know exactly where to look to make those changes in your code.
You've implemented the Single Responsibility Principle correctly when each of your objects has *only one reason to change*.
**Cohesion** is just another name for the SRP. If you're writing highly cohesive software, then the SRP is likely correctly being applied.
**A simple test for spotting multiple responsibilities:**
For every method in a class, write this line:
\"The <classname> <method> itself. \"
Does each line make sense? Does your class really have the responsibility that the method indicates it does?
If it doesn't, you're probably violating the SRP with that method. Think about moving the class.
Example:
```\nAutomobile\n---\nstart()\nstop()\nchangeTires()\ndrive()\nwash()\ncheckOil()\ngetOil()\n```
- The Automobile start(s) itself.\n- The Automobile stop(s) itself.\n- ~~The Automobile changes tires itself.~~\n- ~~The Automobile drive(s) itself.~~\n- ~~The Automobile wash(es) itself.~~\n- ~~The Automobile checks oil itself.~~\n- The Automobile gets oil itself.
Now we can properly move the methods that don't make sense to a class that does make sense:
```\nAutomobile\n---\nstart()\nstop()\ngetOil()
Driver\n---\ndrive(Automobile)
Carwash\n---\nwash(Automobile)
Mechanic\n---\nchangeTires(Automobile, Tires[*])\ncheckOil(Automobile)\n```
When using the analysis method above with methods that have parameters, we can include the parameter in the method blank like so: \"The CarWash washes (an) automobile itself.\"
Use common sense if the Automobile is being injected through the constructor instead of being passed as a parameter.
### Principle #4: The Liskov Substitution Principle (LSP)
Subtypes must be substitutable for their base types.
The LSP is all about *well-designed inheritance*. When you inherit from a base class, you must be able to *substitute your subclass* for that base class without things going terribly *wrong*. Otherwise, you've used inheritance incorrectly.
The problem is often from over-using or incorrectly using inheritance.
Delegate functionality to another class
One alternative to inheritance is **delegation**. Delegation is when you hand over the responsibility for a particular task to another class or method.
Delegation is best used when you want to use another class's functionality, as is, without changing that behavior at all. 
If you need to use functionality in another class, but you *don't want to change* that functionality, consider using delegation instead of inheritance.
Use composition to assemble behaviors from other classes
**Composition** allows you to use behavior from a family of other classes, and to change that behavior at runtime.
Composition is most powerful when you want to use behavior defined in an interface, and then *choose* from a variety of implementations of that interface, at both compile time and run time.
When an object is composed of other objects, and the owning object is destroyed, *the objects that are part of the composition are destroyed, too*.
Example:
We have a `Unit` class that has a composition relationship with the `Weapon` interface and its implementations. We create a new Unit and assign its weapon property to an instance of `Sword`. What happens if this unit is destroyed? Both the unit and the sword instances are thrown away. The sword doesn't exist outside of the unit object.
> In composition, the object composed of other behaviors *owns* those behaviors. When the object is destroyed, *so are all of its behaviors*. The behaviors in composition *do not exist* outside of the composition itself.
Aggregation: composition, without the abrupt ending
**Aggregation** is when one class is used as part of another class, but still exists outside of that other class.
When deciding on whether to use aggregation vs composition, ask yourself: *Does the object whose behavior I want to use exist outside of the object that uses its behavior?*
Example:
The `Unit` holding a weapon is able to give the `Weapon` to an `Inventory` class. That means the weapon exists outside of the unit that uses the weapon, and should use aggregation instead of composition.
A quick refresher on our alternatives to inheritance:
- **Delegation** - *Delegate* behavior to another class when you don't want to change the behavior, but it's not your object's responsibility to implement that behavior on its own.\n- **Composition** - You can reuse behavior from one or more classes, and in particular from a family of classes, with *composition*. Your object completely owns the composed objects, and they do not exist outside of their usage in your object.\n- **Aggregation** - When you want the benefits of composition, but you're using behavior from an object that does exist outside of your object, use *aggregation*.
(All three of these OO techniques allow you to reuse behavior *without* violating the LSP.)
> **If you favor delegation, composition, and aggregation OVER inheritance, your software will usually be more flexible, and easier to maintain, extend, and reuse.**
[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
