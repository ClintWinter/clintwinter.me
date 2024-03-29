---
layout: ../../layouts/BlogPostLayout.astro
title: "A Cleaner Code Case Study"
author: Clint Winter
publishedAt: 2020-09-11 10:51:30
createdAt: 2020-09-11 10:51:26
updatedAt: 2022-12-27 23:21:21
---

I recently had a situation at work where a coworker tried to modify a JavaScript function I wrote, but ended up introducing some bugs. In reviewing their code, it seemed their issue was not fully understanding what the function was doing, but I believe it was my fault because the function was, frankly, poorly written. 

Sometimes we have deadlines, and, in order to meet them, we may leave things a mess. I had plans to revisit it, but of course other things took priority. Now that the function was back knocking on the door, I saw an opportunity to fix it.

Often when we share our code with the world, we share our most meticulously maintained material. That is not the reality of a business all the time. At the end of the day, the product and the customers that use it are the priority. When it comes to deadlines vs perfectly clean code, the deadline wins. However, when we get the chance to go back and clean up after ourselves, we should take those opportunities because it's important we balance production with our capacity to continue producing.

I'm going to attempt to remedy the diseased function in steps in order to give you an example of how I go through the process of improving code.

### The original code

Let's now look at the original function that gave my fellow developer problems.

```javascript
function valid(field, visibleField) {
   var state = {
      saved: true,
      requirements: {
         Description: {
            required: true,
            maxlength: 150
         },
         DueDate: {
            date: true
         },
         PriorityID: {},
         TypeID: {}
      }
   };

   if (!state.requirements[field.name]) {
      return true;
   }

   var errorField = visibleField ? visibleField : field;

   // required
   if (state.requirements[field.name].required) {
      if (field.tagName.toLowerCase() == 'input' && field.value.length == 0) {
         errorField.classList.add('inputBorderError');
         return false;
      } else if (field.value === undefined || field.value === '') {
         errorField.classList.add('inputBorderError');
         return false;
      }
   }

   // max length
   if (state.requirements[field.name].maxlength) {
      if (field.value.length > state.requirements[field.name].maxlength) {
         errorField.classList.add('inputBorderError');
         return false;
      }
   }

   // date
   if (state.requirements[field.name].date) {
      if (!moment(field.value, ['MM/DD/YYYY', 'YYYY-M-D'], true).isValid()) {
         errorField.classList.add('inputBorderError');
         return false;
      }
   }

   errorField.classList.remove('inputBorderError');
   return true;
}
```

Let me also provide some simplified HTML so you can see a sample of the function's usage.

```html
<form id="myForm">
    <div>
        <input 
            name="Description" 
            type="text" 
            oninput="
                if (valid(this)) { 
                    edit(this); 
                }
            "
        >
    </div>

    <div>
        <input 
            name="DueDate"
            type="text"
            oninput="
                if (valid(this, document.getElementById('myForm'))) { 
                    edit(this); 
                }
            "
        >

    </div>

    <button type="submit">Submit</button>
</form>
```

The function is decently complex, so let's go over it to make sure we understand what's happening. We have a `valid()` function that takes in the parameters `field` and `visibleField`. This is used within the context of an HTML form, so the two parameters are HTML elements. We see a variable immediately declared called `state`. It has a `saved` property and a `requirements` property.

One of the immediate issues you may notice is that the `saved` property in `state` isn't even used. Instead of confusing you by explaining it's original purpose, let's just accept that the there was a plan for it on initial development that was since abandoned, making the `saved` property an artifact of an old design (it never was cleaned out). 

The keys in the `requirements` property in the `state` object are mapped to field names in the form (`Description` and `DueDate` are in our HTML form). The `requirements` properties' values, which are objects, map to different validations we want to perform on the field. For example, if we have...

```javascript
// ...
requirements: {
   Description: {
      required: true,
      maxlength: 150
   },
   // ...
}
```

...our max length if-block catches it and returns `false` if it fails. 

```javascript
// max length
if (state.requirements[field.name].maxlength) {
   if (field.value.length > state.requirements[field.name].maxlength) {
      errorField.classList.add('inputBorderError');
      return false;
   }
}
```

We can also see that the function handles displaying the error by adding a class to an element (`errorField.classList.add('inputBorderError')`). If a `visibleField` element is provided, that is what the error is displayed on, otherwise it uses the primary `field` element.

If the field passes through all of the validation rules that apply to it without returning `false`, the function eventually returns `true`, so the function always returns a boolean.

Now that we have a basic understanding of how this function works, let's clean it up.

### Refactoring

*Note: Before we continue, I invite you to make an attempt at improving this function on your own. Feel free to share your solution in the comments along with details of why you did what you did—it might be better than mine!*

**First**, let's start with something easy. As I said earlier, the `saved` property in `state` is no longer a part of the solution, so let's remove that.

```javascript
function valid(field, visibleField) {
   var state = {
      // saved: true,
      // ...
   };
   // ...
}
```

