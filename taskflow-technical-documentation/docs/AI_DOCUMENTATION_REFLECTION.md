# AI-Assisted Documentation Reflection

## Overview

The objective of this project was to produce a complete, accurate
documentation set for TaskFlow — a fictional task management web
application — covering three audiences: end users, developers integrating
with the API, and QA/support staff troubleshooting issues. The exercise was
designed to demonstrate AI-assisted technical writing: using AI to generate
and refine documentation while a human reviewer verifies every technical
claim against a single source of truth.

`PROJECT_SPECIFICATION.md` was written and frozen before any documentation
was drafted, and explicitly marked as the authoritative definition of what
TaskFlow is, does, and does not do. Freezing it first served a specific
purpose: without a fixed specification, there is no independent standard
against which to fact-check AI-generated content, and "fact-checking"
degrades into checking a document against itself. By fixing the
specification first and treating it as immutable for the rest of the
project, every later document had a stable target to be verified against,
and any drift between a draft and the specification was, by definition, a
documentation bug to fix rather than a judgment call to negotiate.

A structured, staged workflow was adopted — rather than generating all
three documents in one pass — so that drafting, review, and refinement
could be tracked and verified independently for each document. This made
it possible to catch and correct issues (invented behaviour, ambiguous
wording, inconsistent terminology) at a granular level, and to keep a
complete, honest record of that process rather than presenting only a
polished end result.

---

## Documentation Workflow

The project followed this sequence:

```
Specification
   ↓
Getting Started Guide (first pass → review → refinement)
   ↓
API Reference (first pass → review → refinement)
   ↓
Troubleshooting Guide (first pass → review → refinement)
   ↓
Cross-document consistency review
   ↓
Final documentation set
```

**Specification first.** `PROJECT_SPECIFICATION.md` defined the product
scope, data model, endpoints, validation rules, and — critically — an
explicit list of features that are *not* supported. This last part
mattered as much as what was included: it gave every later stage a
concrete boundary against invented scope creep (e.g., due dates, password
reset, task priorities), rather than leaving "what's out of scope" to be
inferred inconsistently by each document.

**Getting Started Guide.** Written first among the three documents because
it is the simplest surface of the product — no HTTP semantics, only
user-facing behaviour — making it a reasonable place to establish the
project's fact-checking discipline before moving to more technically dense
material.

**API Reference.** Written second, once the plain-language behaviour was
established, to translate the same underlying rules into precise
technical detail: methods, paths, status codes, and request/response
shapes for every endpoint.

**Troubleshooting Guide.** Written last of the three content documents,
because it depends on both — every "problem" it describes is a failure
mode of behaviour already defined in the Getting Started guide and the API
Reference, so it could only be written accurately once those were fact-
checked.

