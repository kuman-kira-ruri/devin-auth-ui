# Full-Stack Authentication App

A simple full-stack authentication application built with Node.js/Express backend and React/Vite frontend.

## Features

- User registration with email and password
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected routes with middleware
- React frontend with Tailwind CSS styling
- JSON file-based database for data persistence
- Linux-compatible line endings (LF)

## Tech Stack

### Backend
- Node.js + Express
- JSON file database (no SQLite dependency)
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
│   ├── database.js            # JSON database setup
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── package.json
│   ├── env.example            # Environment variables template
│   └── render.yaml            # Render deployment config
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
├── render.yaml                 # Render deployment configuration
├── .gitattributes             # Line ending configuration
├── .gitignore                 # Git ignore rules
└── README.md
```

## Line Endings Configuration

This project is configured to use LF (Linux) line endings for compatibility with Linux-based hosting services like Render. The `.gitattributes` file ensures consistent line endings across different operating systems.

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
   cp env.example .env
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

## Deployment on Render

### Backend Deployment

1. **Renderアカウントを作成**: [Render.com](https://render.com) でアカウントを作成

2. **新しいWebサービスを作成**:
   - Renderダッシュボードで「New +」→「Web Service」を選択
   - GitHubリポジトリを接続
   - 以下の設定を使用：
     - **Name**: `auth-backend`
     - **Environment**: `Node`
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Health Check Path**: `/api/health`

3. **環境変数を設定**:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: ランダムな文字列（Renderで自動生成可能）

4. **デプロイ**:
   - 「Create Web Service」をクリック
   - デプロイが完了するまで待機

### デプロイ後の確認

1. **ルートエンドポイント**: `https://your-app-name.onrender.com/`
2. **ヘルスチェック**: `https://your-app-name.onrender.com/api/health`
3. **API エンドポイント**: `https://your-app-name.onrender.com/api/register`

### トラブルシューティング

- **404エラー**: ルートエンドポイントが追加されていることを確認
- **CORSエラー**: フロントエンドのURLをCORS設定に追加
- **環境変数エラー**: Renderの環境変数設定を確認
- **改行コードエラー**: `.gitattributes`ファイルでLF改行コードを強制

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

The application uses a JSON file-based database with a simple user schema:

```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "password": "hashed-password",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

The database file (`users.json`) will be created automatically in the backend directory when you first run the server.

## Security Features

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens expire after 24 hours
- Protected routes require valid JWT tokens
- CORS configured for frontend-backend communication
- Input validation for email and password requirements

## Development Notes

- The backend runs on port 3001 to avoid conflicts with the frontend
- Hot reloading is enabled for both frontend and backend during development
- The JSON database persists data between server restarts
- JWT tokens are stored in localStorage on the frontend
- All files use LF line endings for Linux compatibility

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure ports 3001 (backend) and 5173 (frontend) are available
2. **CORS errors**: Ensure the backend is running and CORS is properly configured
3. **Database errors**: Check that the backend has write permissions in its directory
4. **JWT errors**: Verify that the JWT_SECRET is set in the backend .env file
5. **Line ending errors**: Ensure `.gitattributes` is properly configured for LF endings

### Testing the API

You can test the backend endpoints directly using curl or a tool like Postman:

1. Start the backend server
2. Test the health endpoint: `curl http://localhost:3001/api/health`
3. Register a user and save the returned JWT token
4. Use the token to access protected routes

## License

This project is for educational purposes and is not licensed for commercial use.