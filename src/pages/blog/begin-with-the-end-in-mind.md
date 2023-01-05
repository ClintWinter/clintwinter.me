---
layout: ../../layouts/BlogPostLayout.astro
title: "Begin With the End in Mind"
author: Clint Winter
publishedAt: 2019-12-17 19:50:39
createdAt: 2019-12-16 09:19:06
updatedAt: 2022-12-27 23:21:21
---

One of the most helpful paradigms when designing code is first describing how you want to use it and then working backwards, rather than simply trying to make it work from the bottom up. Working from the bottom up, in my experience, often results in a code smell where the finished code I have to work with is ugly and requires me to remember way too much to be able to use it.
This idea has been hammered into my head from watching an absurd number of [Laracasts](https://laracasts.com) videos. Watch any series from that fantastic website and you're likely to be kindly lectured on the benefits of beginning with the end in mind. Or even a step further, beginning with the end **period**.
This literally means interfacing with your non-existant code before you actually write it. You get the opportunity to come up with the most pleasant code you can before you have to build it.
### An Example
If you are designing a form builder you may start running with the idea based on the first thing you think of. 
\"I know I need to eventually print out the form's fields so maybe I have functions that take all the info I need and create the elements? Let's see...\"
```PHP\n// Form.php
function createElements($elements)\n{\n    foreach ($elements as $type => $element) {\n        if ( $type == 'header' ) {\n            echo '<h2>' . $element['label'] . '</h2>';\n        } elseif ( $type == 'field' ) {\n            echo '<div class=\"' . $element['classes'] . '\">';\n            echo '<label for=\"' . $element['name'] . '\">' . $element['label'] . '</label>';\n            echo '<input type=\"' . $element['type'] . '\" name=\"' . $element['name'] . '\">';\n            echo '</div>';\n        }\n    }\n}\n```
Ta-da! Your brand new function for making elements--let's see it in action!
```PHP\n// myform.php
<form action=\"submit/form.php\" method=\"POST\">\n    <?php\n        createElements([\n            'header' => [\n                'label' => 'Personal Information'\n            ],\n            'field' => [\n                'label' => 'Name',\n                'name' => 'name',\n                'type' => 'text',\n                'classes' => 'form-container'\n            ],\n            'field' => [\n                'label' => 'Email',\n                'name' => 'email',\n                'type' => 'email',\n                'classes' => 'form-container'\n            ],\n            'field' => [\n                'label' => 'Phone Number',\n                'name' => 'phone',\n                'type' => 'text',\n                'classes' => 'form-container'\n            ]\n        ]);\n    ?>\n</form>\n```
The problem with the code above is I need to learn the language of my function to be able to build a form, and that requires time. Every time I need to use it I need to refamiliarize myself with it so I can use it. If it doesn't even save me time by reducing duplication or automating anything, why am I writing it? In this case it would be cheaper to simply write my form the good old fashioned way in the HTML.
It's using large data structures that don't give any clues about how to use it. I am once again copying and pasting from other places this is used to be able to work with it. If something important about this function changes, I am forced to find every place I use it and change it again.
I've seen code in the real world that followed this track, except on a much more complex level and my head was spinning trying to understand what these functions were trying to do when the parameters being given were large multi-dimensional arrays. 
A big part of writing these functions is following the DRY (Don't Repeat Yourself) principle, but I think the real thing to understand is that the goal is to unload responsibility from our brains onto the code base. 
When we have to remember every place we copied and pasted code when it needs to be changed, we are tracking it in our head, which is bad. The more we have to know when using a function we wrote, the more we have to keep in our head (bad again).
Would you rather use this?
```PHP\n// myform.php
<form action=\"submit/form.php\" method=\"POST\">\n    <?php\n        createElements([\n            'header' => [\n                'label' => 'Personal Information'\n            ],\n            'field' => [\n                'label' => 'Name',\n                'name' => 'name',\n                'type' => 'text',\n                'classes' => 'form-container'\n            ],\n            'field' => [\n                'label' => 'Email',\n                'name' => 'email',\n                'type' => 'email',\n                'classes' => 'form-container'\n            ],\n            'field' => [\n                'label' => 'Phone Number',\n                'name' => 'phone',\n                'type' => 'text',\n                'classes' => 'form-container'\n            ]\n        ]);\n    ?>\n</form>\n```
...or this?
```PHP\n$form = new Form('POST', 'submit/form.php');
$form->addElement(new FormHeader('Personal Information'))\n     ->addElement(new FormTextField('Name'))\n     ->addElement(new FormEmailField('Email'))\n     ->addElement(new FormTextField('Phone Number'))\n     ->render();\n```
Which requires more knowledge? Which abstracts as much unnecessary information as possible?
We may not immediately begin with the code at a level of complexity like we have above, but we know what information we must provide for our objects to exist and the type of code we would like to use.
We may realize that each form field type has a different way it needs to be rendered, so it uses a `Renderable` interface where it can define the method on its own. We may realize that the `Form` class can loop through its given elements and render them all one at a time in the way they need to be rendered without having to know how. We may realize that the details of what goes into a field is overwhelmingly the same and we can give defaults for things like values, placeholders, requirements, and classes, which allows us to only override those details when necessary and keeping our implementation tidy.
These things are more easily obvious to us when we begin with the end in mind and try to avoid overcomplicating the way we have to use a class or function right from the beginning. We sabotage ourselves that way. We didn't write our original `createElements` function to be an annoying mess to work with, our intention was to make our lives easier. 
If we started by defining how we wanted to use it, I can guarantee we didn't want a massive multi-dimensional array with a ridiculous amount of key/value pairs. How are we even supposed to know what the function is capable of when we are using such a nonrigid data structure?
### Using Test-Driven Development
Test-driven development (TDD) is essentially beginning with the end in mind in its purest form. A common phrase is \"red, green, refactor\". This means we write the code we want to use in our test *first*, then we write our code so that it passes, and finally we refactor to meet certain criteria.
Frankly, if TDD is highly recommended by most of the top minds in the development and computer science world, it's good enough for me too.
&nbsp;
*Did you enjoy this article? Did you hate it? Email me with your constructive criticisms at **cwinter.web@gmail.com**! The more feedback I get, the better job I can do writing helpful articles--and that is important to me. Thanks for reading!*
