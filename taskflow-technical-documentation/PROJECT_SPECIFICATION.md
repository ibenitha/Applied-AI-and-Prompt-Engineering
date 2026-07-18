# TaskFlow — Project Specification

**Status:** Final — single source of truth for all documentation in this repository.
**Version:** 1.0.0
**Last updated:** 2026-07-18

> This document defines what TaskFlow *is*, exactly. Every other document in this
> repository (getting-started guide, API reference, troubleshooting guide) must be
> consistent with what is written here. If a later document appears to describe a
> feature, field, endpoint, or behaviour that contradicts this file, this file wins
> and the other document must be corrected.

---

## 1. What is TaskFlow?

TaskFlow is a simple, web-based task management application. It lets an
individual user create an account, log in, and manage a personal list of
tasks — creating, viewing, updating, completing, and deleting them.

TaskFlow is intentionally small in scope. It is a single-user-per-account
to-do list system, not a project management or team collaboration tool.

## 2. Target users

TaskFlow's documentation serves three distinct audiences:

| Audience | Who they are | What they need |
| --- | --- | --- |
| End users | People who want to track personal tasks/to-dos | A plain-language guide to registering, logging in, and managing tasks in the UI |
| Developers (integrators) | Engineers building clients against the TaskFlow API | Precise endpoint definitions: methods, paths, auth, request/response bodies, error codes |
| QA testers / support | People verifying behaviour or helping users who are stuck | Common errors, their causes, and how to resolve them |

## 3. Authentication behaviour

TaskFlow uses **email + password registration and login**, followed by
**bearer-token authentication** for all subsequent requests.

### 3.1 Registration

- A new user signs up with an email address and a password.
- Email addresses must be unique across all accounts.
- Passwords are never returned in any API response, and are stored hashed
  server-side (implementation detail, not covered further — out of scope for
  this documentation set).
- Registration does **not** automatically log the user in. The user must
  subsequently log in to obtain a token.

### 3.2 Login

- A user logs in with their registered email and password.
- On success, the API returns a **bearer token** (an opaque string).
- Tokens do not expire within the scope of this specification (no refresh
  flow, no logout/token-revocation endpoint is defined).

### 3.3 Authenticated requests

- Every task-related endpoint requires the token to be sent as:
  `Authorization: Bearer <token>`
- Requests without a valid token receive `401 Unauthorized`.
- A user can only ever see, modify, or delete **their own** tasks. Attempting
  to access another user's task by ID returns `404 Not Found` (TaskFlow does
  not reveal whether a task ID belongs to someone else).

## 4. Task data model

Every task has exactly these fields:

| Field | Type | Description | Set by |
| --- | --- | --- | --- |
| `id` | string (UUID) | Unique identifier for the task | Server, on creation |
| `title` | string | Short summary of the task (required) | User |
| `description` | string | Longer free-text detail (optional) | User |
| `status` | string enum: `"pending"` \| `"completed"` | Current state of the task | User (defaults to `"pending"`) |
| `createdAt` | string (ISO 8601 datetime) | When the task was created | Server, on creation |
| `updatedAt` | string (ISO 8601 datetime) | When the task was last modified | Server, on every update |

No other fields exist on a task. In particular, there is no `priority`,
`dueDate`, `assignee`, `tags`, or `attachments` field (see Section 8).

## 5. Supported task operations

1. Create a task
2. View all tasks belonging to the authenticated user
3. View a single task by ID
4. Update a task (title, description, and/or status)
5. Delete a task
6. Mark a task as completed or pending (this is done via the same update
   operation, by setting `status`)

There is no bulk operations (bulk delete, bulk status change), no sorting or
filtering parameters, and no pagination — the full task list is returned in a
single response. This is a deliberate scope limit, not an oversight.

## 6. API endpoints

Base URL used throughout the documentation: `https://api.taskflow.example.com/v1`

All request and response bodies are JSON. All requests that include a body
must send `Content-Type: application/json`.

### 6.1 Register a user

| | |
| --- | --- |
| Method | `POST` |
| Path | `/auth/register` |
| Auth required | No |

**Request body**

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
| `400 Bad Request` | Missing `email` or `password`, or password too short (see Section 9) |
| `409 Conflict` | Email is already registered |

### 6.2 Log in

