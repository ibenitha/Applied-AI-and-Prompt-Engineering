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

### Stage 2 — API Reference First Pass

**Purpose:** Produce a first-pass draft of `docs/api-reference.md` — a
precise, developer-facing reference documenting every endpoint defined in
`PROJECT_SPECIFICATION.md`, with method, path, auth requirement, request
body, success response, error responses, and validation behaviour for each.

**Prompt used:**

> We are now beginning Stage 2: API Reference. Read
> PROJECT_SPECIFICATION.md, DOCUMENTATION_PLAN.md, PROMPT_HISTORY.md, and
> docs/getting-started.md first. PROJECT_SPECIFICATION.md is the frozen
> source of truth — do not modify it. Create the first-pass API Reference
> in docs/api-reference.md, for developers integrating with or working on
> the TaskFlow API. The API Reference must document every endpoint defined
> in PROJECT_SPECIFICATION.md and no endpoints that are not defined there.
> For every endpoint, document: HTTP method, endpoint path, purpose,
> authentication requirement, request parameters/body, required and
> optional fields, successful response status and body, relevant error
> responses, and validation behaviour. Cover: user registration, user
> login, listing the authenticated user's tasks, retrieving one task,
> creating a task, updating a task, and deleting a task. Make the
> relationship between updating a task and changing its status clear —
> status is one of the fields an update can change; marking a task
> pending/completed is not a separate endpoint; do not invent a
> mark-complete endpoint. Authentication documentation must accurately
> reflect the specification's exact bearer-token behaviour — do not invent
> token expiration, refresh, logout, or revocation behaviour, and clearly
> identify which endpoints require authentication. Use only fields and
> values supported by the specification in examples; do not invent extra
> fields; keep examples internally consistent; ensure status codes and
> validation/error examples match the specification. Use clear Markdown
> formatting: an overview up front, consistent per-endpoint headings, HTTP
> methods/paths clearly visible, JSON code blocks, tables only where they
> improve readability, and avoid unnecessary repetition. This is the first
> pass — do not perform a separate final style-chaining pass yet.

**Summary of the API Reference generated:** An Overview section (base URL,
content-type rule, and a summary table of all 7 endpoints), an
Authentication section describing the register → login → bearer-token flow
and per-user task scoping, and one subsection per endpoint (Register a
user, Log in, Create a task, List tasks, Retrieve a task, Update a task,
Delete a task) each with method/path, auth requirement, a request-field
table where applicable, a JSON request example, the success response
status and JSON body, and an error-response table. The "Update a task"
section explicitly states that marking a task pending/completed is done
through this same endpoint by setting `status`, with no separate
mark-complete endpoint. A closing "Notes on scope" section states plainly
that only these 7 endpoints exist and lists categories of unsupported
functionality that are intentionally absent. Every JSON example reuses the
exact field names, values, IDs, and timestamps from
`PROJECT_SPECIFICATION.md` Section 6.

**Status:** This is a first-pass draft awaiting fact-checking and
refinement (see Stage 2 Review Notes below). It has not yet gone through
the chaining/tone-standardization pass (Stage 4).

### Stage 2 Review Notes

Assumptions identified:

- The email-format rule (`must contain @`, Section 7) was documented as
  enforced at **registration** only, but the draft's "Log in" endpoint
  only listed `400` for missing `email`/`password`, not for a malformed
  email. Section 7's wording ("Required for register/login; must contain
  `@`; must be unique at registration") is ambiguous about whether the
  format check also applies at login. **Resolution:** resolved in the
  refinement pass — see the refinement entry below for the decision and
  reasoning.
- The draft assumed `GET`/`DELETE` requests simply have no body, and
  stated this explicitly ("Request body: none"), even though the
  specification never makes that statement — it only requires
  `Content-Type: application/json` for requests that *do* include a body.
  **Resolution:** resolved in the refinement pass — the unsupported
  "Request body: none" lines were removed rather than left as an assumed
  claim (see refinement entry).
- Endpoint headings used conventional REST verbs ("List tasks," "Retrieve
  a task") rather than the specification's own section titles ("View all
  tasks," "View a single task," Section 6.4–6.5). **Resolution:** resolved
  — headings now match the specification's own titles exactly (see
  refinement entry).

