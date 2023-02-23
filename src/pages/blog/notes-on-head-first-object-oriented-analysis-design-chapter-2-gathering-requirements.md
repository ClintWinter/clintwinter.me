---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Chapter 2 - Gathering Requirements"
author: Clint Winter
publishedAt: 2020-07-24 07:54:44
createdAt: 2020-07-24 07:54:36
updatedAt: 2022-12-27 23:21:21
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it.

## Definitions

- **Requirement** - Something a system has to do to be a success.
- **Use Case** - Helps you gather good requirements. Tells a story about how a system works.
- **Main Path** - How a system works when everything is going right. This is usually what customers describe when they're talking about the system.
- **External Initiator** - Kicks off the list of steps described in a use case. Without this, a use case never gets going.
- **Start Condition** - This is always the first step in the use case.
- **Stop Condition** - Lets you know when a use case is finished. Without this, use cases can go on forever.
- **Clear Value** - Without this, a use case isn't worth anything to anyone. Use cases without this *always* fail.

We want to gather good requirements from our clients so we can cover all of their uses cases to write good requirements. We also want to think about how things may not go exactly as planned so we can build those alternative paths into the requirements.

## Write a use case to solve each customer's problem

> Bitsie is nudging open our back door. I want a system that locks my dog door and windows behind me every time I enter a code, so she can't get out.

**External Initiator:** Owner

**Start Condition:** Owner enters a code.

**End Condition:** The door doesn't open.

```
1. Owner enters a code
2. The dog door and windows lock.
```

&nbsp;

> Bruce is constantly barking, so I never know if he really wants to go out or not. Can you build a door that opens when he scratches it with his paws?

```
1. Bruce scratches the door.
2. The dog door opens.
3. Bruce goes outside.
4. The dog door closes automatically.
5. Bruce does his business.
6. Bruce scratches at the door again.
7. The dog door opens up again.
8. Bruce comes back inside.
9. The door closes automatically.
```

&nbsp;

> Tex is tracking mud inside the house. I want a dog door that automatically closes every time he goes outside, and stays closed until I press a button to let him back in.

```
1. (Somehow) the dog door opens.
2. Tex goes outside.
3. The door closes automatically.
4. Tex does his business.
    1. Tex gets muddy
    2. John cleans Tex up
5. John presses a button.
6. The dog door opens.
7. Tex comes back inside.
8. The door closes automatically.
```

- **Requirements** are things your system must do to work correctly.
- Your initial requirements usually come from your customer.
- To make sure you have a good set of requirements, you should develop use cases for your system.
- **Use Cases** detail exactly what your system should do.
- A use case has a **single goal**, but can have multiple paths to reach that goal.
- A good use case has a **starting** and **stopping condition**, an **external initiator**, and a **clear value** to the user.
- A use case is simply a story about how your system works.
- You will have at least one use case for each goal that your system must accomplish.
- After your use cases are complete, you can refine and add to your requirements.
- A requirements list that makes all your use cases possible is a good set of requirements.
- Your system must work in the real world, not just when everything goes as you expect it to.
- When things go wrong, your system must have **alternate paths** to reach the system's goals.

[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
