<h1 align="center">Advanced Authentication System 🔒 </h1>

About This Project:

- 🔧 Backend Setup
- 🗄️ Database Setup
- 🔐 Signup Endpoint
- 📧 Sending Verify Account Email
- 🔍 Verify Email Endpoint
- 📄 Building a Welcome Email Template
- 🚪 Logout Endpoint
- 🔑 Login Endpoint
- 🔄 Forgot Password Endpoint
- 🔁 Reset Password Endpoint
- ✔️ Check Auth Endpoint
- 🌐 Frontend Setup
- 📋 Signup Page UI
- 🔓 Login Page UI
- ✅ Email Verification Page UI
- 📤 Implementing Signup
- 📧 Implementing Email Verification
- 🔒 Protecting Our Routes
- 🔑 Implementing Login
- 🏠 Dashboard Page
- 🔄 Implementing Forgot Password
- 🚀 Super Detailed Deployment

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or Yarn
- A running MongoDB instance (local or cloud)

---

### Configuration

Create a `.env` file in the `backend` folder with the following variables:

```bash
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development

MAILTRAP_TOKEN=your_mailtrap_token

CLIENT_URL=http://localhost:5173
```

You can point `CLIENT_URL` to the deployment address when pushing to production.

### Installing Dependencies

This monorepo contains two separate Node projects:

1. **Backend** – an Express.js API using MongoDB
2. **Frontend** – a React application bootstrapped with Vite and styled with Tailwind

Install the dependencies for both from the project root:

```bash
# from the root of the repo
npm install            # installs root scripts and devDependencies
npm run install:all    # convenience script (same as below)

# or run manually
cd backend && npm install
cd ../frontend && npm install
```

> The root `package.json` includes a `build` script that also installs frontend dependencies automatically.

### Configuration

Create a `.env` file in the `backend` folder with the following variables:

```bash
MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development

MAILTRAP_TOKEN=your_mailtrap_token

CLIENT_URL=http://localhost:5173
```

You can point `CLIENT_URL` to the deployment address when pushing to production.

### Running the app locally

Start the server and the client in separate terminals:

```bash
# terminal 1 - backend
cd backend
npm run start

# terminal 2 - frontend
cd frontend
npm run dev
```

After the frontend build completes you can also serve the production bundle with:

```bash
# from root
npm run build         # builds both apps (see package.json scripts)
npm run start         # starts the backend which serves the built frontend
```

### Available Scripts

All runnable commands are defined in the root `package.json`; running them from the root will automatically execute the right script in the appropriate subfolder.

| Script                | What it does                                                                        |
| --------------------- | ----------------------------------------------------------------------------------- |
| `npm run dev`         | Starts both backend (`nodemon`) and frontend (Vite) in dev mode                     |
| `npm run start`       | Starts the backend server in production mode                                        |
| `npm run build`       | Installs frontend deps & builds the React app; output is copied to `backend/public` |
| `npm run install:all` | Installs dependencies for both backend and frontend                                 |

You can also navigate into `backend` or `frontend` and run `npm run` commands directly if you prefer.

### API Endpoints

The backend exposes the following endpoints under `/api/auth`:

| Route              | Method | Description                      |
| ------------------ | ------ | -------------------------------- |
| `/signup`          | POST   | Register new user                |
| `/login`           | POST   | Obtain JWT cookie                |
| `/logout`          | GET    | Clear authentication cookie      |
| `/verify-email`    | GET    | Verify account via token         |
| `/forgot-password` | POST   | Request password reset link      |
| `/reset-password`  | POST   | Change password using token      |
| `/check-auth`      | GET    | Protected route, validates token |

See `backend/controllers/auth.controller.js` for implementation details.

### Features Overview

- JWT-based authentication with httpOnly cookies
- Email verification using Nodemailer and Mailtrap
- Password reset flow
- Frontend built with React, Vite and Tailwind CSS
- Protected dashboard page

### Deployment

In production the backend serves the compiled frontend from `backend/public`.

1. Set the environment variables in your hosting environment (e.g. Heroku, DigitalOcean, AWS).
2. Build the frontend: `npm run build` from the root.
3. Start the server: `npm run start` (or use a process manager like PM2).
4. Ensure your MongoDB URI is reachable by the deployed service.

You may also deploy frontend and backend separately if desired; just adjust `CLIENT_URL` accordingly.

---

### Contributing

Contributions are welcome! Feel free to open issues or pull requests. Some ideas:

- Add social login (Google/Facebook)
- Improve form validation and error handling
- Add tests for backend endpoints

Please follow the existing coding style and ensure linting passes.

---

Enjoy! 🚀
