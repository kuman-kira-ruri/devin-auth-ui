# Full-Stack Authentication App

A simple full-stack authentication application built with Node.js/Express backend and React/Vite frontend.

## Features

- User registration with email and password
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes with middleware
- React frontend with Tailwind CSS styling
- SQLite database for data persistence

## Tech Stack

### Backend
- Node.js + Express
- SQLite database
- bcrypt for password hashing
- JWT for authentication
- CORS enabled for frontend communication

### Frontend
- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui components
- Lucide React icons

## Project Structure

```
auth-app/
├── backend/
│   ├── server.js              # Main server file
│   ├── database.js            # SQLite database setup
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── package.json
│   ├── .env                   # Environment variables
│   └── .env.example           # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.tsx  # Login/Register form
│   │   │   └── Dashboard.tsx  # Protected dashboard
│   │   ├── utils/
│   │   │   └── auth.ts        # API utilities
│   │   └── App.tsx            # Main app component
│   ├── package.json
│   ├── .env                   # Frontend environment variables
│   └── .env.example           # Frontend environment template
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd auth-app/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file and configure if needed:
   ```bash
   cp .env.example .env
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd auth-app/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Register a new account with email and password (minimum 6 characters)
3. Login with your credentials
4. Access the protected dashboard after successful authentication
5. Logout to return to the login page

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user and get JWT token
- `GET /api/dashboard` - Protected route (requires JWT token)
- `GET /api/health` - Health check endpoint

### Request/Response Examples

#### Register User
```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

#### Login User
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

#### Access Protected Route
```bash
curl -X GET http://localhost:3001/api/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Environment Variables

### Backend (.env)
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

## Database

The application uses SQLite with a simple user schema:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

The database file (`database.sqlite`) will be created automatically in the backend directory when you first run the server.

## Security Features

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens expire after 24 hours
- Protected routes require valid JWT tokens
- CORS configured for frontend-backend communication
- Input validation for email and password requirements

## Development Notes

- The backend runs on port 3001 to avoid conflicts with the frontend
- Hot reloading is enabled for both frontend and backend during development
- The SQLite database persists data between server restarts
- JWT tokens are stored in localStorage on the frontend

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure ports 3001 (backend) and 5173 (frontend) are available
2. **CORS errors**: Ensure the backend is running and CORS is properly configured
3. **Database errors**: Check that the backend has write permissions in its directory
4. **JWT errors**: Verify that the JWT_SECRET is set in the backend .env file

### Testing the API

You can test the backend endpoints directly using curl or a tool like Postman:

1. Start the backend server
2. Test the health endpoint: `curl http://localhost:3001/api/health`
3. Register a user and save the returned JWT token
4. Use the token to access protected routes

## License

This project is for educational purposes and is not licensed for commercial use.
