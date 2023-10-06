---
layout: ../../layouts/BlogPostLayout.astro
title: "The Last 20% is the Hardest"
author: Clint Winter
createdAt: 2019-09-06 06:51:17
updatedAt: 2019-09-06 08:15:00
---

When it comes to any projects you work on, you will find that actually finishing it up and polishing it is the hardest part. It's always fun to break ground on a new and exciting idea where the sky is the limit and you are able to move fast and free. 
But eventually, you get to the point where things work at least okay. Sure, it's a little buggy. Maybe the design isn't exactly how you like it. Maybe there's some nice to have features that are on the to do list, but, for some reason, the project is procrastinated on until it is forgotten and you move on to the next idea. Why do we all do this? I'd like to explore that.
### When we work on a new project, we have no technical debt. 
I think when you are more of a beginner developer, the last 20% of a project is the most crucial for you. This is where the most learning will happen. This is where a lot of clean up and refactoring will happen. Maybe you just threw all of your code into the controller and it is an ugly mess to work with. This is the time where you would possibly refactor some of that code into functions in a model. You'll find places where you've rewritten code a few times and it should be put into a function. You'll find queries that are slow, doing full table scans and n + 1 situations that you didn't notice where you used the query builder.
However, you will not be aware of your own mistakes if you don't commit to \"finishing\" the project. I put finishing in quotes because it's hard to say when a project is really done. I'd say you can probably call a project done when
* it reaches your standard of a minimum viable product when it comes to features,\n* you've removed all of the bugs that you are aware of,\n* you are happy with the design and it isn't a UX mess,\n* you have gone through your code and cleaned up and refactored everything you can to make sure you haven't cornered yourself with debt,\n* and finally, you don't feel guilty about discontinuing work on the project. If you feel like you're a quitter or you're procrastinating, you aren't done.
To begin checking these boxes will require a lot of forethought. You can't just slap down code all haphazardly like you did in the beginning. You have to look at your ugly code and think about how it got like this and how it should look. If you don't know, a lot of learning will come out of this. This is how you become the productive and efficient developer. When you are forced to confront what you've written, you learn from your mistakes. Then the next time you start a project and are writing your first bits of code, you will remember that last time you wrote it like this, you had to go back and refactor it this way, so instead you recognize the situation and write it the right way the first time and cut your development time by a large factor.
Meaning we don't have code that needs to be managed and cleaned up to continue adding to our project.
### Once a project becomes real, it requires real work. 
We now have to work within the parameters that we designed.
### It's only natural to avoid things that are difficult for things that are more fun and easy.
