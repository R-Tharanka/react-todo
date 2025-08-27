# Backend Filter and Sort Features Update

This document describes the updates made to support filtering and sorting features in the React Todo App backend.

## Task Model Updates

The Task model has been updated to include new fields for filtering and sorting:

- `dueDate`: A Date field to store when the task is due
- `priority`: A Number field (0-3) to represent task priority levels:
  - 0: No priority (default)
  - 1: Low priority
  - 2: Medium priority
  - 3: High priority

## API Endpoint Updates

### GET /api/tasks

The main task listing endpoint has been enhanced to support filtering and sorting via query parameters:

#### Filtering

Use the `filter` query parameter with these values:

- `all`: Returns all tasks (default behavior)
- `completed`: Returns only completed tasks
- `today`: Returns tasks due today
- `upcoming`: Returns tasks due in the future (after today) and not completed
- `overdue`: Returns tasks that are past their due date and not completed

Example: `GET /api/tasks?filter=today`

#### Sorting

Use the `sort` query parameter with these values:

- `newest`: Sort by creation date, newest first (default behavior)
- `oldest`: Sort by creation date, oldest first
- `priority`: Sort by priority, highest to lowest
- `az`: Sort alphabetically by task text

Example: `GET /api/tasks?sort=priority`

You can combine both parameters:
`GET /api/tasks?filter=upcoming&sort=priority`

### POST /api/tasks

The task creation endpoint now accepts the following additional fields:

- `dueDate`: Date when the task is due (optional)
- `priority`: Priority level 0-3 (optional, defaults to 0)

### PUT /api/tasks/:id

The task update endpoint now accepts updates to:

- `text`: Task text
- `completed`: Task completion status
- `dueDate`: Due date for the task
- `priority`: Priority level of the task

## Frontend Integration

The frontend has been updated to:
1. Send appropriate filter and sort parameters when fetching tasks
2. Refetch tasks when the filter or sort options change
3. Include the new fields when creating or updating tasks