Possible inaccuracies: none identified in the first pass. Every method,
path, status code, field name, and JSON example was drawn directly from
`PROJECT_SPECIFICATION.md` Section 6 with no alterations.

Missing information:

- The specification defines error **status codes and causes** (Section 9)
  but never defines a JSON error response **body shape**. The draft
  intentionally does not invent one (e.g., no fabricated
  `{"error": "..."}` schema). **Resolution:** left as-is — confirmed
  correct on the refinement pass; inventing an error body shape would be
  presenting an assumption as a specification fact, which the
  specification does not support.
- No mention of API versioning behaviour beyond the `/v1` path segment, or
  rate limiting — both are explicitly out of scope per Section 10, so
  their absence is intentional and unchanged.

Examples requiring fact-checking:

- All JSON request/response examples were copied field-for-field from
  Section 6 of the specification. A formal side-by-side diff was performed
  as part of the refinement pass and again immediately before commit — no
  discrepancies found.

Areas requiring refinement — all addressed in the Stage 2 — API Reference
Refinement entry below:

- Login email-format handling — resolved.
- `GET`/`DELETE` request-body wording — resolved.
- Endpoint heading terminology — resolved.
- Redundant phrase in the Authentication section — resolved.
- Tone/heading-level consistency with the other two documents remains
  deferred to the Stage 4 chaining pass, per `DOCUMENTATION_PLAN.md` — not
  addressed here, by design.

### Stage 2 — API Reference Refinement

**Purpose:** Fact-check the Stage 2 first-pass draft line-by-line against
`PROJECT_SPECIFICATION.md`, resolve every open item in the Stage 2 Review
Notes above (in particular the login email-format ambiguity), remove any
statement not directly supported by the specification, and improve
readability and cross-document terminology consistency without changing
what the API is documented to do.

**Prompt used:**

> We are now completing Stage 2 by fact-checking and refining the API
> Reference. Read PROJECT_SPECIFICATION.md, DOCUMENTATION_PLAN.md,
> docs/api-reference.md, docs/getting-started.md, and PROMPT_HISTORY.md.
> Do not modify PROJECT_SPECIFICATION.md. Perform a strict, line-by-line
> comparison of docs/api-reference.md against PROJECT_SPECIFICATION.md and
> verify every endpoint for technical accuracy: HTTP methods, paths, auth
> requirements, request-body fields (only supported ones), required vs.
> optional fields, response-body fields (only defined ones), success status
> codes, documented error statuses, validation rules, internal consistency
> of JSON examples, no unsupported endpoints or fields introduced, the
> update-vs-status relationship (status is updated through the Update Task
> endpoint; no separate mark-complete endpoint), authentication accuracy
> (bearer token format, no refresh, no logout, no expiration beyond what's
> stated), and that no assumptions are presented as specification facts.
> Resolve every issue in the Stage 2 Review Notes — in particular, decide
> whether email-format validation applies only to registration or also to
> login, based strictly on PROJECT_SPECIFICATION.md; replace REST
> terminology that differs unnecessarily from the specification's own
> endpoint titles; remove or reword statements implying behaviour not
> explicitly defined (such as request bodies for GET/DELETE); tighten
> repetitive wording without changing meaning; preserve all supported
> examples while keeping them technically accurate. Then improve
> readability: consistent heading hierarchy, identical endpoint-section
> structure, consistently formatted tables, consistent JSON indentation,
> and terminology consistent with docs/getting-started.md where
> appropriate.

**Fact-checking checks performed:** all 15 checks listed in the prompt
above, each verified directly against the specification section that
governs it (Sections 3, 4, 5, 6.1–6.7, 7, 8, and 9). Every HTTP method,
path, auth requirement, request/response field, status code, and JSON
example in the draft was re-compared line-by-line against
`PROJECT_SPECIFICATION.md` Section 6 a second time during this pass.

**Issues identified in the first pass:** the three assumptions and the one
wording issue already recorded in the Stage 2 Review Notes above (login
email-format ambiguity; unsupported "Request body: none" claims on
`GET`/`DELETE` endpoints; endpoint heading terminology diverging from the
specification's own section titles; a redundant phrase in the
Authentication section). No factual errors (wrong methods, paths, status
codes, or fields) were found — the issues were all about unstated
assumptions or wording, not incorrect technical claims.

**Issues resolved:**

