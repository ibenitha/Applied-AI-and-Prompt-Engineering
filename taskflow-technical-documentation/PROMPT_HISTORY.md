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

*Not yet started.*

- [ ] First-pass prompt (generic)
- [ ] Review against specification
- [ ] Refinement prompt(s) with grounded spec context
- [ ] Fact-check notes

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