**Second**, I don't like that this function is handling the displaying of errors when the validation fails. That's an \"invisible\" side-effect that makes this function deceptive, and something we should try to avoid as much as possible. Nobody would know that this function does that unless they read the contents of the function, which someone shouldn't need to do every time they need it. The function is called `valid`, not `validateAndDisplayErrors`. It's also an extra responsibility, and we want our functions to be focused. Let's remove the error handling altogether.

```javascript
function valid(field) {
   var state = {
      requirements: {
         Description: {
            required: true,
            maxlength: 150
         },
         DueDate: {
            date: true
         },
         PriorityID: {},
         TypeID: {}
      }
   };

   if (!state.requirements[field.name]) {
      return true;
   }

   // required
   if (state.requirements[field.name].required) {
      if (field.tagName.toLowerCase() == 'input' && field.value.length == 0) {
         return false;
      } else if (field.value === undefined || field.value === '') {
         return false;
      }
   }

   // max length
   if (state.requirements[field.name].maxlength) {
      if (field.value.length > state.requirements[field.name].maxlength) {
         return false;
      }
   }

   // date
   if (state.requirements[field.name].date) {
      if (!moment(field.value, ['MM/DD/YYYY', 'YYYY-M-D'], true).isValid()) {
         return false;
      }
   }

   return true;
}
```

That allowed us to get rid of our second parameter, making our function that much simpler. 

**Third**, while we are removing responsibilities, let's remove another one. For some reason this function is hard-coding an object that holds the validation rules for one specific form with our `state` variable. Let's remove that and make each function call pass the validation rules in for that element. Unfortunately, that means adding a second parameter back in.

```javascript
function valid(field, validationRules) {

   if (validationRules === undefined || validationRules === '')
      return true;

   // required
   if (validationRules.required) {
      if (field.tagName.toLowerCase() == 'input' && field.value.length == 0) {
         return false;
      } else if (field.value === undefined || field.value === '') {
         return false;
      }
   }

   // max length
   if (validationRules.maxlength) {
      if (field.value.length > validationRules.maxlength) {
         return false;
      }
   }

   // date
   if (validationRules.date) {
      if (!moment(field.value, ['MM/DD/YYYY', 'YYYY-M-D'], true).isValid()) {
         return false;
      }
   }

   return true;
}
```

So now our usage looks like this:

```html
<input 
   name="DueDate"
   type="text"
   oninput="
       if (valid(this, {date:true})) { 
           edit(this); 
       }
   "
>
```

**Fourth**, one thing that's bugging me now is the function being dependent on the [`HTMLElement` interface](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). That's not good for testing, and it's an unnecessary dependency because the field is no longer being used to handle errors. We are wrestling with different tag types in some instances in order to ultimately get the element's value, so let's just pass the value in directly and rid ourselves of that cumbersome burden.

```javascript
function valid(value, validationRules) {
    if (
        (typeof validationRules === 'object' && Object.keys(validationRules).length === 0)
        || validationRules === undefined
        || validationRules === ''
    ) {
        return true;
    }

    // required
    if (validationRules.required) {
        if (!! value)
            return false;
    }

    // max length
    if (validationRules.maxlength) {
        if (value.length > validationRules.maxlength)
            return false;
    }

    // date
    if (validationRules.date) {
        if (!moment(value, ['MM/DD/YYYY', 'YYYY-M-D'], true).isValid())
            return false;
    }

    return true;
}
```

This function has improved *dramatically* from when we started. If you stopped here, you could feel pretty confident in trusting it to accomplish what it needs to. I'm going to take it a little further though. 

**Fifth**, these if-statement blocks feel primitive. I think we can do better. They lack clarity and readability. Instead what I want to do is break these \"validators\" out into their own functions so that if we want to edit one or add to them, we only need to modify a small part. This allows us to leave our main function that performs the validation alone. 

The thought process I'm describing is derived from the [SOLID principles](https://en.wikipedia.org/wiki/SOLID). The O in SOLID is the **Open-Closed Principle**—open for extension, closed for modification. That means we want to make it easy to extend our validation function by being able to add validators without modifying the existing code. It's also the S for **Single Responsibility Principle** because we are breaking our one big function down into smaller immutable methods that have only a single reason to change.

I still want to keep the function self-contained; see if you can follow what I'm going to do. I want to keep my validator methods within the valid function. Let's pull our validators into their own methods in a local object `validators`.

```javascript
function valid(value, validationRules) {
    var validators = {
        required: function(value, parameter) {
            if (!! value)
                return {rule:'required', message:'This field is required.'};

            return false;
        },

        maxlength: function(value, parameter) {
            if (value.length > parameter)
                return {rule:'maxlength', message:'Maximum length is ' + parameter + ' characters.'};

            return false;
        },

        date: function(value, parameter) {
            if (!moment(value, parameter, true).isValid())
                return {rule:'date', message:'Not a valid date format, must match ' + parameter + '.'};

            return false;
        }
    };

   // ...
}
```

