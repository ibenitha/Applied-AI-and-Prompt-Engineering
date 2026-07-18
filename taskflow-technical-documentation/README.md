# TaskFlow AI-Assisted Technical Documentation Lab

This repository is a lab exercise in using AI to generate, structure, and
refine technical documentation for a fictional web application, **TaskFlow**
(a simple task management app).

## Lab objective

Practice the full workflow of AI-assisted technical writing:

1. Define a clear, frozen specification for a fictional product.
2. Use AI to draft documentation for three audiences (end users, developers,
   support/QA) from that specification.
3. Fact-check AI output against the specification rather than trusting it at
   face value.
4. Iteratively refine prompts based on identified gaps and inaccuracies.
5. Chain prompts to standardize tone and formatting across documents.
6. Assemble a final, internally consistent documentation set, with a full
   prompt history and a short process reflection.

See `AI-assisted technical documentation.md` in the parent directory for the
original lab brief, including deliverables and the evaluation rubric.

## Repository structure

| File | Purpose |
| --- | --- |
| [PROJECT_SPECIFICATION.md](PROJECT_SPECIFICATION.md) | The frozen, single source of truth describing what TaskFlow is and does. All documentation must match this. |
| [DOCUMENTATION_PLAN.md](DOCUMENTATION_PLAN.md) | The plan for what will be written, for whom, and how AI will be used, fact-checked, and chained. |
| [PROMPT_HISTORY.md](PROMPT_HISTORY.md) | Chronological log of every prompt used, in the order it was run, including first-pass drafts and refinements. |
| [docs/getting-started.md](docs/getting-started.md) | End-user guide to using TaskFlow. |
| [docs/api-reference.md](docs/api-reference.md) | Developer reference for the TaskFlow API. |
| [docs/troubleshooting.md](docs/troubleshooting.md) | Common errors and how to resolve them. |
| [REFLECTION.md](REFLECTION.md) | Short (≤200 word) reflection on the process, written last. |

## Status

The specification is drafted and pending review. The three documentation
sections are placeholders and have not yet been written. See
`PROMPT_HISTORY.md` for what has actually been done so far.
