---
layout: ../../layouts/BlogPostLayout.astro
title: "WIBWO 6: ...Reading! Also TDD on a New Project"
author: Clint Winter
publishedAt: 2019-12-03 14:37:16
createdAt: 2019-12-03 14:37:14
updatedAt: 2022-12-29 06:54:36
---

### Reading
I'm continuing to read as much as possible, including audio books. I find that my desire to listen to books on audible has motivated me to pair it with things that are harder to motivate alone. My commute to work is more patient and enjoyable when listening. I listen during workouts and cardio, which gives me steadiness and focus. 
I don't think I need to continue harping on the reading in the future as this has become a normal part of my routine.
### Test-Driven Development
The secret project I mentioned last week will be built on the philosophy of strong unit testing and test-driven development (TDD). This is something I know that I need to make a normal part of my development process and a fresh project is the perfect place to get comfortable with it. I recently read [this article](https://daedtech.com/5-things-ive-learned-in-20-years-of-programming/) and I think it gave me the final nudge I needed to get my butt in gear. I've seen TDD mentioned many other times, but I always procrastinated using it. Probably because I used to see it as another obstacle to getting my code out and would be tedious work that sucked up too much time.
Upon introspection I realize that this is probably the best thing I can do *right now* that I'm not doing that will give me a generous boost in my work life. It will make me a more marketable recruit and a more reliable and confident developer. I expect my output to improve massively as well. Now that I understand these benefits, I'm actually pretty giddy to get started using it.
I set up my environment this morning in Laravel and also installed Laravel Dusk, which allows for browser testing with a chrome driver, and I'm pretty dang excited about it. I'm seriously kicking myself for being blind to the potential upside of using this and I wish I started messing around with it sooner. This is going to be my attempt at using it and finding out how effective it is for myself.
My strategy for this project is to ...\n1. do upfront frameworking by doing some object-oriented design: defining the objects, capturing user stories, etc.\n2. build out my objects by structuring them in relation to the database and the code. I'll start defining their properties and how they will be represented in the database.\n3. design mock-ups of the project until I'm confident in a style and layout.\n4. think about other aspects of the project (overall vibe, branding, etc.)\n5. write tests based on the requirements I have come up with when designing the project.\n6. make the tests pass by implementing the strategy in code.
Then essentially the process is to loop on steps 5 and 6 until everything is done. In between there will be updates and refinements of the design of the project.
I will try to share this project with you as progress is made. I want to get further in the process first.
See you next week!
