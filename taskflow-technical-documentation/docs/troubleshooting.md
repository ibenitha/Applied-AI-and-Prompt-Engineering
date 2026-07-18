# TaskFlow Troubleshooting Guide

> **Status:** First-pass draft (Stage 3). Not yet fact-checked or refined.
> See [../PROMPT_HISTORY.md](../PROMPT_HISTORY.md) for the prompt that
> produced this draft and the review notes for what still needs work.

This guide covers problems that end users and developers may actually run
into while using TaskFlow — registering, logging in, and managing tasks.
Each topic lists the likely cause, how to resolve it, and the relevant API
status code for developers debugging integration issues.

## Quick Reference

| Status code | Generally means |
| --- | --- |
| `400 Bad Request` | Something in your request is missing or invalid |
| `401 Unauthorized` | Your credentials or token weren't accepted |
| `404 Not Found` | The task doesn't exist, or isn't yours |
| `409 Conflict` | That email is already registered |

## Registration and Login Problems

### Can't Register — "Bad Request"

**Problem:** Registration fails immediately, before an account is created.

**Likely cause:** One of the following:

- `email` or `password` is missing
- `email` doesn't contain an `@`
- `password` is shorter than 8 characters

**Resolution:** Check that both fields are present, the email includes an
`@`, and the password is at least 8 characters long, then try again.

**Status code:** `400 Bad Request`

**See also:** [Creating Your Account](getting-started.md#creating-your-account) ·
[Register a user](api-reference.md#register-a-user)

### Email Already Registered

**Problem:** Registration fails specifically because of the email address.

**Likely cause:** An account with that email already exists.

**Resolution:** Log in instead of registering again, or register with a
different email address.

**Status code:** `409 Conflict`

**See also:** [Creating Your Account](getting-started.md#creating-your-account) ·
[Register a user](api-reference.md#register-a-user)

### Invalid Email Format

**Problem:** Registering or logging in fails because of the email address
itself, not because it's missing.

**Likely cause:** The email address doesn't contain an `@`.

**Resolution:** Enter a valid email address that includes an `@`.

**Status code:** `400 Bad Request` (applies to both registration and login)

**See also:** [Creating Your Account](getting-started.md#creating-your-account),
[Logging In](getting-started.md#logging-in) ·
[Register a user](api-reference.md#register-a-user),
[Log in](api-reference.md#log-in)

### Can't Log In — "Bad Request"

**Problem:** Login fails immediately, before your credentials are checked.

**Likely cause:** `email` or `password` is missing from the request.

**Resolution:** Make sure both fields are filled in and try again.

**Status code:** `400 Bad Request`

**See also:** [Logging In](getting-started.md#logging-in) ·
[Log in](api-reference.md#log-in)

### Incorrect Email or Password

**Problem:** Login fails even though you filled in both fields.

**Likely cause:** Either no account matches that email, or the password is
wrong. TaskFlow returns the same error either way.

**Resolution:** Double-check both fields for typos. If you don't have an
account yet, register first.

**Status code:** `401 Unauthorized`

**See also:** [Logging In](getting-started.md#logging-in) ·
[Log in](api-reference.md#log-in)

## Task Problems

### Missing or Invalid Token

**Problem:** A request to create, view, update, or delete a task is
rejected before it does anything.

**Likely cause:** The `Authorization` header is missing, malformed, or
doesn't contain a valid token.

**Resolution:** Include the header in the exact form
`Authorization: Bearer <token>`. If you're not sure your token is valid,
log in again to get one.

**Status code:** `401 Unauthorized`

**See also:** [Authentication](api-reference.md#authentication)

### Task Not Found

**Problem:** Viewing, updating, or deleting a specific task returns "not
found," even though you're sure you have tasks.

**Likely cause:** One of the following:

- The task `id` is incorrect (typo or copy-paste error)
- The task has already been deleted
- The task belongs to a different account — TaskFlow returns the same
  "not found" response rather than revealing that the task exists but
  isn't yours

**Resolution:** Double-check the task ID, and confirm you're looking at a
task from your own account's task list.

**Status code:** `404 Not Found`

**See also:** [Viewing a Single Task](getting-started.md#viewing-a-single-task) ·
[View a single task](api-reference.md#view-a-single-task),
[Update a task](api-reference.md#update-a-task),
[Delete a task](api-reference.md#delete-a-task)

### Can't Create a Task

**Problem:** Creating a task fails.

**Likely cause:** The `title` field is missing, empty, or made up of only
spaces.

**Resolution:** Provide a title between 1 and 200 characters that isn't
blank. `description` is optional, but if included, must be 2,000
characters or fewer.

**Status code:** `400 Bad Request`

**See also:** [Creating a Task](getting-started.md#creating-a-task) ·
[Create a task](api-reference.md#create-a-task)

### Can't Update a Task

**Problem:** Updating a task — including marking it pending or completed —
fails.

**Likely cause:** One of the following:

- The request doesn't include any fields to update
- `title` is included but is empty or blank
- `status` is set to something other than exactly `"pending"` or
  `"completed"`

**Resolution:** Include at least one field to update. If updating the
title, keep it within 1–200 characters and non-blank. If updating the
status, use exactly `"pending"` or `"completed"` (lowercase).

**Status code:** `400 Bad Request`

**See also:** [Updating a Task](getting-started.md#updating-a-task),
[Marking a Task as Pending or Completed](getting-started.md#marking-a-task-as-pending-or-completed) ·
[Update a task](api-reference.md#update-a-task)
