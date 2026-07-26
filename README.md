# 🃏 UNO Backend API

Functional-first Node.js backend for a digital implementation of the **UNO** card game, developed as an incremental
Capstone Project for the course. The system applies **Functional Programming** principles (pure functions,
immutability, isolated side effects) on top of a strict **Hexagonal Architecture (Ports and Adapters)** with
**Screaming Architecture** folder conventions.

The project currently exposes full CRUD management for **Games**, built on top of a layered architecture designed to
scale as UNO-specific concepts (players, cards, game sessions, score history, turn logic) are progressively
incorporated.

---

## 📌 Project Objectives

- Implement full CRUD operations (`Create`, `Read`, `Update`, `Patch`, `Delete`) for the domain entity.
- Apply **Hexagonal Architecture (Ports and Adapters)**: the domain and application layers never depend on Express or
  Sequelize.
- Apply **Screaming Architecture**: the folder structure communicates business intent (`domain`, `application`,
  `infrastructure`, `entities`, `ports`, `usecases`, `adapters`) rather than framework mechanics.
- Respect **S.O.L.I.D.** principles, in particular Dependency Inversion between the application layer and its
  persistence port.
- Keep business logic expressed through pure, predictable functions with side effects isolated to the infrastructure
  layer.
- Provide centralized, predictable error handling using custom domain error classes.
- Provide a ready-to-import Postman collection for manual verification of every endpoint.

---

## ⚙️ System Requirements

- Node.js 18 or higher
- PostgreSQL 14 or higher
- npm 9 or higher

> `node_modules` is assumed to already exist locally (dependencies previously installed via `npm install`).

---

## 🚀 Installation & Configuration

1. Ensure dependencies are installed:

    ```bash
       npm install
    ```

2. Create a PostgreSQL database matching the name you will define in your environment variables.
3. Create a `.env` file in the `Backend` root directory:
    ```
    DB_NAME=capstone_uno_game_db
    DB_USER=UNO-Capstone
    DB_PASSWORD=admin
    DB_HOST=localhost
    DB_PORT=5432
    PORT=3000
    ```
4. Adjust the values above to match your local PostgreSQL configuration.

---

## ▶️ Execution

Start the server in standard mode:

```bash
node src/server.js
```

Start the server in development mode with automatic reload (nodemon):

```bash
npm run dev
```

Once started, the API is available at:
http://localhost:3000

---

## 📂 Project Structure

```
C:.
│   Capstone - UNO.iml
│   README.md
│       
└───Backend
    │   .env
    │   docker-compose.yml
    │   package-lock.json
    │   package.json
    │   postman_collection.json  
    │   
    └───src
        │   app.js
        │   server.js
        │   
        ├───game
        │   ├───application
        │   │   └───usecases
        │   │           createGame.js
        │   │           deleteGame.js
        │   │           getGameById.js
        │   │           patchGame.js
        │   │           updateGame.js
        │   │           
        │   ├───domain
        │   │   ├───entities
        │   │   │       Game.js
        │   │   │       
        │   │   └───ports
        │   │           GameRepositoryPort.js
        │   │           
        │   └───infrastructure
        │       ├───adapters
        │       │   ├───controllers
        │       │   │       GameController.js
        │       │   │       
        │       │   └───repositories
        │       │           SequelizeGameRepository.js
        │       │           
        │       ├───models
        │       │       GameModel.js
        │       │       
        │       └───routes
        │               gameRoutes.js
        │               
        └───shared
            ├───domain
            │   └───errors
            │           AppErrors.js
            │           
            └───infrastructure
                ├───database
                │       sequelizeConfig.js
                │       
                └───middlewares
                        errorHandler.js
```

---

## 🔑 Endpoints (Game Entity)

### `POST /api/games` — Create a new game

**Request body:**

```json
{
  "title": "UNO",
  "status": "active",
  "maxPlayers": 4
}
```

**Response `201 Created`:**

```json
{
  "id": "8c9a6e2e-3f7b-4e34-9a4d-0c2f9d9d1a11",
  "title": "UNO",
  "status": "active",
  "maxPlayers": 4,
  "createdAt": "2026-07-25T21:00:00.000Z",
  "updatedAt": "2026-07-25T21:00:00.000Z"
}
```

---

### `GET /api/games/:id` — Retrieve a game by id

**Response `200 OK`:**

```json
{
  "id": "8c9a6e2e-3f7b-4e34-9a4d-0c2f9d9d1a11",
  "title": "UNO",
  "status": "active",
  "maxPlayers": 4,
  "createdAt": "2026-07-25T21:00:00.000Z",
  "updatedAt": "2026-07-25T21:00:00.000Z"
}
```

