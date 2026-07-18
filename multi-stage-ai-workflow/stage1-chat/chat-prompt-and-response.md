# Stage 1 — Chat-Based AI (e.g. ChatGPT / Claude.ai / Gemini Chat)

## Prompt

> Convert the following raw user feedback into a structured JSON feature
> specification with the fields: `feature_name`, `description`, `user_story`,
> `acceptance_criteria` (array of strings), and `priority` (`low` | `medium` | `high`).
> Keep the acceptance criteria specific enough that a developer could write
> tests directly from them.
>
> Feedback:
> "Hey, it would be so helpful if TaskFlow just told me every time I open the
> app how many of my tasks are already overdue. Right now the only way I
> notice is if I scroll through the whole list and check due dates myself,
> which means I usually find out way too late. Maybe just a small badge or
> number near the task list so I can't miss it? Doesn't need to be fancy, I
> just don't want to keep blowing past deadlines without knowing."

## Response

```json
{
  "feature_name": "Overdue Task Reminders",
  "description": "Surface a visible count of overdue tasks to the user as soon as they open TaskFlow, instead of requiring them to scroll through the full task list to notice missed deadlines.",
  "user_story": "As a TaskFlow user, I want to see how many of my tasks are overdue as soon as I open the app, so that I don't miss deadlines I've already passed.",
  "acceptance_criteria": [
    "A task counts as overdue when its due date is earlier than the current date and its status is not 'done'.",
    "The app displays a badge showing the count of overdue tasks near the task list header.",
    "The badge is hidden, or shows 0, when there are no overdue tasks.",
    "The overdue count updates automatically whenever a task's status or due date changes."
  ],
  "priority": "medium"
}
```

This JSON output is saved as [`feature-spec.json`](./feature-spec.json) and becomes
the input to **Stage 2 (CLI)**.
