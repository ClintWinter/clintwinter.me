---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Chapter 10 - The OOA&D Lifecycle"
author: Clint Winter
publishedAt: 2020-08-10 11:02:20
createdAt: 2020-08-10 11:02:00
updatedAt: 2022-12-27 23:21:21
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it.
## Putting it all together
Let's take all of the parts we've been learning and put it together into a single process you can use over and over again.
1. Make sure your software does what the customer wants it to
    Spending a lot of time worrying about functionality? If the customer isn't happy with what the software does, you won't succeed.
    1. **Feature List** - Figure out what your app is supposed to do at a high level\n    2. **Use case Diagrams** - Nail down the big processes that your app performs, and any external forces that are involved\n    3. **Break Up the Problem** - Break your application up into modules of functionality, and then decide on an order in which to tackle each of your modules\n    4. **Requirements** - Figure out the individual requirements for each module, and make sure those fit in with the big picture\n    5. **Domain Analysis** - Figure out how your use cases map to objects in your app, and make sure your customer is on the same page as you are\n2. Apply basic OO principles to add flexibility\n    1. **Preliminary Decision** - Fill in details about your objects, define relationships between the objects, and apply principles and patterns\n    2. **Implementation** - Write code, test it, and make sure it works. Do this for each behavior, each feature, each use case, each problem, until you're done\n3. Strive for a maintainable, reusable design\n    1. **Deliver** - You're done! Release your software, submit your invoices, and get paid.
## **OOA&D Project Lifecycle**
|— Feature List — Use Case Diagram — Break Up The Problem — Requirements — Domain Analysis — Preliminary Design — Implementation — Delivery —>
1. Take a description of what the client is looking for and create a **feature list**.
    Your feature lists are all about understanding what your software is *supposed to do*.
2. Move on to creating a use case diagram to connect what your app does with how it will be used.
    Your use case diagrams let you start thinking about how your software will be used, without getting into a bunch of unnecessary details. 
    Connect features from the feature list to use cases in the use case diagram. Use cases reflect *usage*. The features in your system reflect your system's *functionality*. Your system must do those things in order for the use cases to work, even though the functionality isn't always an explicit part of a use case.
3. Break up the problem. Create modules that have single responsibilities.\n4. Start iterating. Take our big-picture view of the system from the use case diagram and refine that into requirements.\n    1. This is where we choose between using feature driven development or use case driven development.\n5. Domain Analysis\n    1. Sometimes we can't write requirements with the info we currently have.\n    2. We need to remember to try and understand the problem first.\n6. Preliminary Design - create UML diagrams of what you think the code will look like.\n7. Implementation - write the code for your diagrams.
    You should only expose clients of your code to the classes that they *NEED* to interact with. Classes that the clients don't interact with can be changed with minimal client code being affected.
    That means we can change how the classes used work, and it wouldn't affect code that only uses our original class. They're protected from changes to our implementation.
    Example:
    ```php\n    // we have a Subway class where we can add stations and connections:\n    $subway = new Subway();\n    $subway->addStation('new station');\n    $subway->addStation('another station');\n    $subway->addConnection('new station', 'another station', 'new connection');
    /**************************************************************************/
    // but if we made them pass in instances of station/connection, then there\n    // is more surface area exposed in the form of more classes, which puts the\n    // user at risk because those classes could change and break their code:
    // it also increases the knowledge required to use our API correctly\n    // because the user has to understand how to use/instantiate multiple classes\n    // rather than just the one that handles it for them.
    $subway = new Subway();\n    $station1 = new Station('new station');\n    $station2 = new Station('another station');\n    $connection = new Connection($station1, $station2, 'new connection');
    $subway->addStation($station1);\n    $subway->addStation($station2);\n    $subway->addConnection($connection);\n    ```
8. Test - write test cases for our new code to verify that our feature is working\n9. Repeat! Go back to 4 and go back through for each use case in the use case diagram, which means writing out a full use case for it.
It's your job to balance making sure the customer gets the functionality they want with making sure your code stays flexible and well-designed.
Sometimes the best code for a particular problem has *already been written*. Don't get hung up on writing code yourself if someone already has a working solution.
OOA&D is about having a lot of *options*. There is never one right way to solve a problem, so the more options you have, the better chance you'll find a *good* solution to every problem.
[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