**Response `404 Not Found`:**

```json
{
  "error": "Game not found"
}
```

---

### `PUT /api/games/:id` — Fully replace a game

**Request body:**

```json
{
  "title": "UNO Reloaded",
  "status": "waiting",
  "maxPlayers": 6
}
```

**Response `200 OK`:**

```json
{
  "id": "8c9a6e2e-3f7b-4e34-9a4d-0c2f9d9d1a11",
  "title": "UNO Reloaded",
  "status": "waiting",
  "maxPlayers": 6,
  "createdAt": "2026-07-25T21:00:00.000Z",
  "updatedAt": "2026-07-25T21:05:00.000Z"
}
```

---

### `PATCH /api/games/:id` — Partially update a game

**Request body:**

```json
{
  "status": "finished"
}
```

**Response `200 OK`:**

```json
{
  "id": "8c9a6e2e-3f7b-4e34-9a4d-0c2f9d9d1a11",
  "title": "UNO Reloaded",
  "status": "finished",
  "maxPlayers": 6,
  "createdAt": "2026-07-25T21:00:00.000Z",
  "updatedAt": "2026-07-25T21:10:00.000Z"
}
```

---

### `DELETE /api/games/:id` — Delete a game

**Response:** `204 No Content` (no response body)

---

## 🧨 Error Handling

The API centralizes error translation through a global Express middleware (`errorHandler.js`), which never inspects
mutated native `Error` objects. Instead, the application layer throws typed domain errors defined in `AppErrors.js`:

- **`ValidationError`** → HTTP `400 Bad Request` (invalid or missing input, such as a missing `title`, a missing or
  non-integer `maxPlayers`, or an `id` that is not a valid UUID).
- **`NotFoundError`** → HTTP `404 Not Found` (requested `Game` does not exist).

Any unrecognized error defaults to HTTP `500 Internal Server Error`, keeping the response contract predictable across
the whole API.

---

## 📮 Postman

A ready-to-import Postman collection (`postman_collection.json`, schema v2.1) is provided at the project root, covering
all five endpoints with the exact request payloads documented above.

---

## 🏛️ Architecture Justification

This project adopts **Hexagonal Architecture (Ports and Adapters)** combined with **Screaming Architecture** because
this approach is very clear, highly maintainable, easy to understand and implement, and strictly respects the **Onion
Architecture** principle of keeping responsibilities completely isolated.

The `domain` layer contains the core business entities and ports (interfaces), with no knowledge of Express, HTTP, or
Sequelize. The `application` layer contains the use cases, which orchestrate business logic by depending exclusively on
the ports defined in `domain`, never on a concrete implementation. The `infrastructure` layer contains the concrete
adapters (Express controllers, Sequelize repositories, models, routes, and middlewares), making it the only layer aware
of the underlying technology in use.

This isolation guarantees zero coupling between the inner and outer layers. If the project needs to migrate from
PostgreSQL to another database engine, or from Express to another HTTP framework, only the adapters inside
`infrastructure` need to be replaced, without modifying a single line of the domain or the use cases. This strictly
complies with the Dependency Inversion Principle (the D in S.O.L.I.D.) and results in a system that is scalable,
testable, and easy to extend as the UNO game rules, players, cards, and scoring history are progressively incorporated
in later Capstone deliveries.

The folder structure itself "screams" its intent (`domain`, `application`, `infrastructure`, `entities`, `ports`,
`usecases`, `adapters`), allowing any developer, even without prior knowledge of the framework in use, to immediately
understand the responsibility of each module simply by looking at the directory tree.

---

## 📖 Notes on Project Evolution

`Game` currently identifies each match by a UUID and tracks its `title`, `status` and `maxPlayers`, with `createdAt` /
`updatedAt` timestamps managed automatically by Sequelize. Player, card and score management, along with the actual UNO
game logic, turn handling, unit tests with minimum 70% coverage, SOLID-driven refactors, and a final Desktop UI, will
be incorporated on top of this same architecture as the project keeps growing.

---

## 🧑‍💻 Authors

Project developed at **Jala University | [Official - ES] - Programming 4 - CSPR-244**
by: <br>

- Toloza Leonel Alejandro (Cohort 5 T1/2025 - Arg.) <br>
  Student ID: STU-953.ARG-C5 <br>
  Institutional Email: Leonel.Toloza0125@jala.university

Instructors:

- Professor: Santiago Komadina Geffroy (Group A)
- Practitioner: Orlando Alarcon Perez (Section C)
