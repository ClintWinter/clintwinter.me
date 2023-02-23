---
layout: ../../layouts/BlogPostLayout.astro
title: "Notes on \"Head First: Object-Oriented Analysis & Design\" - Chapter 9 - Iterating & Testing"
author: Clint Winter
publishedAt: 2020-08-10 11:00:06
createdAt: 2020-08-10 10:59:48
updatedAt: 2022-12-27 23:21:21
---

These are my notes for the book [*Head First: Object-Oriented Analysis & Design*](https://amzn.to/2P0hpIJ). Information provided here originates from the the book (and therefor the authors who wrote it). I *highly, highly* recommend getting the book yourself and reading it fully. This is just the information that I felt was most important **for myself**. The coding problems and exercises they provide are worthwhile, and should be a good enough reason to purchase it.

## The Software is Still for the Customer

No amount of well-designed code will please your customers; you've got to show them something working. With a solid OO toolkit, we can prove to the customer that our software works.

All of the tools and techniques being learned are terrific, but none of them matter if you don't use them to produce *great software* that makes your *customer happy*.

## Definitions

- **Feature Driven Development** - is when you pick a specific feature in your app, and plan, analyze, and develop that feature to completion.
- **Use Case Driven Development** - is when you pick a scenario through a use case, and write code to support that complete scenario through the use case.

> **You write great software *iteratively*. Work on the *big picture*, and then iterate over pieces of the app until it's complete.**

Two choices when it comes to iterating deeper. 

1. **Feature Driven Development** - You can choose to focus on *specific features* of the application. This approach is all about taking *one piece of functionality* that the customer wants, and working on that functionality until it's complete
2. **Use Case Driven Development** - You can also choose to focus on *specific flows* through the application. This approach takes a *complete path* through the application, with a *clear start and end*, and implements that path in your code.

Both approaches to iterating are driven by *good requirements*. Because requirements come from the customer, both approaches focus on delivering what the *customer wants*.

Feature driven development will utilize your feature list to determine what to work on next.

Use case driven development will utilize your use case diagram, which lists the different cases in your system.

## What's the difference between the two?

Feature DD is more granular. A single feature is often pretty small and every app has a lot of them.

- Works well when you have a lot of different features that don't interconnect a whole lot.
- Allows you to show the customer working code faster.
- Is very functionality-driven. You're not going to forget about any features using feature driven development.
- Works particularly well on systems with a lot of disconnected pieces of functionality.

Use case DD is more \"big picture\". You'll be working on pretty major chunks of code at a time, since a single scenario often involves a lot of functionality.

- Works well when your app has a lot of processes and scenarios rather than individual pieces of functionality.
- Allows you to show the customer bigger pieces of functionality at each stage of development.
- Is very user-centric. You'll code for all different ways a user can use your system with use case driven development.
- Works particularly well on transactional systems, where the system is largely defined by long, complicated processes.

Any time you have a customer that's impatient to see results, you should consider feature DD, and starting with a feature you've already done some work on.

Your customers want to see something that makes sense to *them*.

All the lists and diagrams may help to get on the same page as them, but they need more than that to feel confident in a product.

You need to come up with some test scenarios that you can show to your customer, which prove that your code works and behaves as expected.

\"Scenario\" in this instance isn't the same as the \"scenario\" we were talking about in a use case scenario.

They don't have to be complex; just provide a way to show the customer that the functionality is working correctly.

For example, a test scenario that creates a new `Unit` object and adds a property to it.

> You should test your software for every *possible usage* you can think of. *Be creative*! Don't forget to test for *incorrect usage* of software, too. You'll *catch errors early*, and make your customers very happy.

Formally, test-driven development is automated and uses a testing framework, but the essence of what we are doing here is the same since we haven't written code for the `Unit` class yet.

> Test driven development focuses on getting the behavior of your classes right.

Design decisions are always a trade-off.

Good software is built *iteratively*. Analyze, design, and then *iterate again*, working on smaller and smaller parts of your app.

Each time you iterate, *reevaluate* your design decisions, and don't be afraid to *CHANGE* something if it makes sense for your design.

## Test cases dissected...

1. Each test case should have an ID and a name.

    The name of the test case should describe what is being tested.

2. Each test case should have *one specific thing* that it tests.

    Each test case should be **atomic**, testing only *one piece* of functionality at a time.

3. Each test case should have an input you supply.

    You give the test case data that it uses as the test data. This is used to execute a piece of functionality.

4. Each test case should have an output that you expect.

    Compare the actual program's output with your expected output. If it matches, your test was successful.

5. Most test cases have a starting state.

    Do you need a database connection, a certain created object, or some value set before running your test? That's all part of the starting state of the test case and should be handled before running the test.

Customers that see *running code* tend to get happy and keep paying you. Customers that only see diagrams get impatient and frustrated.

> When you *PROGRAM BY CONTRACT*, *you* and your *software's users* are agreeing that your software will *behave* in a certain way.

If the customer wants an action to result in different behavior, then you're changing the contract. So if the framework should throw an exception instead of returning null, that's fine but it means the contract is has changed.

If we return null on everything that doesn't exist, we are programming by contract. It states an action that will happen based on a certain situation, and trusts the user to handle it as needed.

Programming by contract is really all about *trust*. We can always *change* the contract if we need to.

In cases where you don't trust your users to use your code correctly, or certain actions are a bad idea, you want to consider *defensive programming*.

If we use exceptions instead of null, the user will have to catch the exception or the script will fail.

If the programmer doesn't trust you when using your code, they can program defensively as well, like if they don't believe they'll only get null when getting non-existent properties.

```php
// this code does a LOT of error checking, not trusting it to return valid data.

$unit = getUnit();

$name = $unit->getName();

if ($name != null && strlen($name) > 0) {
    echo 'Unit name: ' . $name;
}

$value = $unit->getProperty('hitPoints');

if ($value != null) {
    try {
        $hitPoints = (int) $value;
    } catch (Exception $e) {
        // handle exception
    }
}
```

The difference between programming by contract and defensive programming is in programming by contract we work with our clients to come up with an agreed upon way to handle situations. With defensive programming, we aren't interested in what the client wants, we make sure we aren't responsible for crashing a program, and try to help the client from crashing theirs.

&nbsp;

[![Contact me on Codementor](https://www.codementor.io/m-badges/clintwinter/get-help.svg)](https://www.codementor.io/@clintwinter?refer=badge)