| | |
| --- | --- |
| Method | `POST` |
| Path | `/auth/login` |
| Auth required | No |

**Request body**

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
| `400 Bad Request` | Missing `email` or `password` |
| `401 Unauthorized` | Email not found, or password does not match |

### 6.3 Create a task

| | |
| --- | --- |
| Method | `POST` |
| Path | `/tasks` |
| Auth required | Yes |

**Request body**

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

`description` is optional. `status` cannot be set on creation — new tasks
always start as `"pending"`.

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
| `400 Bad Request` | Missing or empty `title` |
| `401 Unauthorized` | Missing or invalid token |

### 6.4 View all tasks

| | |
| --- | --- |
| Method | `GET` |
| Path | `/tasks` |
| Auth required | Yes |

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

Returns an empty `tasks` array (not an error) if the user has no tasks.

**Error responses**

| Status | Condition |
| --- | --- |
| `401 Unauthorized` | Missing or invalid token |

### 6.5 View a single task

| | |
| --- | --- |
| Method | `GET` |
| Path | `/tasks/{id}` |
| Auth required | Yes |

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

### 6.6 Update a task

| | |
| --- | --- |
| Method | `PATCH` |
| Path | `/tasks/{id}` |
| Auth required | Yes |

**Request body** (all fields optional, at least one must be present)

```json
{
  "title": "Buy groceries and cook dinner",
  "status": "completed"
}
```

Valid `status` values: `"pending"`, `"completed"`. This same endpoint is how a
task is marked completed or pending again — there is no separate
"complete task" endpoint.

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

**Error responses**

| Status | Condition |
| --- | --- |
| `400 Bad Request` | Empty request body, empty `title`, or invalid `status` value |
| `401 Unauthorized` | Missing or invalid token |
| `404 Not Found` | Task does not exist, or belongs to another user |

### 6.7 Delete a task

| | |
| --- | --- |
| Method | `DELETE` |
| Path | `/tasks/{id}` |
| Auth required | Yes |

**Success response — `204 No Content`** (empty body)

**Error responses**

| Status | Condition |
| --- | --- |
| `401 Unauthorized` | Missing or invalid token |
| `404 Not Found` | Task does not exist, or belongs to another user |

## 7. Validation rules

| Field | Rule |
| --- | --- |
| `email` | Required for register/login; must contain `@`; must be unique at registration |
| `password` | Required for register/login; minimum 8 characters |
| `title` | Required to create a task; 1–200 characters; cannot be blank/whitespace-only |
| `description` | Optional; up to 2,000 characters |
| `status` | Must be exactly `"pending"` or `"completed"` (case-sensitive); cannot be set on creation |

## 8. Features explicitly NOT supported

To keep this documentation project accurate and to prevent scope creep, the
following are **not** part of TaskFlow and must **not** appear in any
documentation:

- Email notifications or reminders
- File uploads or attachments on tasks
- Team collaboration, shared tasks, or task assignment to other users
- Calendar integration or calendar views
- Social login (Google/GitHub/etc.) — email + password only
- Task priorities (e.g., low/medium/high)
- Due dates or deadlines on tasks
- Password reset / "forgot password" flow
- Bulk task operations
- Task search, filtering, sorting, or pagination
- Subtasks, tags, labels, or categories
- Token expiry, refresh tokens, or a logout endpoint
- Multi-factor authentication
- Any public/anonymous access to tasks — all task endpoints always require auth

## 9. Common errors (reference for troubleshooting)

| Status | Meaning | Typical cause |
| --- | --- | --- |
| `400 Bad Request` | The request body failed validation | Missing `title`, missing `email`/`password`, invalid `status` value, password under 8 characters |
| `401 Unauthorized` | Authentication failed or missing | No `Authorization` header, malformed header, expired/invalid token, wrong login credentials |
| `404 Not Found` | Resource does not exist for this user | Wrong task `id`, task belongs to another user, task already deleted |
| `409 Conflict` | Registration email already in use | User tries to register with an email that already has an account |

## 10. Out of scope for this documentation set

The following exist in a real product but are intentionally not documented
here because they are implementation details, not user- or integrator-facing
behaviour: database schema/storage engine, password hashing algorithm,
infrastructure/deployment, rate limiting, and monitoring/logging.