We updated the validators to each return an error object with the rule that failed and a default message the user may want to display. Since we aren't handling the errors in-house anymore, we want to hand back the most information we can that gives the most flexibility to the user. There is a difference between the function doing work that has invisible side-effects and returning data that doesn't do any work on its own.

**Sixth**, let's rework the logic that checks if our value is valid or not based on the validation rules.

```javascript
function valid(value, validationRules) {
    var validators = {
        //...
    };

    // bug fix here
    if (validationRules.required === undefined && !value)
        return [];

    var errors = [];
    var result;
    for (var rule in validationRules) {
        result = validators[rule](value, validationRules[rule]);
        if (result) errors.push(result);
    }

    return errors;
}
```

Now our valid function returns an array instead of a boolean—it will return an empty array if there are no errors, or an array of our error objects that failed validation. 

While rewriting this part I found a bug—if the `validationRules` parameter doesn't include a `required` property, then we shouldn't bother checking the other rules when the `value` is empty. I labeled the fix above with the \"bug fix here\" comment.

To process our rules, we simply loop through the properties of the `validationRules` parameter and invoke the corresponding validator. If the result that comes back evaluates to true (because it's an object when validation fails), then we push it into the errors array. 

*Note: I'm aware there are a lack of catches for handling potential issues such as using a non-existant validator in the `validationRules`, but I want to keep the example straightforward for learning purposes.*

**Seventh**, you may be thinking \"Hey, every time you call this function you are re-defining every validator method!\" Great catch if you did! It's inefficient to ask the `valid()` function to define the `validators` object with all of its methods every time the function is called, so I'm going to turn `valid` into a variable and assign it to an immediately-invoking, anonymous function that returns a closure. This keeps the `validators` in the local scope, creates them only one time, and allows me to continue using `valid` the same way.

```javascript
var valid = (function() {
    var validators = {
        required: function(value, parameter) {
            if (!! value)
                return {rule:'required', message:'This field is required.'};

            return false;
        },

        maxlength: function(value, parameter) {
            if (value.length > parameter)
                return {rule:'maxlength', message:'Maximum length is ' + parameter + ' characters.'};

            return false;
        },

        date: function(value, parameter) {
            if (!moment(value, parameter, true).isValid())
                return {rule:'date', message:'Not a valid date format, must match ' + parameter + '.'};

            return false;
        }
    };

    return function(value, validationRules) {
        if (validationRules.required === undefined && !value)
            return [];

        var errors = [];
        var result;
        for (var rule in validationRules) {
            result = validators[rule](value, validationRules[rule]);
            if (result) errors.push(result);
        }

        return errors;
    };
})();
```

That's going to be our final refactor. Let's see how the client utilizes our function now.

```html
<div id="DescriptionContainer">
    <input
        name="Description"
        value="text"
        oninput="
            var errors = valid(this.value, {required:true, maxlength:20});
            
            if (errors.length) {
                var elErrors = this.nextElementSibling;
                
                var messages = errors.map(error => error.message);
                elErrors.innerHTML = errors.join('<br>');
                elErrors.classList.remove('hidden');
            } else {
                elErrors.classList.add('hidden');
                elErrors.innerHTML = '';
            }
        "
    >

    <div class="errors hidden"></div>
</div>
```

We now check the length of the array coming back from the function call to determine if there are any errors. If there are, we can get the element we want to display error messaging in and list the errors in it and display it.

### Review

You may be thinking that the way we interact with this function became more complicated since we started, and you're right. However, our goal here was to fix up a specific function. That involves removing the other responsibilities it had that shouldn't have been there. Right now that means we moved that responsibility to the client, but that doesn't mean we can't write another function that uses our `valid` function to handle errors for us. 

What we can do is use our new `valid` function as a building block for higher-level functions. If we want to have a function that intentionally has the side-effect of displaying errors, we can utilize our `valid` function within that. But we keep the validation part decoupled from other responsibilities, such as displaying errors. 

We also reduced dependencies within the function which greatly expands the usability and flexibility of it. For example, removing our dependency on the HTMLElement interface allows us to use this function for data coming back from an AJAX call before displaying it, which wasn't possible before.

In breaking out the validators and giving each section a single responsibility, we made the function way easier to work with for our future selves and others first getting familiar with it. If we want to add a new validator method, we can see what the input and output of the others are and copy it, or look at how our main processing loop works with them to know how to implement it (In an OO language the validators would likely implement a `Validator` interface).

When we build a culture of high coding standards where we can assume a function named `valid` is only performing validation, we increase trust from the developers working with the code because they don't have to read the contents of every new function they come across to make sure there aren't invisible side-effects or other strange interactions happening. We liberate a significant amount of time and brain-power because of this. The less time spent getting reacquainted with messy, complex functions, the more time spent on better things like new features, learning new skills, and more.
