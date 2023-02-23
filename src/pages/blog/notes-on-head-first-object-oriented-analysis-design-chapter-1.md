---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Chapter 1"
author: Clint Winter
publishedAt: 2020-07-24 07:50:14
createdAt: 2020-07-24 07:27:10
updatedAt: 2022-12-27 23:21:21
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it.

## Definitions

- **Flexibility** - Used so that your software can change and grow without constant rework. I keep your application from being fragile.
- **Encapsulation** - Used to keep the parts of your code that stay the same separate from the parts that change; then it's really easy to make changes to your code without breaking everything.
- **Functionality** - Without me, you'll never actually make the customer happy. No matter how well-designed your application is, I'm the thing that puts a smile on the customer's face.
- **Design Pattern** -  All about reuse and making sure you're not trying to solve a problem that someone else has already figured out.

## 3 Steps to DESIGNING GOOD SOFTWARE

1. **Make sure your software does what the customer wants it to do.** We should not be worrying about refactoring, designing, or applying patterns while we get to the first step. When we are still trying to reach a point of functionality, we don't know how the code will have to change, so prematurely over-designing the application is a recipe for cornering yourself.

2. **Apply basic OO principles to add flexibility.**
    * Find mismatched objects. Objects should do what their names indicate. A `Jet` object should `takeOff` and `land`, but shouldn't `taketicket`, that's another object's responsibility.
    * Each object should represent a single concept. Avoid `Duck` objects that represent a quacking duck, a rubber duck, and someone dodging a baseball.
    * Unused properties are a dead giveaway. If an object is often used with no-value or null properties, you've probably got an object doing more than one job.

3. **Strive for a maintainable, reusable design.** If a new requirement is requested and to add 1 thing we need to change it in multiple places, is there a way to improve the design so we don't need to update unrelated classes?

[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
