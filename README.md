# Advanced Authentication System 🔒

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Brevo](https://img.shields.io/badge/Brevo-0B996E?style=for-the-badge&logo=sendinblue&logoColor=white)

[![Docker Build Check](https://github.com/KAMO333/mern-advanced-auth/actions/workflows/docker-build.yml/badge.svg)](https://github.com/KAMO333/mern-advanced-auth/actions/workflows/docker-build.yml)

---

### About This Project

A full-stack MERN (MongoDB, Express, React, Node) Authentication system engineered with a production-grade workflow. It features secure JWT handling, automated email service integration, and a containerized deployment pipeline.

### 🚀 Key Features

- **Robust Auth Engine:** Secure JWT handling with Access & Refresh tokens via HTTP-only cookies.
- **Email Verification:** Integration with Brevo/Nodemailer for account validation and password recovery.
- **Dockerized Infrastructure:** Entire application is containerized for environment parity.
- **CI/CD Pipeline:** Integrated GitHub Actions to automate testing on every push.

---

## 🛠️ Local Development Setup

Follow these steps to get the project running on your machine.

### 1. Prerequisites

- Node.js (v18+)
- Docker (recommended for testing)
- A MongoDB instance (local or Atlas)

### 2. Clone and Install

```bash
git clone https://github.com/your-username/mern-advanced-auth.git
cd mern-advanced-auth

# Install backend & frontend dependencies
npm install
cd frontend && npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
BREVO_API_KEY=your_brevo_api_key
CLIENT_URL=http://localhost:5173
```

### 4. Run the Application

Start the frontend and backend simultaneously with one command:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🧪 Testing

Tests run exclusively inside Docker to ensure a consistent environment and prevent any risk of connecting to a real database. **Never run `npm test` directly** — always use the Docker command below.

#### Run Tests

```bash
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
```

This spins up a dedicated MongoDB 4.4.18 container, runs the full Jest suite against it, and tears everything down on completion. No data is ever written to your real database.

**Current Coverage: 78% line coverage across 5 test suites and 12 passing tests.**

| Area             | Line Coverage |
| ---------------- | ------------- |
| Auth Controller  | 78.65%        |
| Auth Routes      | 100%          |
| User Model       | 100%          |
| JWT Utility      | 100%          |
| Token Middleware | 80%           |

Tests cover: Signup flow, Login flow, Session handling, Password reset, JWT generation, bcrypt hashing, and email validation — wired into the CI/CD pipeline as a deployment gate.

---

## 📂 Project Structure

- `backend/controllers` — Logic for signup, login, and token validation.
- `backend/middleware` — Route protection and Admin checks.
- `backend/tests` — Jest unit and integration test suites.
- `frontend/src/store` — Global state management using Zustand.

---

## Available Scripts

| Script          | What it does                                        |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Recommended: Starts Backend & Frontend concurrently |
| `npm run test`  | Runs Jest tests with ESM support                    |
| `npm run start` | Starts the production server                        |
| `npm run build` | Builds the React app for production                 |

---

## API Endpoints

The backend exposes the following endpoints under `/api/auth`:

| Route              | Method | Description                      |
| ------------------ | ------ | -------------------------------- |
| `/signup`          | POST   | Register new user                |
| `/login`           | POST   | Obtain JWT cookie                |
| `/logout`          | GET    | Clear authentication cookie      |
| `/verify-email`    | POST   | Verify account via token         |
| `/forgot-password` | POST   | Request password reset link      |
| `/reset-password`  | POST   | Change password using token      |
| `/check-auth`      | GET    | Protected route, validates token |

---

## ⚙️ CI/CD Workflow

The project includes a GitHub Actions workflow (`.github/workflows/docker-build.yml`) that triggers on every push to `main`:

1. **Linting & Setup**: Prepares the Node.js environment.
2. **Automated Testing**: Runs the Jest suite; if any test fails, the build stops.
3. **Docker Build Check**: Verifies that the Dockerfile can successfully build the production image.

---

## 🔭 Future Plans

This project is actively evolving. Planned upgrades include:

- **Migrate from MongoDB to PostgreSQL** — moving to a relational database to handle more structured data relationships and improve query performance at scale.
- **Migrate from JavaScript to TypeScript** — adding static typing across the full stack to improve code reliability, catch errors earlier, and make the codebase easier to maintain.
- **Integration tests for API endpoints** using Supertest to complement the existing unit test suite.

---

Enjoy! 🚀
