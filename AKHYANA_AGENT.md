# AKHYANA — UNIVERSAL CODING AGENT INSTRUCTION

You are working directly inside the existing Akhyana codebase.

Your job is NOT to rebuild the application from scratch.

Your job is to understand the existing implementation, preserve what is good, make the requested changes safely, and leave the project in a working state.

---

# 1. PROJECT IDENTITY

Akhyana is an interactive learning application about India's history, culture, and heritage.

Core product philosophy:

> HISTORY SHOULD BE EXPERIENCED, NOT MERELY MEMORISED.

The intended learning journey is:

DISCOVER → EXPERIENCE → UNDERSTAND → INTERACT → REFLECT → REMEMBER

Akhyana should feel like an interactive historical journey, not a textbook, generic quiz app, or chatbot.

The current MVP is centered on the Indus Valley Civilization.

The architecture must remain modular enough to add additional civilizations and historical periods later.

---

# 2. CURRENT TECHNOLOGY

The project currently uses:

* Expo SDK 57
* React 19
* React Native 0.86.x
* TypeScript with strict mode
* Expo Router
* File-based routing
* React Native Reanimated
* react-native-safe-area-context

The main source structure currently uses:

src/
app/
components/
constants/
data/
hooks/
services/

IMPORTANT:

Before changing architecture, inspect the actual current repository.

Do not assume this document is more accurate than the code.

The codebase is the source of truth.

---

# 3. EXISTING ARCHITECTURE

The current application uses:

Civilization
→ Topic
→ Experience
→ Step

Historical content is primarily stored in:

src/data/

Important existing concepts include:

* Civilization
* Topic
* Experience
* InteractiveStep
* ArtifactRecord
* HistoricalSource
* GameModule
* UserProgressProfile
* RevisionConcept

Existing reusable UI includes components such as:

* ThemedText
* ThemedView
* Button
* ProgressBar
* SourceCitationBadge
* AnnotationTag
* ExperienceModeBadge
* HairlineDivider
* AkhyanaHeader
* AppTabs

Dynamic routes already exist for:

* civilization/[id]
* topic/[id]
* experience/[id]
* game/[id]

PRESERVE this general route architecture unless there is a concrete technical reason to change it.

---

# 4. CURRENT PRODUCT STATE

The current project is a prototype, not a production application.

Existing areas include:

* Learn
* Games
* Explore
* Progress
* Civilization details
* Topic details
* Learning experiences
* Game prototype
* Source citation UI
* Mock Heritage Guide

Current content is primarily Indus Valley Civilization content.

There are four main learning experiences.

The existing experience system supports narrative steps, evidence blocks, and some decision options with predefined consequences.

However, much of the learner progression is currently mock/static.

DO NOT pretend mock systems are real.

---

# 5. CRITICAL CURRENT LIMITATIONS

The existing application currently has limited/no:

* persistent learner state
* real XP calculations
* real mastery calculations
* real completion tracking
* event tracking
* adaptive revision
* interactive maps
* historical media system
* animated learning videos
* real AI API
* backend
* authentication
* multiplayer
* production game systems

The current mock progress data must NOT become the permanent architecture.

When implementing real functionality, replace mock behavior carefully rather than simply adding more hardcoded values.

---

# 6. TARGET PRODUCT DIRECTION

The intended Akhyana experience includes:

## HOME

Home should eventually provide:

* Continue Journey
* real learner progress
* next recommended experience
* Today in Indian History / Today's Significance
* curated date-aware historical content

Historical date content must come from curated data.

Do NOT let an AI invent historical events for this feature.

---

# 7. LEARN

The MVP contains four Indus Valley experiences:

1. The Grid City: Mohenjo-daro & Harappa
2. The Great Bath & Subterranean Drains
3. Lothal Dockyard & The Chert Weight System
4. The Pashupati Seal & Lost-Wax Metallurgy

The intended experience is:

Context
→ Visual Story
→ Exploration
→ Historical Evidence
→ Interaction / Decision
→ Consequence / Feedback
→ Historical Explanation
→ Completion

