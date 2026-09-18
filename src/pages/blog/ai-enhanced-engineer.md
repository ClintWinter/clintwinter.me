---
layout: ../../layouts/BlogPostLayout.astro
title: "The AI-Enhanced Engineer"
description: "A dive into Laravel's Conditionable trait: how to use it and how it works under the hood."
author: Clint Winter
publishedAt: 2026-09-18 15:00
createdAt: 2026-09-18 14:45
---

_This is how I’ve come to feel AI is most effectively used in a way that balances long-term growth with efficiency for the company, the codebase, and the engineer all together. I believe tipping the scales in either direction too much is at the expense of at least one of these._

---

The AI-enhanced engineer leverages an LLM where it excels. They do NOT cede control over to an LLM.

The AI-enhanced engineer is the source of context, and takes responsibility for full depth of understanding on any problem. LLMs have decaying context, and the ephemeral nature of conversation-based development means expecting the LLM to maintain full context indefinitely is a fool’s errand.

The AI-enhanced engineer cuts through LLM-style phraseology and always wants sources of given information, direct code blocks/links, and proofs of any information given.

The AI-enhanced engineer uses the LLM to grok systems and codebases more quickly, using direct sources, in combination with investigating themselves.

The AI-enhanced engineer uses the LLM to help with researching solutions. Humans forget things, but LLMs can scan the codebase quickly for areas where a change may have unintentional impact. The engineer combines their domain expertise with the LLMs capacities.

The AI-enhanced engineer delegates work to LLMs where it makes sense. The engineer thinks deeply about the problem and the possible solutions. They may stub out the makings of a solution and see if it feels right. Once it takes shape, parts of the implementation are delegated to the LLM, which can be given specific, concrete context for their task at this point.

The AI-enhanced engineer uses LLMs for code review. LLMs are good at catching obscure bugs that can get overlooked, and can review quickly. The engineer reviews code, too, because LLMs are prone to making odd decisions.

The AI-enhanced engineer does NOT treat LLM code as gospel, and will iterate on their own or with the LLM to hone the code. LLMs use poor naming, bloated solutions, and often introduce subtle gotchas.

The AI-enhanced engineer stays grounded in the code. They never let the LLM run away with more code than they can process, otherwise they become subject to the LLM and lose control.

The AI-enhanced engineer uses LLMs to save themselves time, such as sweeping changes across a codebase that are simple but difficult to find&replace manually, or writing boilerplate design patterns that are easy to explain.

The AI-enhanced engineer understands that skills and instructions are often ignored or ineffective. Telling it to act like a staff engineer does not, in fact, make it act like one. The engineer does not need the LLM to be a staff engineer, they are the engineer and make informed decisions.

The AI-enhanced engineer recognizes that their own learning, growth and expertise is critical to the health of their career, and does not allow themselves to be AI-subjected, where no thinking or skills are exercised.

The AI-enhanced engineer always writes and responds in their own words, unless otherwise CLEARLY noted, and mostly to provide context to other LLMs.

## AI-subjected vs. AI-enhanced in practice

### The AI-subjected engineer

An AI-subjected engineer describes a feature to an LLM, or hands it a linear ticket.

The LLM proposes a solution or set of possible solutions.

The engineer chooses a solution that sounds good and let’s the LLM make a plan. There may be some back and forth on the plan.

The LLM executes the plan. At some point during the plan, the LLM may flag unexpected encounters during implementation that the engineer is asked to settle.

The engineer, lacking context, asks for the LLMs opinion. The LLM solution introduces out-of-scope or unintended side-effects and hits a wall.

The engineer goes back to step 1 and chooses a new plan, hoping this one works out.

The engineer has a hard time reviewing/understanding their code if they do so at all.

They lack the ability to explain anything about the system built by the LLM without the LLM’s help.

They forward review comments directly to the LLM.

Issues with the shipped feature are forwarded to the LLM.

If the LLM gets stuck or the LLM server is down, the engineer is out of luck.

The engineer forgets all of the details of this feature in 6 months.

The engineer learned nothing and their skills are deteriorating.

### The AI-enhanced engineer

An AI-enhanced engineer receives a feature in an unfamiliar area.

They ask for a high-level explanation of that area of the code and its functions with sources and possibly historical documentation via PR/commit review.

They ask for a map of the flow through the code for various actions, and then follow them through the code themselves for full understanding.

They interact with the feature as a user to put the pieces together.

They describe to the LLM what their goal is and ask it to flag any areas that may be impacted unintentionally.

The engineer, now having full context and grasping the code, thinks about a fitting solution and may write or have the LLM write a stub to evaluate the fit.

The engineer, may use the LLM as a rubber duck to weigh their solutions or see if the LLM has a different angle. This is different from simply asking for the answer because it is grounded in full context and understanding of a specific piece of work.

Eventually, the engineer lands on a solution they like. They delegate portions of work to the LLM that doesn’t require too much context or too many tasks at once.

As the LLM returns its tasks, the engineer reviews each snippet independently and ensures they meet standards, checking for bloat, misunderstood instructions, performance issues, etc.

The engineer has an independent LLM review the code, while providing context on the feature.

They submit their PR, ready to answer questions and review comments on their work with answers that are accurate and concise.

The engineer can handle any bugs or emergencies that may crop up.

The engineer has long-term knowledge of the feature because of their level of engagement with the codebase and solution.

## Miscellaneous notes

- **This is not written in stone.** I’ve been wrong about AI before and I’ll be wrong again. In a year this could be horribly outdated, but it does seem that some stability has been achieved as of late as far as advancement.

- **"I don’t work like this, are you saying I’m doing it wrong?"**<br>Honestly, I don’t know! I’d love for you to show me what you think I’m missing and maybe I’ll learn something and change my mind. But for me, if I go too heavy on the AI, I don’t feel like my feet are planted, it becomes hard to keep up with, and I end up in that AI-subjected space.<br>As with all engineering opinions, I have a specific context in mind with these principles. Would I let AI vibe code its way to a solution for a prototype I’m likely to throw away? Yeah, probably.

- These principles are sometimes relaxed if I already understand the domain very well and feel confident the solution is straightforward enough that the LLM will know what to do with some basic direction. Recognizing those opportunities comes with practice.

- **"Are you worried about falling behind on the latest AI workflows?"**<br>I don’t think so. The skills, plugins, and tools don’t have a steep learning curve, so catching up is pretty easy on an individual level. The harder part is leveraging AI at the system level to benefit the team/department/company in a way that doesn’t backfire.
