---
layout: ../../layouts/BlogPostLayout.astro
title: "Write Tests Early and Often"
author: Clint Winter
publishedAt: 2022-03-21 16:04:25
createdAt: 2022-03-21 15:33:52
updatedAt: 2022-12-28 20:05:14
---

I have a project that I've worked with on and off for the last few years. Writing tests was not a part of my work flow when I started it back then. As the project has grown to have more functionality, I have found that the tests I didn't write are causing my development speed and my trust in the code to plummet.

Writing tests is important, but writing them early is even more important. A young project is not going to have established or well-defined code. You will want to change the way it works and you'll end up breaking things. The only way you're going to know that is with tests. I can't tell you how many times I've decided I didn't like an implementation and changed it. Every time I've done it, some part of the functionality was left unaccounted for and broken. 

You end up in a circular situation where, with every change you make, you're forced to click around your project and make sure everything still works. With tests, all you have to do is trigger the test suite. That makes for the best argument against those that believe writing tests is a waste of time. When compared to all of the manual testing that must be done, tests improve your development speed immensely, and that speed increases non-linearly as the project grows.

When you're building some little to-do app, of course testing feels like a pointless endeavor. The bigger the project gets, the more you're going to resist going back and writing all those tests. The problem is, eventually, the drain of having to check your project after every change will outweigh your desire to make those changes, and you will end up abandoning the project.

Once you're working on something significant, you'll see the benefit testing provides. I've worked at companies with large projects that both did no testing at all and encouraged writing tests. 

The non-testing company's code-base was always riddled with bugs. We had a full-time QA person, and boy were they busy. Every bug fix had a chance to introduce new bugs, so we were constantly forced to spend a ton of time clicking around to make sure things worked (but the bugs always showed up). Our developers all had to have a mental checklist of things to watch out for that would constantly cause bugs. Imagine we just wrote that checklist out with tests. We would no longer have the cognitive load of keeping those things in mind. We'd never have to worry about that bug cropping up. It would just be tested to ensure correctness.

In contrast, at my current company that encourages writing tests, the user-base is much larger by, I'd guess, at least 100x and we see bugs much less regularly. And when we fix bugs, we add a test and never see it again.

So write those tests early, and write them often!