Not every experience must have identical screens.

The goal is meaningful historical understanding, not simply answering questions correctly.

---

# 8. VISUAL LEARNING

Akhyana should become visual-first.

Useful visual formats include:

* archaeological site imagery
* artifacts
* maps
* reconstructions
* diagrams
* drainage/water-flow diagrams
* trade-route maps
* timelines
* annotated historical visuals
* visual comparisons

IMPORTANT:

Never present fabricated AI imagery as authentic archaeological evidence.

If something is reconstructed or AI-assisted, clearly label it appropriately.

Real archaeological photographs must be authentic and properly sourced/licensed.

---

# 9. SHORT ANIMATED VIDEOS

The intended MVP includes approximately four short 1–2 minute 2D animated historical videos.

These should be:

* AI-assisted during production
* based on verified scripts
* reviewed for historical accuracy
* visually consistent
* closer to a digital museum / illustrated documentary
* NOT generic AI history videos

The videos should be pre-created and stored/preloaded as app assets.

DO NOT dynamically generate videos when the learner opens a lesson.

AI should assist with production, not invent historical facts at runtime.

---

# 10. EXPLORE

Explore should eventually contain:

* Civilizations
* Topics
* Artifacts
* Interactive Indus Valley map
* Timeline
* Quick facts
* Sources

Artifacts should eventually support meaningful visual exploration.

Timeline should eventually be a real timeline rather than merely a chronological list.

Maps should be implemented only when they genuinely improve understanding.

Do not add complexity just because a feature sounds impressive.

---

# 11. EVIDENCE / INTERPRETATION / UNCERTAINTY

Historical accuracy is a core requirement.

Where appropriate, distinguish:

EVIDENCE
What archaeology/source material directly supports.

INTERPRETATION
What historians/archeologists infer from the evidence.

UNCERTAINTY
What remains disputed, incomplete, or unknown.

Do not present disputed interpretations as established facts.

Do not invent translations of the undeciphered Indus script.

When adding historical content, prefer authoritative/credible sources and preserve source metadata.

---

# 12. REAL LEARNER PROGRESS

Eventually there should be ONE source of truth for learner state.

It should be capable of tracking things such as:

* experiences started
* experiences completed
* questions answered
* correct/incorrect answers where applicable
* decisions made
* artifacts viewed
* XP earned
* topic progress
* mastery
* revision needs
* milestones

Do not create separate hardcoded progress values for different screens.

Home, Learn, Progress, recommendations, and revision should eventually derive from the same learner state.

---

# 13. XP

XP should be awarded for meaningful learner activity.

Potential sources:

* completing an experience
* meaningful interaction
* exploring an artifact
* completing a challenge

Repeated actions must not create unlimited XP.

XP should eventually be calculated by a central progression system rather than hardcoded separately in screens.

---

# 14. MASTERY

Mastery is a product-level learning signal, not a scientific measurement.

Possible bands:

0–24   Starting
25–49  Exploring
50–74  Developing
75–89  Strong
90–100 Mastered

Do not represent mastery as scientifically precise.

Mastery should eventually derive from meaningful learner activity rather than static content values.

---

# 15. PERSONALIZED REVISION

Revision does NOT require machine learning for the MVP.

Use transparent rule-based logic.

Examples of signals:

* unfinished experience
* incorrect answer
* repeated difficulty
* low topic mastery

Then recommend a relevant experience/topic.

Avoid labels such as "weak student" or shame-oriented language.

---

# 16. AI

AI is NOT the identity of Akhyana.

AI should support the learning experience rather than replace the historical content system.

The existing AI service abstraction should be preserved if useful.

A future AI Guide should be:

* grounded in curated Akhyana content
* source-aware
* explicit about uncertainty
* prevented from freely hallucinating history

Never put an unrestricted AI model directly in charge of historical truth.

If implementing real AI, API credentials must NOT be embedded directly in the mobile client.

---

# 17. GAMING

Gaming is currently parked.

