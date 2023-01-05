---
layout: ../../layouts/BlogPostLayout.astro
title: "If There's Any Chance of a HasMany, Don't Combine your Entities"
author: Clint Winter
publishedAt: 2022-03-25 18:43:47
createdAt: 2022-03-21 15:35:39
updatedAt: 2022-12-27 23:21:20
---

Once upon a time, my `User` model and my `Account` model were one and the same under the `User`. There was no separate `Account` entity yet. One day, `User` decided he wanted to have multiple accounts, and so chose to split out `Account` into his own entity.

But seriously, this is something I did recently, and let me tell you--what a pain in the a** that was. Writing the migration file to 

* tease out an `accounts` table from the `users` table, 
* transferring some of the columns and their data, 
* creating the relationships, 
* and updating the other tables that had a relationship to the `users` table to now have a relationship to the `accounts` table

wasn't even the hard part.

![no thank you](https://media.giphy.com/media/3YGKFfw611fZS/giphy.gif)

When you start analyzing your codebase you start to realize, \"I'm going to have to throw this entire thing in the garbage.\" 

Everything you wrote that uses the previous `User` relationship that is now related to the `Account` has to be rewritten. This is not a fun time. And if you haven't written tests you're in even bigger trouble. You'll have to visit every page and test just about every action you've built thus far because chances are that it's broken.

So as someone who has learned this lesson the hard way, do yourself a favor and assume that thing you're combining into a single table is two separate things. Especially if there is even a 1% chance. You will save yourself a MASSIVE amount of grief, and live happily ever after.

Happy coding.