**Cross-document consistency review.** A dedicated pass, after all three
documents were individually correct, to check them as a set: consistent
terminology, matching cross-references, and identical treatment of shared
concepts (such as how a task's status is changed). This stage existed
because per-document fact-checking verifies accuracy against the
specification, but does not by itself guarantee that three independently
written documents describe the same thing the same way.

Each stage — first pass, review, refinement — existed to separate three
distinct concerns: generating a reasonable draft, identifying what's wrong
with it, and fixing what's wrong. Collapsing these into a single step
would have made it harder to see (and later demonstrate) what the AI
produced unprompted versus what was corrected through review.

---

## Role of AI

AI was used throughout the project to:

- **Generate initial drafts.** Each document's first pass was produced from
  a prompt describing the audience, required content, and constraints
  (e.g., "no API jargon" for the Getting Started guide; "document every
  endpoint, no more, no less" for the API Reference).
- **Improve readability.** Refinement prompts asked for numbered steps for
  procedures, consistent heading levels, and reduced repetition, turning
  technically accurate but unevenly formatted drafts into consistently
  structured documents.
- **Maintain consistency.** The Stage 4 consistency pass used AI to compare
  terminology, phrasing order, and cross-reference formatting across all
  three documents at once and reconcile differences.
- **Identify ambiguities.** At each review stage, the draft was compared
  against the specification looking specifically for assumptions, gaps,
  and internal tensions — not just outright errors — and these were
  written down as review notes rather than silently resolved one way.
- **Assist with review.** The same fact-checking discipline (checking every
  claim against a specific section of the specification) was applied
  during both drafting and review, rather than treating AI-authored review
  as inherently more trustworthy than AI-authored content.

At no point was AI-generated content accepted purely on the basis of
sounding plausible. Every technical claim — every field, status code,
validation rule, and authentication behaviour — was checked against
`PROJECT_SPECIFICATION.md` before being treated as correct, and every
review pass produced a written record of what was checked and what was
found, in `PROMPT_HISTORY.md`.

---

## Human Review and Verification

`PROJECT_SPECIFICATION.md` remained the single authoritative source for
the entire project. No document was allowed to introduce a feature, field,
endpoint, or behaviour not present in it, and the specification itself was
never edited to accommodate something a draft happened to describe.

Every document underwent a **line-by-line fact-check** against the
specification before being considered complete: the Getting Started guide
against Sections 3–8 (authentication, data model, operations, validation),
the API Reference against Section 6 (endpoints) in particular, and the
Troubleshooting Guide against Sections 3, 6, 7, and 9 (authentication,
endpoints, validation, and common errors).

Unsupported features — email notifications, file uploads, team
collaboration, calendar integration, social login, task priorities, due
dates, password reset, bulk operations, search/filtering/sorting/
pagination, tags, token refresh/logout, and multi-factor authentication —
were intentionally excluded from every document, per Section 8 of the
specification, rather than included and merely caveated.

Assumptions were documented rather than hidden. Where the specification
was silent (for example, whether a deleted task can be recovered, or what
order the task list is returned in), the documentation deliberately made
no claim either way, and that choice — along with the reasoning for it —
was recorded in `PROMPT_HISTORY.md` rather than being left for a reader to
notice on their own.

Ambiguities were recorded instead of silently resolved. Two clear examples:
whether the email-format validation rule applies to login as well as
registration (the specification's wording covers both operations without
scoping the rule to one), and the token-expiry inconsistency described
below. In both cases, a decision was made, the reasoning was written down,
and the decision was clearly distinguished from a directly-stated
specification fact.

---

## Prompt Engineering Strategy

The prompting approach evolved deliberately over the course of the
project, structured around a few consistent principles rather than one
prompt per document:

- **Separating generation from refinement.** Every document's first-pass
  prompt was kept distinct from its refinement prompt, run as two separate
  steps rather than iterating silently within a single request. This made
  it possible to compare "what the AI produced first" against "what
  changed after review," rather than only ever seeing a final result.
- **Requiring review notes.** Refinement prompts explicitly required a
  Review Notes section — assumptions, possible inaccuracies, missing
  information, and open questions — before any fix was applied, so that
  issues were named before they were resolved.
- **Requiring `PROMPT_HISTORY.md` updates.** Every stage's prompt required
  logging the purpose, the exact prompt text, a summary of the output, and
  (for refinement stages) the issues found and resolved. This turned the
  prompt history into a real audit trail rather than a curated summary
  written after the fact.
- **Requiring Git verification before commits.** Every commit was preceded
  by an explicit comparison of the changed document against
  `PROJECT_SPECIFICATION.md`, plus `git diff --check`, `git diff --stat`,
  and `git status`, so that what was about to be committed was verified
  both for technical accuracy and for scope (no unintended files staged).
- **Committing meaningful documentation milestones.** Each commit
  corresponds to one identifiable unit of work — a first pass, a
  refinement, or a consistency pass — rather than batching multiple stages
  into a single commit, so the Git history itself shows the progression
  from generic draft to fact-checked, refined, cross-consistent
  documentation.

---

## Benefits of the Workflow

- **Improved traceability.** Every claim in the final documentation can be
  traced back to a specific stage, prompt, and review note in
  `PROMPT_HISTORY.md`, rather than existing as an unexplained final
  artifact.
- **Clearer Git history.** Each commit represents one well-defined step
  (draft, fact-check, or consistency pass), making it possible to see
  exactly when and why any given piece of documentation changed.
- **Reduced hallucination risk.** Requiring every draft to be checked
  against a frozen specification, section by section, caught invented
  details (assumed UI elements, unstated error formats, mismatched
  endpoint names) before they reached the final documents.
- **Better specification compliance.** Explicitly excluding unsupported
  features at every stage, rather than only at the end, meant scope creep
  was caught early and repeatedly, not just once at final review.
- **Easier review.** Because each document went through the same
  first-pass → review → refinement pattern, reviewing any one stage meant
  looking at a small, well-scoped diff rather than an entire document at
  once.
- **Incremental quality improvement.** Readability, terminology, and
  structure improved in distinct, visible steps (accuracy first, then
  clarity, then cross-document consistency) rather than all at once,
  making it possible to confirm each concern was actually addressed.

---

## Challenges Encountered

- **Interpreting ambiguous specification wording.** The validation rule
  for `email` ("Required for register/login; must contain `@`; must be
  unique at registration") does not explicitly state whether the `@`
  format check applies to login as well as registration. The resolution —
  applying it to both, since only the uniqueness rule was explicitly
  scoped to registration — required reasoning about the specification's
  own internal pattern, not just reading a single sentence in isolation.
- **Deciding how to document unspecified behaviour.** The specification is
  silent on whether a deleted task can be recovered and on what order the
  task list is returned in. Rather than guessing, the documentation was
  written to make no claim in either direction — a deliberate choice that
  had to be made consciously in each case, rather than defaulting to
  either silence or invention.
- **Avoiding inventing UI details.** Because the specification only
  describes API-level behaviour and defines no user interface, the Getting
  Started guide had to describe user actions ("go to the registration
  page," "open the task you want to change") without inventing specific
  button labels, screen names, or navigation structure — a constraint that
  had to be actively maintained through both drafting and review.
- **Ensuring consistency across multiple documents.** Terminology and
  phrasing drifted slightly between documents written independently — for
  example, the order of "completed or pending" in headings, and "lowercase"
  versus "case-sensitive" when describing status values. These were only
  caught by a dedicated cross-document review, not by fact-checking each
  document in isolation.
- **The token-expiry inconsistency.** The specification states in two
  places (Sections 3.2 and 8) that tokens do not expire, yet its own
  common-errors reference (Section 9) lists "expired/invalid token" as a
  typical `401` cause. Rather than silently picking a side or editing the
  frozen specification to resolve the contradiction, this was treated as
  exactly the kind of ambiguity the process was designed to surface: the
  decision (favor the two explicit, affirmative statements) and the
  reasoning behind it were written into `PROMPT_HISTORY.md`, and the
  Troubleshooting Guide was worded to proactively clarify the behaviour
  for readers rather than leave the contradiction implicit.

---

## Lessons Learned

Iterative prompting proved most valuable exactly where a single-shot
prompt would have failed silently: a first-pass draft can be technically
plausible and still wrong in ways that only become visible once checked
against a fixed reference. Separating "generate" from "review" from
"refine" turned that checking into a repeatable, visible step rather than
an implicit judgment call.

Human verification against a stable reference document was the load-
bearing part of the process. AI accelerated drafting and reformatting
considerably, but every claim about what the product does still had to be
checked, and several of the more interesting issues in this project
(the email-format scope, the token-expiry tension) were not "the AI got it
wrong" so much as "the specification itself required careful reading" —
exactly the kind of thing automated generation alone would not have
surfaced.

Freezing the specification before writing any documentation was a
precondition for all of the above. Without it, "fact-checking" would have
had no fixed target, and inconsistencies between documents could have been
"resolved" by simply picking whichever version was written most recently,
rather than by checking against a single source of truth.

Finally, documenting assumptions and ambiguities — rather than quietly
picking an answer — turned out to be as valuable as getting the technical
details right. A reader (or reviewer) of `PROMPT_HISTORY.md` can see not
just what the documentation says, but why it says that, and which parts
were inferred rather than stated outright.

---

## Conclusion

The TaskFlow documentation set — the Getting Started guide, API Reference,
and Troubleshooting Guide — was generated with AI assistance at every
stage, from initial drafting through readability improvements and
cross-document consistency work. At no point, however, was AI output
treated as authoritative on its own: every technical claim was verified
through structured human review against `PROJECT_SPECIFICATION.md`, the
project's single frozen source of truth, and every assumption, ambiguity,
or judgment call made along the way was recorded rather than hidden. The
result is a documentation set that is not only accurate to the
specification but whose accuracy can be independently checked, stage by
stage, in `PROMPT_HISTORY.md`.
