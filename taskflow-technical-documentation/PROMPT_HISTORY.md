# Prompt History

This file is a running, chronological log of every prompt used to produce the
TaskFlow documentation, in the order it was actually run. Entries are only
added *after* the corresponding prompt has actually been used — nothing here
is written in advance of the work it describes.

Each entry records: the stage, the goal, the prompt itself (or a faithful
summary of it), and what came out of it (accepted as-is, revised, or
rejected).

---

## Stage 0 — Specification creation

**Goal:** Establish a single, realistic, appropriately-scoped fictional
specification for TaskFlow that all later documentation must stay
consistent with.

**Prompt used:**

> Create a detailed but manageable fictional TaskFlow specification. TaskFlow
> should be a simple web-based task management application. The
> specification must define: what TaskFlow is, the target users,
> authentication behaviour, the task data model, supported task operations,
> API endpoints, request formats, response formats, authentication
> requirements, validation rules, common errors, and features that are
> explicitly NOT supported. Use this feature scope: registration, login, and
> bearer-token auth; create/view-all/view-one/update/delete/mark-complete for
> tasks; task fields id, title, description, status, createdAt, updatedAt. Do
> not add unsupported features such as email notifications, file uploads,
> team collaboration, calendar integration, social login, task priorities,
> due dates, or password reset.

