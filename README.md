
# Assignment 8:  To-Do List Application

## Introduction

For this assignment, I planned all the required RESTful APIs for a simple To-Do List application.
The main goal was to properly design and structure the APIs without implementing them.

---

## Operations Performed by User

* Create a new todo
* Get all todos
* Get a specific single todo
* Update a todo
* Delete a todo
* Filter todos by status (pending or completed)
* Search todos by title

---

## 1. Task Data Structure

Each todo in the database is structured as follows:

```json
{
  "id": "string",
  "title": "string (required)",
  "description": "string (optional)",
  "status": "pending || completed",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## 2. API Endpoints Used

### 2.1 Create New Todo

**Purpose:** Add a new todo
**Endpoint:** `POST /api/todo`

#### Request Body

```json
{
  "title": "MERN Assignment",
  "description": "Finish API planning",
  "status": "pending"
}
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "id": "12345",
    "title": "MERN Assignment",
    "description": "Finish API planning",
    "status": "pending",
    "createdAt": "2026-02-16T10:00:00Z",
    "updatedAt": "2026-02-16T10:00:00Z"
  }
}
```

---

### 2.2 Get All Todos

**Purpose:** View all todos
**Endpoint:** `GET /api/todo`

#### Success Response

```json
[
  {
    "id": "12345",
    "title": "MERN Assignment",
    "description": "Finish API planning",
    "status": "pending",
    "createdAt": "2026-02-16T10:00:00Z",
    "updatedAt": "2026-02-16T10:00:00Z"
  },
  {
    "id": "123456",
    "title": "Identify the Possible APIs",
    "description": "New API planning for Todo application",
    "status": "pending",
    "createdAt": "2026-02-16T10:00:00Z",
    "updatedAt": "2026-02-16T10:00:00Z"
  }
]
```

---

### 2.3 Get Single Todo

**Purpose:** View a single todo by ID
**Endpoint:** `GET /api/todo/:id`
Example: `/api/todo/1234567`

#### Success Response

```json
{
  "id": "1234567",
  "title": "Its assignment 7",
  "description": "Thinking best API for this assignment",
  "status": "pending",
  "createdAt": "2026-02-16T10:00:00Z",
  "updatedAt": "2026-02-16T10:00:00Z"
}
```

---

### 2.4 Update Todo

**Purpose:** Edit an existing todo
**Endpoint:** `PUT /api/todo/:id`
Example: `/api/todo/1234567`

#### Request Body

```json
{
  "title": "Update anything you want",
  "status": "completed"
}
```

---

### 2.5 Delete Todo

**Purpose:** Remove a todo
**Endpoint:** `DELETE /api/todo/:id`

#### Success Response

```json
{
  "message": "Task deleted successfully"
}
```

---

### 2.6 Filter Todo API

**Purpose:** Filter todos based on status (pending or completed)
**Endpoint:** `GET /api/todo?status=completed`

#### Expected Success Response

```json
[
  {
    "id": "1234567",
    "title": "Its assignment 7",
    "description": "Thinking best API for this assignment",
    "status": "completed",
    "createdAt": "2026-02-16T10:00:00Z",
    "updatedAt": "2026-02-16T10:00:00Z"
  }
]
```

---

### 2.7 Search Todo API

**Purpose:** Search todos by title keyword (case-insensitive)
**Endpoint:** `GET /api/todo?search=MERN`

#### Expected Success Response

```json
[
  {
    "id": "12345",
    "title": "MERN Assignment",
    "description": "Finish API planning",
    "status": "pending"
  }
]
```

---

## 3. CRUD Operations Covered

| Operation        | Endpoint                     | Method |
| ---------------- | ---------------------------- | ------ |
| Create Todo      | `/api/todo`                  | POST   |
| Read All Todos   | `/api/todo`                  | GET    |
| Read Single Todo | `/api/todo/:id`              | GET    |
| Update Todo      | `/api/todo/:id`              | PUT    |
| Delete Todo      | `/api/todo/:id`              | DELETE |
| Filter Todo      | `/api/todo?status=completed` | GET    |
| Search Todo      | `/api/todo?search=MERN`      | GET    |

---

## 4. REST Principles Followed

* Correct CRUD methods (GET, POST, PUT, DELETE)
* Clean and meaningful resource URLs (`/api/todo`)
* Use of ID for accessing specific resources
* Query parameters for filtering and searching
* Clear request and response structure

---

## 5. Implementation Challenges Faced

* Validating user input properly
* Handling missing or invalid todo IDs
* Managing CORS configuration
* Environment variable setup using dotenv
* Organizing routes properly
* Writing proper error handling logic

---

## 6. Brief Explanation of the To-Do APIs

I designed all APIs required for a MERN To-Do application using proper REST principles. All CRUD operations are covered clearly. The GET endpoint supports filtering using the `status` query parameter and searching using the `search` parameter.

Both filtering and searching can also be combined in a single request to get more specific results. This approach keeps the API simple, flexible, and easy to scale in future enhancements.

---

You can directly copy-paste this into your `README.md` file.

If you want, I can also format it with badges and project structure to make your GitHub profile look more professional.
