# Advanced Authentication System 🔒

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

### About This Project

A full-stack MERN (MongoDB, Express, React, Node) Authentication system engineered with an "Industrial-grade" workflow. It features secure JWT handling, automated email service integration, and a containerized deployment pipeline.

### 🚀 Industrial Upgrades

- **Dockerized Infrastructure**: Entire application is containerized for environment parity across development and production.
- **CI/CD Pipeline**: Integrated GitHub Actions to automate build checks and testing on every push.
- **Automated Unit Testing**: Robust test suite using Jest to verify JWT logic, password hashing, and core auth utilities.

---

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) (for containerized execution)
- A running MongoDB instance (local or cloud)

---

### Configuration

Create a `.env` file in the root directory with the following variables:

```bash
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development
BREVO_API_KEY=your-brevo-api-key
CLIENT_URL=http://localhost:5173
```

## 🐳 Docker Execution

Run the entire system in an isolated environment with a single command:

```bash
# Build the image
docker build -t auth-system .

# Run the container
docker run -p 5000:5000 --env-file .env auth-system
```

## 🧪 Automated Testing

Verify the core authentication logic locally using Jest:

```bash
npm test
```

Current tests cover: JWT Generation, Bcrypt Password Hashing, Email Format Validation, and Reset Token Integrity.

## Available Scripts

| Script          | What it does                                                        |
| --------------- | ------------------------------------------------------------------- |
| `npm run dev`   | Starts both backend (nodemon) and frontend (Vite) in dev mode       |
| `npm run start` | Starts the backend server in production mode                        |
| `npm run test`  | Runs the Jest test suite with ESM support                           |
| `npm run build` | Builds the React app and prepares the backend to serve static files |

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

## ⚙️ CI/CD Workflow

The project includes a GitHub Actions workflow (`.github/workflows/docker-build.yml`) that triggers on every push to `main`:

1. **Linting & Setup**: Prepares the Node.js environment.
2. **Automated Testing**: Runs the Jest suite; if any test fails, the build stops.
3. **Docker Build Check**: Verifies that the Dockerfile can successfully build the production image.

## Contributing

Contributions are welcome! Currently looking to add:

- Integration tests for API endpoints using Supertest.
- Refactoring core services into an OOP-based Service Layer.

Enjoy! 🚀