**Outcome:** Accepted, with the specification written to
`PROJECT_SPECIFICATION.md`. This document is now treated as final/frozen —
see the note at the top of that file. No features were added beyond the
requested scope; the "explicitly not supported" list in Section 8 was
expanded slightly beyond the minimum requested list (e.g., added "no
pagination/filtering," "no logout endpoint") to close gaps that would
otherwise be ambiguous once the API reference is written.

---

## Stage 1 — Getting Started guide (end users)

**Purpose:** Produce a first-pass draft of `docs/getting-started.md` — a
plain-English guide for non-technical end users covering account creation,
login, and the full set of task operations, using only features confirmed
in `PROJECT_SPECIFICATION.md`.

**Prompt used:**

> We are now beginning Stage 1 of the AI-assisted documentation workflow.
> Read PROJECT_SPECIFICATION.md, DOCUMENTATION_PLAN.md, and
> PROMPT_HISTORY.md first. Do not modify PROJECT_SPECIFICATION.md — it is
> frozen. Create the FIRST PASS of the Getting Started guide for TaskFlow.
> Audience: non-technical end users, new users who have never used TaskFlow
> before. Requirements: use only features confirmed in
> PROJECT_SPECIFICATION.md; explain what TaskFlow is; explain how a user
> registers, logs in, creates a task, views all tasks, views one task,
> updates a task, marks a task pending/completed, and deletes a task;
> explain relevant validation rules an end user needs to understand; use
> simple, plain English and avoid unnecessary technical jargon; do not
> explain API endpoints, HTTP methods, bearer tokens, JSON, or
> implementation details; do not mention unsupported features; do not
> invent UI labels, buttons, screens, or workflows not supported by the
> specification. This is a first pass, not the final polished version — do
> not over-optimize yet. Write the draft to docs/getting-started.md.

**Note on this prompt vs. the plan:** `DOCUMENTATION_PLAN.md` describes the
first pass as a deliberately *generic*, under-specified prompt (e.g. "write
a getting started guide for a task app") that would produce a template full
of invented details, to be caught in review. The actual prompt used here
was already grounded in the specification's constraints from the start
(explicitly forbidding invented UI, unsupported features, and API jargon).
This is a deliberate deviation from the plan's idealized sequence — the
draft below is still a genuine first pass (unreviewed, unrefined) but
starts from a stronger baseline than a fully generic prompt would have.
This is recorded here rather than silently treated as if the plan's
original sequence had been followed exactly.

**Summary of what was generated:** A guide with the sections: What is
TaskFlow, Creating Your Account, Logging In, Managing Your Tasks (with
subsections for creating, viewing all, viewing one, updating, marking
pending/completed, and deleting a task), and a closing "Things to Keep in
Mind" validation summary. No HTTP methods, status codes, tokens, or JSON
appear anywhere in the draft. No UI elements (button names, menu labels,
screen names) are invented — actions are described generically (e.g., "go
to the registration page," "submit the form") since the specification does
not define any UI at all.

**Status:** This is a first-pass draft awaiting fact-checking and
refinement (see Stage 1 Review Notes below). It has not yet been compared
line-by-line against the specification's validation and behavior details in
full, and it has not gone through the chaining/tone-standardization pass.

### Stage 1 Review Notes

Assumptions made by the draft:

- Because the specification defines only API behavior and no UI, the draft
  assumes a generic web flow ("registration page," "login page," "task
  list") without naming specific screens, buttons, or menus. This is a
  reasonable placeholder but is an assumption, not something confirmed by
  the specification. **Resolution:** kept as-is after refinement — this
  generic phrasing is the correct level of detail given the specification
  defines no UI, and it introduces no invented controls.
- The draft assumes deletion is final ("removed from your task list") but
  deliberately does not claim it's *permanent* or *irreversible*, since the
  specification doesn't state whether deleted tasks can be recovered. Worth
  confirming this wording is acceptable, or deciding explicitly one way or
  the other. **Resolution:** kept neutral after refinement. The guide
  states only that a deleted task "no longer appears in your task list"
  and makes no claim in either direction, per the specification's silence
  on recoverability.
- The draft assumes task list order is unspecified and does not claim any
  particular sort order, consistent with Section 5 of the specification
  (no sorting/filtering supported) — but this isn't called out explicitly
  to the reader, which could read as an omission rather than a deliberate
  choice. **Resolution:** left unaddressed — the guide still makes no
  claim about ordering, which is accurate; calling out the *absence* of
  sorting/filtering was judged unnecessary detail for a first-time user
  and out of place in an end-user guide (this is exactly the kind of
  "unsupported feature" callout the getting-started guide should not
  dwell on).

Ambiguities surfaced:

- **No logout defined.** Section 8 of the specification explicitly rules
  out a logout endpoint, and Section 3.2 says tokens don't expire. The
  draft avoided inventing a "log out" step, but never told the user how a
  session ends. **Resolution:** fixed in the refinement pass — the Logging
  In section now states explicitly, "Once you're logged in, you stay
  logged in. TaskFlow does not currently provide a separate log-out
  option." This states the confirmed fact (no logout endpoint, tokens
  don't expire) without inventing any new behaviour (e.g., it does not
  claim that closing the browser tab ends a session, since client-side
  session storage is out of scope per Section 10).
- **Failure messaging is vague.** For login failures and validation
  failures, the draft uses soft language ("you won't be let in," "double
  check for typos") rather than anything specific, because the
  specification defines HTTP-level error responses (`401`, `400`) but no
  user-facing copy. **Resolution:** kept as-is — this is the correct level
  of detail for an end-user guide; specific error copy belongs in
  `docs/troubleshooting.md` (Stage 3), not here.

Areas requiring fact-checking or refinement — all checked in the Stage 1
refinement pass below:

- Every validation rule in "Things to Keep in Mind" checked against
  Section 7 — all accurate (see refinement entry).
- The relationship between "updating a task" and "marking a task as
  pending or completed" was ambiguous in the first pass (see refinement
  entry, issue 1) and has been corrected.
- Full re-read against the Section 8 unsupported-features list completed —
  no violations found.
- Tone/heading-level consistency with the other two documents remains
  deferred to the Stage 4 chaining pass, per `DOCUMENTATION_PLAN.md`.

### Stage 1 — Refinement pass (fact-check and rewrite)

**Purpose:** Fact-check the Stage 1 first-pass draft line-by-line against
`PROJECT_SPECIFICATION.md`, resolve the ambiguities and open items recorded
in the Stage 1 Review Notes above, and improve clarity/scannability without
changing what TaskFlow is documented to do.

**Prompt used:**

> We are now completing Stage 1 by fact-checking and refining the
> first-pass Getting Started guide. Read PROJECT_SPECIFICATION.md,
> DOCUMENTATION_PLAN.md, docs/getting-started.md, and PROMPT_HISTORY.md.
> Do not modify PROJECT_SPECIFICATION.md. Perform a strict line-by-line
> fact-check of docs/getting-started.md against PROJECT_SPECIFICATION.md,
> checking specifically: every authentication instruction is supported;
> every task operation is supported; every validation rule is accurate; the
> distinction between updating a task and changing its status is accurate;
> no unsupported feature from Section 8 has been introduced; no API or
> implementation details have leaked into the guide; no UI controls,
> labels, screens, or workflows have been invented beyond the generic
> wording necessary to explain how a user would use the application; the
> guide does not make unsupported claims about deletion being permanent or
> reversible; the guide does not invent logout behaviour, token expiration,
> sorting, filtering, or ordering; the guide is understandable to a
> non-technical user. Resolve any issues found by editing
> docs/getting-started.md, then improve the guide's clarity, scannability,
> heading consistency, and use of numbered steps for procedures, without
> adding features or behaviours not supported by PROJECT_SPECIFICATION.md.

**Fact-checking checks performed:** all 10 checks listed in the prompt
above, each verified against the specific specification section that
governs it (Sections 3, 4, 5, 6.3–6.7, 7, and 8).

**Issues found in the first pass:**

1. **Inaccurate split between "updating a task" and "marking a task as
   pending or completed."** The first pass described these as if they were
   two separate kinds of action — "Updating a Task" only mentioned title
   and description, while status changes lived in a different section.
   Per Section 6.6, a single update can change title, description, and/or
   status together in one action; the first pass's phrasing could mislead
   a reader into thinking status can't be changed alongside other fields,
   or that "marking complete" is a distinct feature from "updating."
2. **Password requirement understated as optional-sounding.** "Your
   password *should* be at least 8 characters long" reads as a
   recommendation rather than the hard requirement it is (Section 7:
   minimum 8 characters, enforced with a `400` if violated).
3. **No-logout ambiguity left unresolved.** The first pass simply never
   mentioned logging out, which could read as an omission rather than a
   documented fact about the product.
4. **Email validation description slightly loose.** "A valid-looking email
   address" didn't reflect the specification's actual, checkable rule
   (Section 7: must contain `@`).
5. **Procedures not consistently presented as numbered steps.** "Updating
   a Task," "Marking a Task as Pending or Completed," and "Deleting a
   Task" were prose paragraphs, inconsistent with the numbered-step style
   used for registration and login.

**Changes made:**

- Merged the update/status-change relationship: "Updating a Task" now
  explicitly covers title, description, and/or status together, and
  "Marking a Task as Pending or Completed" now states up front that it "is
  simply an update to its status — there's no separate 'complete task'
  action," then gives its own numbered steps for that specific case.
- Changed "should be at least 8 characters" to "must be at least 8
  characters long" (Creating Your Account and Things to Keep in Mind).
- Added one sentence to Logging In: "Once you're logged in, you stay
  logged in. TaskFlow does not currently provide a separate log-out
  option." — states the specification's actual behaviour (Section 3.2, no
  expiry; Section 8, no logout endpoint) without inventing any new
  behaviour.
- Changed the email rule to "must be a valid email address (it must
  include an `@`)," matching Section 7 exactly.
- Rewrote "Creating a Task," "Updating a Task," "Marking a Task as Pending
  or Completed," and "Deleting a Task" as numbered step-by-step
  procedures, matching the style already used for registration and login.
  Heading levels (H2 for top-level sections, H3 for the task-operation
  subsections under "Managing Your Tasks") were left unchanged, since they
  were already consistent.

**Why the refined version is more accurate/clearer:**

- It no longer implies that changing a task's status is a different kind
  of operation from updating a task — it now matches Section 6.6 of the
  specification, where title, description, and status are all optional
  fields on the same update.
- The password rule now reads as the hard requirement it is, rather than a
  soft suggestion, matching Section 7.
- The no-logout behaviour is now a documented, confirmed fact instead of a
  silent gap a reader might mistake for missing content.
- Every procedure (register, log in, create, update, mark complete/
  pending, delete) is now presented the same way — numbered steps — making
  the guide easier to scan and follow for a first-time, non-technical
  user.
- No wording anywhere claims deletion is permanent or reversible, invents
  sorting/filtering/ordering, or references HTTP methods, status codes,
  tokens, or JSON — confirmed on this refinement pass as well as the
  original draft.

---

## Stage 2 — API Reference (developers)

*Not yet started.*

- [ ] First-pass prompt (generic)
- [ ] Review against specification
- [ ] Refinement prompt(s) with grounded spec context
- [ ] Fact-check notes

---

## Stage 3 — Troubleshooting guide (QA / support)

*Not yet started.*

- [ ] First-pass prompt (generic)
- [ ] Review against specification
- [ ] Refinement prompt(s) with grounded spec context
- [ ] Fact-check notes

---

## Stage 4 — Chaining pass (style/tone/heading standardization)

*Not yet started.*

- [ ] Chaining prompt across all three documents
- [ ] Before/after notes

---

## Stage 5 — Final assembly

*Not yet started.*