Do NOT spend development effort on multiplayer, leaderboards, complex game systems, or large game architecture unless explicitly requested.

The current priority is to make:

* learning
* exploration
* progress
* revision
* historical content

work properly first.

If gaming is later reactivated, build it on top of the existing modular architecture rather than rebuilding the app around games.

---

# 18. ENGINEERING RULES

These rules are mandatory.

## RULE 1 — INSPECT BEFORE EDITING

Before changing anything:

1. Identify the relevant files.
2. Read the existing implementation.
3. Understand how data flows.
4. Reuse existing components where appropriate.
5. Check whether the requested functionality already partially exists.

Do not blindly create replacement systems.

---

## RULE 2 — MINIMAL SAFE CHANGE

Make the smallest architectural change that correctly solves the request.

Do not rewrite unrelated files.

Do not redesign unrelated screens.

Do not replace working components merely because you prefer another implementation.

---

## RULE 3 — ONE SOURCE OF TRUTH

Avoid duplicate representations of the same state.

If progress is being implemented, establish a clear source of truth.

Do not fix inconsistencies by hardcoding additional values.

---

## RULE 4 — REUSE

Before creating a new component, search for an existing component that can be extended.

Before creating a new data model, inspect existing types.

Before creating a new service, inspect existing services.

---

## RULE 5 — NO FAKE FUNCTIONALITY

Do not create buttons that appear functional but do nothing.

Do not label mock behavior as AI.

Do not claim persistence if the state disappears on reload.

Do not claim multiplayer if there is no multiplayer system.

Do not create fake loading states to make a feature appear more advanced.

If something must remain a prototype, make that clear in the implementation.

---

## RULE 6 — CONTENT/LOGIC/UI SEPARATION

Where practical:

CONTENT
→ data models / content files

LOGIC
→ hooks / services / utilities

UI
→ components / routes

Do not put large amounts of business logic directly inside screen components if a reusable service or hook is more appropriate.

Do not over-engineer this separation for trivial code.

---

## RULE 7 — HISTORY ACCURACY

Do not invent historical facts.

Do not invent archaeological evidence.

Do not fabricate source citations.

Do not turn uncertain interpretations into facts.

If the repository contains questionable historical content, flag it rather than silently presenting it as verified.

---

## RULE 8 — ASSETS

Do not add copyrighted media without appropriate rights.

Do not scrape random images and present them as authentic archaeological material.

When using generated/reconstructed visuals, make their status clear.

---

## RULE 9 — DEPENDENCIES

Do not install a new dependency unless it is actually necessary.

Before adding one, check whether the existing Expo/React Native stack already provides a suitable solution.

Avoid unnecessary libraries.

---

## RULE 10 — EXPO COMPATIBILITY

Respect the existing Expo SDK version.

Before using unfamiliar Expo APIs, verify compatibility with the project's installed version/documentation.

Do not upgrade Expo or major dependencies unless explicitly required.

---

# 19. CREDIT / TOKEN EFFICIENCY

The human working on this project frequently switches coding agents/accounts because of usage limits.

Therefore:

DO NOT perform a huge repository-wide analysis for every small request.

Instead:

1. Read this document.
2. Inspect only the files relevant to the current task.
3. Search for dependencies/references when necessary.
4. Make the change.
5. Run focused checks.
6. Report what changed.

Only perform a full architectural audit when explicitly requested.

Avoid repeatedly printing huge amounts of source code.

Do not regenerate analysis that is already documented here unless the code has materially changed.

---

# 20. PROJECT CONTEXT FILE

If `AKHYANA_CONTEXT.md` exists in the repository, READ IT before making architectural changes.

This file should contain the latest project-specific implementation state.

If it does not exist and the project has reached a meaningful architectural milestone, you may create/update it ONLY when explicitly asked to maintain project context.

Do not create it automatically for a trivial change.

The context file should remain concise.

It should record:

* current architecture
* important files
* important data models
* implemented systems
* known limitations
* current development priorities
* architectural decisions

Do not duplicate the entire README or source code.

---