1. **Login email-format validation.** Decision: the format rule (`must
   contain @`) **applies to both registration and login**. Reasoning,
   based strictly on Section 7's text: the `email` row states "Required
   for register/login" up front, covering both operations, and then lists
   "must contain `@`" as an unqualified rule for the field itself.
   Immediately after, "must be unique at registration" *is* explicitly
   scoped to one operation — showing that when the specification means to
   restrict a rule to a single operation, it says so. Since the `@` format
   rule carries no such qualifier, the more defensible reading is that it
   applies wherever `email` is required, i.e., both endpoints. The "Log
   in" section's request-field table and error table were updated to
   state this plainly, as a documented validation rule — not hedged or
   flagged as uncertain in the reference itself, since the API reference
   is meant to be authoritative. The reasoning behind the decision is
   recorded here, not silently presented as if Section 7 stated it
   verbatim for login.
2. **Unsupported `GET`/`DELETE` request-body claims.** The "Request body:
   none" lines on View all tasks, View a single task, and Delete a task
   were removed rather than reworded, matching the specification's own
   presentation (Sections 6.4, 6.5, and 6.7 never mention a request body
   for these endpoints at all — they simply omit the section).
3. **Endpoint heading terminology.** "List tasks" → "View all tasks" and
   "Retrieve a task" → "View a single task," matching
   `PROJECT_SPECIFICATION.md` Section 6.4/6.5 titles exactly. The Overview
   table's purpose column was updated to match. This also brings the API
   reference into closer terminology alignment with
   `docs/getting-started.md`'s "Viewing Your Tasks" / "Viewing a Single
   Task" sections.
4. **Redundant phrasing.** "There is no token refresh endpoint and no
   logout/token-revocation endpoint — none is defined" tightened to
   "There is no token refresh endpoint and no logout/token-revocation
   endpoint." "Tokens do not expire within this API" tightened to "Tokens
   do not expire," without dropping any meaning.

**Improvements made:**

- Heading hierarchy, per-endpoint section structure (name → method/path →
  description → auth → request → response → errors), and table formatting
  are now identical across all 7 endpoints.
- JSON examples retain consistent 2-space indentation throughout, unchanged
  from the first pass (already consistent).
- Status banner at the top of the document updated from "First-pass draft"
  to "Fact-checked and refined (Stage 2 complete)."

**Verification:** The refined `docs/api-reference.md` was compared against
`PROJECT_SPECIFICATION.md` a final time, endpoint by endpoint, method by
method, field by field. No discrepancies were found.
`PROJECT_SPECIFICATION.md` was not modified at any point in this stage.

---

## Stage 3 — Troubleshooting guide (QA / support)

### Stage 3 — Troubleshooting Guide First Pass

**Purpose:** Produce a first-pass draft of `docs/troubleshooting.md` — a
practical guide for end users and developers covering only the problems
that can genuinely occur according to `PROJECT_SPECIFICATION.md`, with
problem, likely cause, resolution, status code, and cross-references for
each.

**Prompt used:**

> We are now beginning Stage 3: Troubleshooting Guide. Read
> PROJECT_SPECIFICATION.md, DOCUMENTATION_PLAN.md, PROMPT_HISTORY.md,
> docs/getting-started.md, and docs/api-reference.md first.
> PROJECT_SPECIFICATION.md is the frozen source of truth — do not modify
> it. Create the first-pass Troubleshooting Guide in
> docs/troubleshooting.md, for end users and developers testing or
> integrating with the TaskFlow API. Help readers diagnose and resolve
> problems that are explicitly supported by PROJECT_SPECIFICATION.md;
> document only problems that can genuinely occur according to the
> specification. Include only supported issues: unable to register,
> registration validation errors, email already exists, unable to log in,
> invalid email format, incorrect password, missing or invalid
> authentication token, unauthorized request, task not found, invalid task
> data, missing required fields, invalid status values, validation
> failures during updates. For every topic include: problem, likely cause,
> resolution, relevant API status code(s), and a cross-reference to
> docs/getting-started.md or docs/api-reference.md when helpful. Do not
> invent troubleshooting scenarios. Do NOT include: password reset, email
> verification, rate limiting, account locking, network failures, database
> outages, server crashes, performance tuning, pagination issues,
> sorting/filtering problems, token refresh, token expiration, logout
> behaviour, admin features, or unsupported endpoints. Keep explanations
> concise, practical, and easy to scan, with consistent Markdown
> formatting (H2 sections, H3 subsections, tables only where they help,
> bullet lists for resolutions). This is the first pass — do not perform
> the refinement pass yet.

