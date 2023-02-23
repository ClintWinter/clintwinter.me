---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Chapter 7 - Architecture"
author: Clint Winter
publishedAt: 2020-07-27 08:03:30
createdAt: 2020-07-24 14:38:59
updatedAt: 2022-12-27 23:21:21
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it.

## Definitions

- **Architecture** - Architecture is your design structure, and highlights the most important parts of your app, and the relationships between those parts.

    Architecture is the organizational structure of a system, including its decomposition into parts, their connectivity, interaction mechanisms, and the guiding principles and decisions that you use in the design of a system.

You know how to break your application up into small problems, but let's figure out **where to start** so we don't waste time working on the wrong things. Let's turn all the little pieces into a well-ordered, well-designed application.

We currently have:

- features list
- individual modules to code
- high-level views of what we need to build
- the customer's vision
- and design patterns to apply

We need an **architecture**.

> Architecture is your design structure, and highlights the most important parts of your app, and the relationships between those parts.

Architecture takes a big chaotic mess and turns it into a well-ordered application.

With big or small projects we can apply the same three steps we talked about in chapter 1:

1. Make sure your software does what the customer wants it to
2. Apply basic OO principles to add flexibility
3. Strive for maintainable, reusable design

Let's start with *functionality*. The first step is making sure it does what it's supposed to. In small projects we used a requirements list, in big projects we have our feature list. All of the features in our list address the system's functionality. What it has to do, not how it should be done.

Which of our features is *most important?* We want to focus on those first.

The things in your application that are really important are *architecturally significant*, and you should focus on them FIRST.

It's hard to talk about the relationships between parts of a system if you don't have the parts yet. Architecture isn't just about the relationships between the parts; it's also about figuring out which parts are *most important*, so you can start building those parts first.

## The 3 Qs of architecture

When you're trying to figure out if something is architecturally significant, there are three questions you can ask:

1. Is it part of the *essence* of the system?

    Is the feature really *core* to what a system actually is? Can you imagine the system without that feature? If not, you may have a feature that's part of the essence of a system.

2. What the heck does it *mean*?

    If you're not sure what the description of a particular feature means, it's probably important to pay attention to that feature. Any time you're unsure about what something is, it could take a lot of time or create problems with the whole system, so spend time on these features earlier rather than later.

3. How the heck do I do it?

    Focus attention early on features that seem very difficult to implement, or are totally new tasks for you. If you have no idea how to tackle a problem, you better spend time up front looking at it so it doesn't create problems down the road.

The *essence* of a system is what that system is at its most *basic level*.

The reason these features are architecturally significant is that they all introduce *RISK*. It doesn't matter which one you start with as long as you are working towards reducing the RISKS in succeeding.

- If the core features aren't in place, there's serious RISK that the customer won't like the system.
- If we don't understand something, it could be a ton of work and that's a RISK in meeting deadlines.
- With something we aren't sure how to do, there's RISK that we won't figure it out, or it will take a long time.

The point is to *REDUCE RISK*. You can start with any of the key features.

We can use **scenarios** to help us make sure we don't miss any big features. They are less formal than a use case.

In this instance we can have the scenario run through a realistic instance of the game, and it should give you a decent picture on if you forgot anything.

Use cases should still be used, but scenarios are a good start because they often cover the bigger, more common requirements.

Focus on one feature at a time to reduce risk in your project.

Don't get distracted with features that won't help reduce risk.

Once key features and big risks are reduced, then there will be plenty of time to work on other features, like the Unit class.

Let's pretend we want to build a `Unit` module for a game framework that allows the user to create game-specific units

> Build on what you've already got done whenever possible.

Remember: Architecture is your design structure, and highlights the most important parts of your app, and the **relationships** between those parts.

Let's get more details from our customer...

- \"Some games have units with attack/defense/experience properties.\"
- \"Other games have units that hold weapons and have names.\"
- \"Others have planes with speed, gun, and model properties.\"

Remember **commonality**. What is *common* among these different types of units? What *basic things* can we say that would apply to *any* game's unit?

Commonality is about more than just the names of properties... you need to look a little bit deeper.

Each unit has a different type: tanks, soldiers, planes, etc.

Each unit has a bunch of different properties with a value.

What is *common* is each unit has a type and a set of properties with a simple name/value pair.

Solution #1

`Unit` is a base class, and we create subclasses for each unit type (`Soldier`, `Airplane`, `Tank`).

```
Unit
---
<empty>

Tank
---
attack: float
experience: float
defense: float
-
getAttack(): float
setAttack(float)

Soldier
---
weapon: Weapon
name: String
-
getWeapon(): Weapon
setWeapon(Weapon)
getName(): String
setName(String)
...
```

Solution #2

The `Unit` class has a type property and a properties array that can adjust to different types of units with different properties.

```
Unit
---
type: String
properties: Map
-
getType(): String
setType(String)
getProperty(String, Object)
setProperty(String): Object
```

### Commonality analysis: the path to flexible software

| # of unit types | solution #1 - total unit classes | solution #2 - total unit classes |
| ---: | ---: | ---: |
| 3 | 4 | 1 |
| 5 | 6 | 1 |
| 10 | 11 | 1 |
| 25 | 26 | 1 |
| 50 | 51 | 1 |
| 100 | 101 | 1 |

Good design will *always* reduce risk.

We have a class diagram for a unit, and that is ***all we need at this point***. It gives us the structure of the class, and answers the question, \"What does \"game-specific units\" mean? We don't have to write the class itself until we complete our key features.

> Sometimes the best way to write great code is to hold off on writing code as long as you can.

Three basic steps any time you're unsure about what a feature means, and how you need to implement it:

1. Ask the customer (What does the feature mean?)
2. Commonality analysis (How do I realize that feature in my system?)
3. Implementation plan

When you find more things that are *different* about a feature than things that are the *same*, there may not be a good generic solution. In our case, if there's no generic solution, it doesn't belong as part of the game framework.

> Customers don't pay you for *great code*, they pay you for *great software*.

Reducing risk helps you write great software.

[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
