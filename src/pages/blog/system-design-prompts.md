---
layout: ../../layouts/BlogPostLayout.astro
title: "Software design prompts"
description: "A list of prompts to help you think through difficult software design problems."
author: Clint Winter
createdAt: 2020-08-31 15:53
---

Below are a list of prompts that help me think through software design problems when the solution is unclear. 

There are so many things to keep in mind when developing robust solutions. Just as writers get writer's block, we get blocked sometimes, too. In those cases, I like to ask myself questions to get unblocked. Many times the right solution starts with asking the right question.

* Are you trying to be overly clever?
* Is your abstraction leaking?
* Provide reasonable defaults.
* Are your modules/classes deep, or does your abstraction have a large surface area?
* In what ways is this likely to change? Can we make it extensible to avoid modification?
* Are you operating at the right level of abstraction?

"In order for an element to provide a net gain against complexity, it must eliminate some complexity that would be present in the absence of the design element."