# 21. TASK EXECUTION PROTOCOL

Whenever the human gives you a development request, follow this process.

## STEP 1 — UNDERSTAND

Restate the requested change internally.

Identify:

* feature
* affected screen(s)
* affected data
* affected logic
* possible side effects

Do not ask unnecessary questions.

If the request is sufficiently clear, proceed.

---

## STEP 2 — INSPECT

Inspect the smallest relevant set of files.

Examples:

If changing Progress:
→ inspect progress screen
→ progress types/data
→ relevant experience logic
→ persistence/state layer if present

If changing an Experience:
→ inspect experience route
→ experience data/types
→ relevant components
→ progress/event logic if completion is involved

If changing Explore:
→ inspect explore route
→ relevant data
→ artifact/topic/civilization models
→ reusable visual components

Do NOT inspect the entire repository unless necessary.

---

## STEP 3 — PLAN

Before editing, identify:

* files to modify
* files to create, if genuinely necessary
* existing code to reuse
* risks

Prefer incremental implementation.

---

## STEP 4 — IMPLEMENT

Make the requested change.

Preserve existing behavior unless the request explicitly changes it.

Do not silently redesign unrelated functionality.

---

## STEP 5 — VALIDATE

After implementation:

* run TypeScript/type checks where available
* run lint where useful
* check for obvious route/import errors
* verify affected logic
* verify no unrelated files were accidentally modified

If a test/build cannot be run, state why.

Do not claim success without validation.

---

# 22. WHEN THE REQUEST IS LARGE

If the requested feature is large, break it into logical implementation stages.

Example:

REAL PROGRESS SYSTEM

Stage 1:
Create learner state model.

Stage 2:
Add persistence.

Stage 3:
Record experience events.

Stage 4:
Calculate XP/mastery.

Stage 5:
Connect Home.

Stage 6:
Connect Progress.

Stage 7:
Connect revision.

Do not attempt a giant rewrite in one step if it creates unnecessary risk.

---

# 23. DO NOT OVER-ENGINEER

Akhyana is currently an MVP/prototype.

Do not introduce:

* unnecessary backend architecture
* microservices
* complex state frameworks
* unnecessary databases
* elaborate design systems
* excessive abstractions
* complex AI pipelines

unless the actual product requirement justifies them.

The goal is:

SIMPLE → MODULAR → TESTABLE → SCALABLE ENOUGH

Not:

COMPLEX → ENTERPRISE → HARD TO CHANGE

---

# 24. FINAL RESPONSE AFTER EACH TASK

After completing a task, give a concise report:

## CHANGED

* What you changed.

## FILES

* Files modified/created.

## BEHAVIOR

* What now works.

## VALIDATION

* Tests/typecheck/lint/build performed.

## LIMITATIONS

* Anything intentionally left incomplete.

## NEXT

* Only mention the most relevant logical next step.

Do not dump the entire repository or a massive analysis unless requested.

---

# 25. HANDOFF MODE

If the human says:

"Give me a handoff"

or

"Give me context for another agent"

produce a concise handoff containing:

1. Project identity
2. Current architecture
3. Important files
4. Systems currently implemented
5. Systems still mocked/missing
6. Recent changes
7. Known technical issues
8. Recommended next step

Make it copyable.

Do not repeat unnecessary source code.

---

# 26. ABSOLUTE PRIORITY

When deciding between:

A flashy feature

and

A reliable underlying system

prefer the reliable underlying system.

Akhyana should ultimately be judged by whether a learner can genuinely:

DISCOVER
→ EXPERIENCE
→ UNDERSTAND
→ INTERACT
→ REFLECT
→ REMEMBER

—not by how many buttons, badges, AI features, or games the prototype contains.

---

# START

Before doing any work:

1. Read this instruction.
2. Inspect the repository only as much as needed for the current task.
3. Check whether an `AKHYANA_CONTEXT.md` exists.
4. Do not modify anything until you understand the relevant implementation.
5. Then execute the user's request with minimal safe changes.
6. Validate the result.
7. Report the result concisely.
