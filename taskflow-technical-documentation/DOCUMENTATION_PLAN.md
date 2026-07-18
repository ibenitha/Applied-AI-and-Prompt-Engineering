# TaskFlow Documentation Plan

This plan describes what will be produced, for whom, and how AI will be used
to produce it — including how outputs will be fact-checked against
[PROJECT_SPECIFICATION.md](PROJECT_SPECIFICATION.md), which is the single
source of truth for every technical detail in this repository.

## 1. The three required documentation sections

| # | Document | Audience | Purpose |
| --- | --- | --- | --- |
| 1 | [docs/getting-started.md](docs/getting-started.md) | End users (non-technical) | Explain, in plain English, how to register, log in, and manage tasks through the app. No API jargon, no status codes. |
| 2 | [docs/api-reference.md](docs/api-reference.md) | Developers integrating with the TaskFlow API | Precise, complete reference: every endpoint's method, path, auth requirement, request body, success response, and error responses. |
| 3 | [docs/troubleshooting.md](docs/troubleshooting.md) | QA testers and support staff (and end users who hit an error) | Common errors, why they happen, and how to resolve them, phrased for someone who isn't reading raw HTTP specs. |

All three documents will share a consistent structure and tone:

- H2 (`##`) for main sections, H3 (`###`) for subsections.
- Plain, direct sentences; minimal jargon in the getting-started guide;
  precise technical terms permitted (and necessary) in the API reference.
- Every code sample must be valid JSON and must match the field names, types,
  and examples in the specification exactly.

## 2. Planned AI-assisted workflow

Work proceeds in four stages per document, mirroring the lab's phases:

1. **First pass (generic draft).** Prompt an AI assistant with a simple,
   under-specified request (e.g., "write a getting started guide for a task
   app") to produce a generic baseline. This draft is expected to contain
   invented or mismatched details.
2. **Review against the specification.** Manually compare the draft to
   `PROJECT_SPECIFICATION.md` line by line. Note every invented feature,
   missing field, wrong status code, wrong endpoint path, or off-tone
   passage.
3. **Refine with grounded context.** Re-prompt the AI, this time pasting in
   the exact relevant section(s) of `PROJECT_SPECIFICATION.md` and naming the
   specific corrections needed. Repeat until the draft matches the spec with
   no contradictions.
4. **Chain for consistency.** Once all three documents pass fact-checking
   individually, run a final "standardize tone and formatting" pass that
   takes all three documents together and normalizes heading levels,
   terminology (e.g., always "task", never "to-do item" or "ticket"), and
   voice, without altering technical content.

Every prompt used in every stage, for every document, will be logged in
[PROMPT_HISTORY.md](PROMPT_HISTORY.md) in the order it was actually run —
including first-pass prompts that produced imperfect output. Nothing is
logged retroactively or out of order.

## 3. How fact-checking will be performed

Fact-checking is manual and spec-driven, not AI-driven:

- Every field name, type, and default mentioned in a draft is checked against
  Section 4 (task data model) of the specification.
- Every endpoint's method, path, request body, and response shown in a draft
  is checked against Section 6 (API endpoints) of the specification.
- Every error code and cause mentioned in a draft is checked against
  Section 9 (common errors) of the specification.
- Any feature, field, or behaviour that appears in a draft but not in the
  specification is treated as a fabrication and is either removed or, if it
  seems like a reasonable idea, explicitly rejected and noted in
  `PROMPT_HISTORY.md` as "considered but out of scope" — it is not silently
  added to the spec after the fact.
- The specification itself is treated as frozen once Phase 1 review is
  complete (see the root instructions: "Do not invent features after the
  specification has been finalized").

## 4. How iterative prompting and chaining will be demonstrated

`PROMPT_HISTORY.md` will show, for each of the three documents:

- The initial, deliberately generic first-pass prompt.
- The AI's first-pass output (or a summary of what was wrong with it).
- One or more refinement prompts that supply concrete spec excerpts and name
  specific corrections.
- A final chaining prompt (shared across all three documents) that
  standardizes tone, heading structure, and terminology across the whole set.

This gives a visible, honest before/after trail: generic → fact-checked →
stylistically consistent, matching the rubric's requirement that "prompt
history shows progressive refinement and fact-checking."

## 5. Assembly

Once all three documents are individually fact-checked and the chaining pass
is complete, they will be assembled into the final submission (per the lab's
"Final deliverables" section) alongside the prompt history and the
reflection. Assembly happens last, after every section is verified — not
before.
