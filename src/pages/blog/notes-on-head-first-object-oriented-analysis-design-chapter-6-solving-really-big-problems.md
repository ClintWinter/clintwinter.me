---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Chapter 6 - Solving Really Big Problems"
author: Clint Winter
publishedAt: 2020-07-24 14:38:31
createdAt: 2020-07-24 14:38:05
updatedAt: 2022-12-27 23:21:21
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it.

## Definitions

- **Feature** - A high-level description of something a system needs to do.
- **Use Case Diagram** - The *blueprints* for your system. For when you don't want all the details of a use case, but need to know what a system does.
- **Domain Analysis** - Describing a problem using terms the customer will understand.

    The process of identifying, collecting, organizing, and representing the relevant information of a domain, based upon the study of existing systems and their development histories, knowledge captured from domain experts, underlying theory, and emerging technology within a domain.

You solve *big problems* the same way you solve *small problems.* These steps apply to 1000+ class applications just as much as applications with only a couple.

1. Make sure your software does what the customer wants it to do.
2. Apply basic OO principles to add flexibility.
3. Strive for a maintainable, reusable design.

> The best way to look at a *big problem* is to see it as a lot of individual pieces of functionality.

The concepts we already learned help write great big software:

- By encapsulating what varies, you make your application more flexible, and easier to change.
- The best way to get good requirements is to understand what a system is supposed to do.
- Coding to an interface, rather than to an implementation, makes your software easier to extend.
    - This one is even more important in big applications.
- Great software is easy to change and extend, and does what the customer wants it to do.
- Analysis helps you ensure your system works in a real-world context.

### What is the system *like*?

**Commonality** is about what things are similar.

One way you can find out more about a system is to figure out what the system is *like*. In other words, are there some things you do know about that the system functions or behaves like?

### What is the system *not like*?

**Variability** is about what things are different.

Another great way to find out what a system should do is to figure out what it's *not* like. This helps you determine what you don't need to worry about in your system.

Starting with the features of a system is helpful in big projects when you don't have tons of details, and just need to get a handle on where to start.

Example:

A feature may be that we want to support different types of terrain for a turn-based strategy game. That expands into multiple requirements for the developer.

- A tile is associated with a terrain type
- Game designers can create custom terrain types
- Each terrain type has characteristics that affect movement of units

> Get *features* from the customer, and then figure out the *requirements* you need to *implement* those features.

Use cases don't always help you see the big picture. Writing use cases is getting into a lot of detail about what the system should do.

> Always *defer details* as long as you can.

Use Case Diagram:

![Imgur](https://i.imgur.com/J2fQPOw.png)

Use your feature list to make sure your use case diagram is complete. Take your use case diagram, and make sure that all the uses cases you listed will cover all the features you got from the customer.

Use a feature or requirement list to capture the **BIG THINGS** that your system needs to do.

Draw a use case diagram to show what your system **IS** without getting into unnecessary detail

**Domain Analysis** lets you check your designs, and still speak the customer's language. If you hand the customer UML diagrams to review, they will be confused. We need to find out if our feature list is what they are looking for, and we can't do that unless we speak the same language.

Next we can break up the big problem into different pieces of functionality—and then use what we've learned to tackle each of those pieces of functionality, one at a time.

You may want to break the project up into "modules". For example, a "Unit" module may be where classes representing troops, armies, and related functionality will go.

Domain analysis helps you avoid building parts of a system that *aren't your job to build.*

Libraries and Frameworks help give us functionality, but they don't help us structure our applications in ways that are easier to understand. That's where Design Patterns come in.

A Design pattern is a way to design the solution for a particular type of problem. Once your brain has good working knowledge of patterns, you can start applying them to your designs and rework old code when you find it's degrading into an inflexible mess.

1. We listened to the customer.
2. We made sure we understood the system.
3. We drew up blueprints for the system we're building
4. We broke the big problem up into smaller pieces of functionality
5. We applied design patterns to help us solve the smaller problems

[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
