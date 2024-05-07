---
layout: ../../layouts/BlogPostLayout.astro
title: "Use Guard Clauses for Cleaner Code"
description: "A simple way to reduce nesting and improve readability in your code."
author: Clint Winter
publishedAt: 2022-03-24 20:13:08
---

The guard clause is a nifty pattern that provides a super-simple way to clean up your code. Their main function is to terminate a block of code early, which reduces indentation of your code and therefore makes your code *much* easier to read and reason about.

Too often, I see entire method bodies wrapped in if-statements. Every time your code is indented another level, you are adding another piece of context that must be kept track of mentally while reading the code.

Let's look at a simple function that doesn't use the pattern.

```php
function update($contact, $data) {
  if (valid($data)) {
    $contact->update($data);
  }
}
```

With such a simple example it may not seem like a big deal (and it probably isn't), but let's see what refactoring to a guard clause looks like anyway.

```php
function update($contact, $data) {
  if (! valid($data)) {
    return;
  }

  $contact->update($data);
}
```

This is the essence of the guard clause. Reducing indentation, which reduces complexity and unnecessary context, and increases visibility of what the function is meant to do.

Let's get right into a more complex piece of code to really see where it shines.

```php
if (! is_null($subscribed)) {
    if ($email = $contact->email) {
        $updated = Contact::query()
            ->where('email', $email)
            ->where('is_subscribed', ! $subscribed)
            ->update([
                'is_subscribed' => $subscribed,
            ]);

        if ($updated) {
            if ($subscribed) {
                event(new Subscribed($email));
            } else {
                event(new Unsubscribed($email));
            }
        }
    }
}
```

What's awesome about the guard clause is we can take the code here, which, at some points, gets 4 if-statements deep, and reduce it to a single indentation.

The steps to do this are simple:
1. Invert the if-statement to check for the opposite condition.
2. Terminate the if-statement before the rest of the code with a `return` statement inside of it.
3. Repeat.

The only time this isn't doable is if the if has an else or if there are elseif's.

Let's see one step at a time. First, we will take the if-statement in the first line and turn it into a guard clause.

```php
if (is_null($subscribed)) {
    return; // [!code ++]
} // [!code ++]

if (! is_null($subscribed)) { // [!code --]
    if ($email = $contact->email) {
        $updated = Contact::query()
            ->where('email', $email)
            ->where('is_subscribed', ! $subscribed)
            ->update([
                'is_subscribed' => $subscribed,
            ]);

        if ($updated) {
            if ($subscribed) {
                event(new Subscribed($email));
            } else {
                event(new Unsubscribed($email));
            }
        }
    }
} // [!code --]

```

Instead of *continuing* when `$subscribed` is not null, we *terminate* when it is null. Mentally, we can now discard this information so we can focus on what the code is doing. However, once again, the code after our new guard clause is wrapped entirely in an if-statement. Let's repeat the process.

```php
if (is_null($subscribed)) {
    return;
}

if (! ($email = $contact->email)) { // [!code ++]
    return; // [!code ++]
} // [!code ++]

if ($email = $contact->email) {  // [!code --]
$updated = Contact::query()
    ->where('email', $email)
    ->where('is_subscribed', ! $subscribed)
    ->update([
        'is_subscribed' => $subscribed,
    ]);

if ($updated) {
    if ($subscribed) {
        event(new Subscribed($email));
    } else {
        event(new Unsubscribed($email));
    }
}
} // [!code --]
```

We've reduced another level of indentation! Now if the contact doesn't have an email, we won't subscribe them. Terminated. We are getting to the core of what this function is actually accomplishing and less focused on what the edge cases are. So much easier to read.

If you look at line 17 above, you'll see another chunk of code inside a single if-statement. You guessed it--we are adding a guard clause.

```php
if (is_null($subscribed)) {
    return;
}

if (! ($email = $contact->email)) {
    return;
}

$updated = Contact::query()
    ->where('email', $email)
    ->where('is_subscribed', ! $subscribed)
    ->update([
        'is_subscribed' => $subscribed,
    ]);

if (! $updated) { // [!code ++]
    return; // [!code ++]
} // [!code ++]
// [!code ++]
// a little extra sugar for fun ;) // [!code ++]
$event = $subscribed ? Subscribed::class : Unsubscribed::class; // [!code ++]
$event::dispatch($email); // [!code ++]

if ($updated) { // [!code --]
    if ($subscribed) { // [!code --]
        event(new Subscribed($email)); // [!code --]
    } else { // [!code --]
        event(new Unsubscribed($email)); // [!code --]
    } // [!code --]
} // [!code --]
```

And look at that. We've completely reduced a 4x indented block of code to a single indentation. In my opinion, our result is much more readable. 

Since I discovered this pattern I've found places to refactor to it or use it just about every day.

I hope you find it as useful as I do. Good luck!
