# Todo App API Documentation

## Overview

This document provides comprehensive documentation for the Todo App's RESTful API. The API enables client applications to manage tasks through standard HTTP methods, supporting all CRUD operations along with additional filtering, sorting, and batch operations.

## Base URL

All API endpoints are relative to:
```
http://localhost:5000/api
```

## Authentication

All endpoints are secured and require a valid JWT token. Authentication is managed using Bearer token headers.

### Authentication Header

```
Authorization: Bearer <token>
```

Tokens are obtained through the login and register endpoints in the user API.

## Error Handling

All API requests that encounter errors will return a JSON response with appropriate HTTP status codes and an error message:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200 OK`: Request successful
- `201 Created`: Resource successfully created
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Authenticated but insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## Task API Endpoints

### Get All Tasks

Retrieves all tasks for the authenticated user with optional filtering and sorting.

- **URL**: `/tasks`
- **Method**: `GET`
- **Auth Required**: Yes
- **Query Parameters**:
  - `filter` (optional): Filter tasks by status
    - Values: `completed`, `active`, `today`, `upcoming`, `overdue`, `all`
  - `sort` (optional): Sort tasks by criteria
    - Values: `newest`, `oldest`, `dueDate`, `priority`, `az` (alphabetical)
    - Default: `newest`

**Success Response**:
- **Code**: `200 OK`
- **Content Example**:
```json
[
  {
    "_id": "60d5ec9f1c9d440000a1b2c3",
    "text": "Complete project proposal",
    "completed": false,
    "priority": 2,
    "dueDate": "2023-08-30T00:00:00.000Z",
    "category": "Work",
    "user": "60d5e4d61c9d440000a1b2c1",
    "createdAt": "2023-08-26T15:30:23.000Z",
    "updatedAt": "2023-08-26T15:30:23.000Z"
  },
  // Additional tasks...
]
```

**Error Response**:
- **Code**: `500 Internal Server Error`
- **Content**:
```json
{
  "message": "Failed to fetch tasks"
}
```

### Get Single Task

Retrieves a specific task by ID.

- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Parameters**:
  - `id`: Task ID

**Success Response**:
- **Code**: `200 OK`
- **Content Example**:
```json
{
  "_id": "60d5ec9f1c9d440000a1b2c3",
  "text": "Complete project proposal",
  "completed": false,
  "priority": 2,
  "dueDate": "2023-08-30T00:00:00.000Z",
  "category": "Work",
  "user": "60d5e4d61c9d440000a1b2c1",
  "createdAt": "2023-08-26T15:30:23.000Z",
  "updatedAt": "2023-08-26T15:30:23.000Z"
}
```

**Error Response**:
- **Code**: `404 Not Found`
- **Content**:
```json
{
  "message": "Task not found"
}
```

### Create Task

Creates a new task for the authenticated user.

- **URL**: `/tasks`
- **Method**: `POST`
- **Auth Required**: Yes
- **Request Body**:
```json
{
  "text": "Complete project proposal",
  "completed": false,
  "priority": 2,
  "dueDate": "2023-08-30T00:00:00.000Z",
  "category": "Work"
}
```

**Required Fields**:
- `text`: String (1-200 characters)

**Optional Fields**:
- `completed`: Boolean (default: false)
- `priority`: Number (0: none, 1: low, 2: medium, 3: high, default: 0)
- `dueDate`: ISO Date String (default: null)
- `category`: String (default: "")

**Success Response**:
- **Code**: `201 Created`
- **Content**: Created task object

**Error Response**:
- **Code**: `400 Bad Request`
- **Content**:
```json
{
  "message": "Task text is required"
}
```

### Update Task

Updates an existing task.

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Auth Required**: Yes
- **URL Parameters**:
  - `id`: Task ID
- **Request Body**: Any fields to update
```json
{
  "text": "Updated task text",
  "priority": 3,
  "dueDate": "2023-09-05T00:00:00.000Z"
}
```

**Success Response**:
- **Code**: `200 OK`
- **Content**: Updated task object

**Error Response**:
- **Code**: `404 Not Found`
- **Content**:
```json
{
  "message": "Task not found"
}
```

### Toggle Task Completion

Toggles the completion status of a task.

- **URL**: `/tasks/:id/toggle`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **URL Parameters**:
  - `id`: Task ID

**Success Response**:
- **Code**: `200 OK`
- **Content**: Updated task object with toggled `completed` status

**Error Response**:
- **Code**: `404 Not Found`
- **Content**:
```json
{
  "message": "Task not found"
}
```

### Delete Task

Deletes a specific task.

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **URL Parameters**:
  - `id`: Task ID

**Success Response**:
- **Code**: `200 OK`
- **Content**:
```json
{
  "message": "Task deleted successfully"
}
```

**Error Response**:
- **Code**: `404 Not Found`
- **Content**:
```json
{
  "message": "Task not found"
}
```

## User API Endpoints

### Register User

Creates a new user account.

- **URL**: `/users/register`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Required Fields**:
- `name`: String (2-50 characters)
- `email`: String (valid email format)
- `password`: String (min 6 characters)

**Success Response**:
- **Code**: `201 Created`
- **Content**:
```json
{
  "_id": "60d5e4d61c9d440000a1b2c1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response**:
- **Code**: `400 Bad Request`
- **Content**:
```json
{
  "message": "User already exists with this email"
}
```

### Login User

Authenticates a user and returns a JWT token.

- **URL**: `/users/login`
- **Method**: `POST`
- **Auth Required**: No
- **Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response**:
- **Code**: `200 OK`
- **Content**:
```json
{
  "_id": "60d5e4d61c9d440000a1b2c1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response**:
- **Code**: `401 Unauthorized`
- **Content**:
```json
{
  "message": "Invalid email or password"
}
```

### Get User Profile

Retrieves the authenticated user's profile information.

- **URL**: `/users/profile`
- **Method**: `GET`
- **Auth Required**: Yes

**Success Response**:
- **Code**: `200 OK`
- **Content**:
```json
{
  "_id": "60d5e4d61c9d440000a1b2c1",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "preferences": {
    "darkMode": "dark",
    "taskViewMode": "list"
  },
  "createdAt": "2023-08-25T10:23:45.000Z"
}
```

### Update User Profile

Updates the authenticated user's profile information.

- **URL**: `/users/profile`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Request Body**: Fields to update
```json
{
  "name": "John Updated",
  "preferences": {
    "darkMode": "light"
  }
}
```

**Success Response**:
- **Code**: `200 OK`
- **Content**: Updated user profile

**Error Response**:
- **Code**: `400 Bad Request`
- **Content**:
```json
{
  "message": "Invalid profile data"
}
```

## Data Models

### Task Model

```javascript
{
  text: String,          // Required: Task description
  completed: Boolean,    // Default: false
  priority: Number,      // 0: None, 1: Low, 2: Medium, 3: High
  dueDate: Date,         // Optional: Due date for the task
  category: String,      // Optional: Task category
  user: ObjectId,        // Reference to User model
  createdAt: Date,       // Auto-generated timestamp
  updatedAt: Date        // Auto-updated timestamp
}
```

### User Model

```javascript
{
  name: String,          // Required: User's full name
  email: String,         // Required: Unique email
  password: String,      // Required: Hashed password
  preferences: {         // User preferences
    darkMode: String,    // "light", "dark", or "system"
    taskViewMode: String // "list" or "grid"
  },
  createdAt: Date,       // Auto-generated timestamp
  updatedAt: Date        // Auto-updated timestamp
}
```

## Security Considerations

1. Authentication is required for all task endpoints
2. Users can only access their own tasks
3. All passwords are hashed before storage
4. JWT tokens expire after 24 hours

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per IP address per minute for public endpoints
- 300 requests per authenticated user per minute for protected endpoints

## Versioning

Current API version: v1 (implicit in the routes)

Future versions will be explicitly versioned as `/api/v2/...`
