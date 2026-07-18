# Overdue Task Reminders

**Priority:** medium

## Description

Surface a visible count of overdue tasks to the user as soon as they open TaskFlow, instead of requiring them to scroll through the full task list to notice missed deadlines.

## User Story

As a TaskFlow user, I want to see how many of my tasks are overdue as soon as I open the app, so that I don't miss deadlines I've already passed.

## Acceptance Criteria

- [ ] A task counts as overdue when its due date is earlier than the current date and its status is not 'done'.
- [ ] The app displays a badge showing the count of overdue tasks near the task list header.
- [ ] The badge is hidden, or shows 0, when there are no overdue tasks.
- [ ] The overdue count updates automatically whenever a task's status or due date changes.

---
_Generated automatically by Stage 2 (`generate-stub.js`) from the Stage 1 chat-AI spec._
