---
# Technical Test API

This project is an API built with [NestJS](https://nestjs.com) and uses [Prisma](https://www.prisma.io) as the ORM to manage the MySQL database. Follow the steps below to set up and run the project.
---

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

---

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/josers77j/technical-test-techywe-api.git
cd technical-test-api
```

### 2. Configure environment variables

Create a .env file in the root of the project

```properties
DATABASE_URL=mysql://root:password123@localhost:3306/managerDB

DB_NAME=
DB_USERNAME=
DB_PASSWORD=

PORT=

JWT_SECRET=
```

---

## Steps to Run the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Start the database with Docker

```bash
docker-compose up --build
```

This will start a container with MySQL configured according to the environment variables defined in the .env file.

### 3. Generate the Prisma client

```bash
npx prisma generate
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev --name init_db
```

> **Note:** `init_db` is the name of the migration log. You can change it as needed.

### 5. Start the server

Finally, start the server in development mode with the following command:

```bash
npm run dev
```

## License

This project is licensed under the MIT License.

---
