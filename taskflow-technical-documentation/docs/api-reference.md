# TaskFlow API Reference

> **Status:** Fact-checked and refined (Stage 2 complete), and reviewed for
> cross-document consistency (Stage 4). See
> [../PROMPT_HISTORY.md](../PROMPT_HISTORY.md) for the prompts used to
> produce and refine this reference.

This reference documents every endpoint exposed by the TaskFlow API, for
developers integrating with it or building clients against it.

## Overview

**Base URL:** `https://api.taskflow.example.com/v1`

All request and response bodies are JSON. Any request that includes a body
must send `Content-Type: application/json`.

| Method | Path | Auth required | Purpose |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | No | Register a new user |
| `POST` | `/auth/login` | No | Log in and obtain a bearer token |
| `POST` | `/tasks` | Yes | Create a task |
| `GET` | `/tasks` | Yes | View all of the authenticated user's tasks |
| `GET` | `/tasks/{id}` | Yes | View a single task |
| `PATCH` | `/tasks/{id}` | Yes | Update a task (title, description, and/or status) |
| `DELETE` | `/tasks/{id}` | Yes | Delete a task |

## Authentication

TaskFlow uses email + password registration and login, followed by
bearer-token authentication for every subsequent request.

- Register (`POST /auth/register`), then log in (`POST /auth/login`) to
  receive a token. Registering does not log you in automatically — a
  separate login call is required to obtain a token.
- Send the token on every task-related request using the `Authorization`
  header:

  ```
  Authorization: Bearer <token>
  ```

- A request to any task endpoint with a missing or invalid token receives
  `401 Unauthorized`.
- Tokens do not expire. There is no token refresh endpoint and no
  logout/token-revocation endpoint.
- Every task endpoint is scoped to the authenticated user. A user can only
  see, update, or delete their own tasks. Requesting another user's task by
  `id` returns `404 Not Found` rather than any indication that the task
  belongs to someone else.

## Endpoints

### Register a user

`POST /auth/register`

Creates a new user account. Does not log the user in — call **Log in**
afterward to obtain a token.

**Authentication required:** No

**Request body**

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `email` | string | Yes | Must contain `@`; must not already be registered |
| `password` | string | Yes | Minimum 8 characters |

```json
{
  "email": "jane@example.com",
  "password": "correct-horse-battery-staple"
}
```

**Success response — `201 Created`**

```json
{
  "id": "6f1c1c9a-3e2b-4f77-9a2a-2a6b2f6a1c11",
  "email": "jane@example.com",
  "createdAt": "2026-07-01T09:00:00Z"
}
```

**Error responses**

| Status | Condition |
| --- | --- |
| `400 Bad Request` | `email` or `password` missing, or password shorter than 8 characters |
| `409 Conflict` | `email` is already registered to another account |

---

### Log in

`POST /auth/login`

Authenticates an existing user and returns a bearer token to use on all
subsequent requests.

**Authentication required:** No

**Request body**

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `email` | string | Yes | Must contain `@`; must match a registered account |
| `password` | string | Yes | Must match the account's password |

```json
{
  "email": "jane@example.com",
  "password": "correct-horse-battery-staple"
}
```

**Success response — `200 OK`**

```json
{
  "token": "tkn_9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c"
}
```

**Error responses**

| Status | Condition |
| --- | --- |
| `400 Bad Request` | `email` or `password` missing, or `email` does not contain `@` |
| `401 Unauthorized` | No account matches the email, or the password is incorrect |

---

### Create a task

`POST /tasks`

Creates a new task belonging to the authenticated user.

**Authentication required:** Yes

**Request body**

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes | 1–200 characters; cannot be blank or whitespace-only |
| `description` | string | No | Up to 2,000 characters |

`status` cannot be set on creation — every new task starts as `"pending"`.

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

**Success response — `201 Created`**

```json
{
  "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2026-07-18T10:15:00Z",
  "updatedAt": "2026-07-18T10:15:00Z"
}
```

**Error responses**

| Status | Condition |
| --- | --- |
| `400 Bad Request` | `title` is missing or empty |
| `401 Unauthorized` | Missing or invalid token |

---

### View all tasks

`GET /tasks`

Returns every task belonging to the authenticated user.

**Authentication required:** Yes

**Success response — `200 OK`**

```json
{
  "tasks": [
    {
      "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "pending",
      "createdAt": "2026-07-18T10:15:00Z",
      "updatedAt": "2026-07-18T10:15:00Z"
    }
  ]
}
```

If the user has no tasks, `tasks` is an empty array — this is not an error.

**Error responses**

| Status | Condition |
| --- | --- |
| `401 Unauthorized` | Missing or invalid token |

---

### View a single task

`GET /tasks/{id}`

Returns a single task belonging to the authenticated user.

**Authentication required:** Yes

**Success response — `200 OK`**

```json
{
  "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending",
  "createdAt": "2026-07-18T10:15:00Z",
  "updatedAt": "2026-07-18T10:15:00Z"
}
```

**Error responses**

| Status | Condition |
| --- | --- |
| `401 Unauthorized` | Missing or invalid token |
| `404 Not Found` | Task does not exist, or belongs to another user |

---

### Update a task

`PATCH /tasks/{id}`

Updates one or more fields on an existing task belonging to the
authenticated user. **This is also how a task is marked as completed or
pending again** — `status` is just one of the fields this endpoint can
update, alongside `title` and `description`. There is no separate
mark-complete endpoint.

**Authentication required:** Yes

**Request body** — all fields optional, but at least one must be present:

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | 1–200 characters; cannot be blank or whitespace-only |
| `description` | string | Up to 2,000 characters |
| `status` | string | Must be exactly `"pending"` or `"completed"` (case-sensitive) |

```json
{
  "title": "Buy groceries and cook dinner",
  "status": "completed"
}
```

**Success response — `200 OK`**

```json
{
  "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
  "title": "Buy groceries and cook dinner",
  "description": "Milk, eggs, bread",
  "status": "completed",
  "createdAt": "2026-07-18T10:15:00Z",
  "updatedAt": "2026-07-18T11:42:00Z"
}
```

`updatedAt` reflects the time of this update; `createdAt` never changes.

**Error responses**

| Status | Condition |
| --- | --- |
| `400 Bad Request` | Empty request body, empty `title`, or an invalid `status` value |
| `401 Unauthorized` | Missing or invalid token |
| `404 Not Found` | Task does not exist, or belongs to another user |

---

### Delete a task

`DELETE /tasks/{id}`

Deletes a task belonging to the authenticated user.

**Authentication required:** Yes

**Success response — `204 No Content`**

No response body.

**Error responses**

| Status | Condition |
| --- | --- |
| `401 Unauthorized` | Missing or invalid token |
| `404 Not Found` | Task does not exist, or belongs to another user |

## Notes on scope

This reference covers only the endpoints defined in
`PROJECT_SPECIFICATION.md` Section 6. There is no bulk create/update/delete,
no search, filtering, sorting, or pagination on `GET /tasks`, and no
endpoints for features listed as unsupported in Section 8 (e.g., due dates,
priorities, notifications, file uploads, password reset, social login,
token refresh, or logout).