**Summary of the Troubleshooting Guide created:** A Quick Reference table
mapping the four error status codes (`400`, `401`, `404`, `409`) to what
they generally mean, followed by two H2 groups. "Registration and Login
Problems" covers: Can't Register ("Bad Request"), Email Already
Registered, Invalid Email Format (explicitly noted as applying to both
registration and login), Can't Log In ("Bad Request"), and Incorrect Email
or Password ("Unauthorized"). "Task Problems" covers: Missing or Invalid
Token, Task Not Found, Can't Create a Task, and Can't Update a Task
(covering empty request bodies, blank titles, and invalid status values —
explicitly folding in "marking a task pending/completed" as part of the
same update topic, not a separate one). Every topic follows the same
Problem / Likely cause / Resolution / Status code / See-also structure,
with links into `docs/getting-started.md` and `docs/api-reference.md`
anchors.

**Status:** This is a first-pass draft awaiting fact-checking and
refinement (see Stage 3 Review Notes below). The refinement pass has not
been performed yet, per instruction.

### Stage 3 Review Notes

Assumptions identified:

- **Title/description length violations are not stated as explicit error
  causes for `POST /tasks` or `PATCH /tasks/{id}`.** Section 6.3's and
  6.6's error tables only say "missing or empty title" / "empty title" as
  the `400` condition — they don't literally say "title over 200
  characters" or "description over 2,000 characters" triggers `400`, even
  though Section 7's validation table states those exact length limits.
  The draft's "Likely cause" bullets for Can't Create/Update a Task only
  list missing/blank title and invalid status, and only mention the
  length limits in the "Resolution" text — it does not assert length
  violations as a confirmed error *cause* in the same direct way. This
  gap between the endpoint-specific error tables (Section 6) and the
  general validation table (Section 7) should be resolved deliberately in
  refinement, not left as an inconsistency between what's listed as a
  cause versus what's implied by the resolution advice.

Possible inaccuracies: none identified against Sections 3, 6, 7, and 9 —
every status code and cause used was drawn directly from those sections.

Missing troubleshooting topics: none of the requested topics were omitted;
all 13 items from the prompt are covered across the two H2 groups.

Wording that requires refinement:

- The "Can't Create a Task" and "Can't Update a Task" sections should
  decide, explicitly, whether to list length violations (title >200 chars,
  description >2,000 chars) as a stated "likely cause," to resolve the
  Section 6 vs. Section 7 gap noted above.
- "Incorrect Email or Password" states "TaskFlow returns the same error
  either way" — this is a fair reading of Section 6.2's error table (both
  causes map to one `401` row), but it's phrased less explicitly than
  Section 3.3's stated policy for tasks ("TaskFlow does not reveal whether
  a task ID belongs to someone else"). Worth confirming this inference is
  acceptable to state as plainly as it currently is.

Places where the specification leaves behaviour unspecified (or is
internally inconsistent):

- **Section 9 vs. Sections 3.2/8 on token expiry.** Section 9's `401`
  row lists "expired/invalid token" as a typical cause, but Section 3.2
  states tokens "do not expire within the scope of this specification,"
  and Section 8 explicitly lists "token expiry" as unsupported. This is a
  minor internal tension in the specification itself: Section 9 appears to
  carry over generic error-reference language that doesn't quite match
  the specification's own stated behaviour elsewhere. The first-pass draft
  deliberately did **not** mention "expired" tokens as a cause in the
  "Missing or Invalid Token" topic, to stay consistent with Sections 3.2
  and 8 rather than Section 9's wording. This choice, and the underlying
  tension in the specification, should be confirmed as the right call
  before treating this topic as fact-checked, since `PROJECT_SPECIFICATION.md`
  itself cannot be modified to resolve the inconsistency.

---

## Stage 4 — Chaining pass (style/tone/heading standardization)

*Not yet started.*

- [ ] Chaining prompt across all three documents
- [ ] Before/after notes

---

## Stage 5 — Final assembly

*Not yet started.*
