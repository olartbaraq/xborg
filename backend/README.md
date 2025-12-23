# XBorg Backend API

A secure NestJS backend API for authentication and user management, featuring Google OAuth 2.0 integration with HTTP-only cookie-based session management.

## 🚀 Features

- **Google OAuth 2.0 Authentication** - Secure sign-in with Google accounts
- **HTTP-Only Cookie Sessions** - Tokens stored in secure HTTP-only cookies (XSS protection)
- **JWT Token Management** - Access tokens (15 min) and refresh tokens (7 days)
- **User Profile Management** - CRUD operations for user profiles
- **Rate Limiting** - Protection against brute force attacks
- **Security Headers** - Helmet.js for enhanced security
- **CORS Configuration** - Configured for frontend integration
- **TypeORM Integration** - PostgreSQL database with automatic schema synchronization (dev)

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with TypeORM
- **Authentication**: Passport.js (Google OAuth 2.0, JWT)
- **Security**: Helmet, Rate Limiting
- **Validation**: class-validator, class-transformer

## 📋 Prerequisites

- Node.js 20+ and Yarn
- PostgreSQL database
- Google Cloud Console OAuth 2.0 credentials

## 🔧 Environment Setup

1. Copy the environment example file:

```bash
cp env.example .env
```

2. Fill in your environment variables in `.env`:

```env
# Application
NODE_ENV=development
PORT=3001
APP_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# JWT Secrets (generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Database
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_USERNAME=your-db-username
DATABASE_PASSWORD=your-db-password
DATABASE_NAME=your-db-name
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Set **Authorized redirect URIs** to: `http://localhost:3001/auth/google/callback`
6. Copy `Client ID` and `Client Secret` to your `.env` file

## 📦 Installation

```bash
# Install dependencies
yarn install
```

## 🚀 Running the Application

```bash
# Development mode (with hot reload)
yarn start:dev

# Production build
yarn build
yarn start:prod

# Watch mode
yarn start:watch

# Debug mode
yarn start:debug
```

The API will be available at `http://localhost:3001`

## 📡 API Endpoints

### Authentication

| Method | Endpoint                | Description                    | Auth Required |
| ------ | ----------------------- | ------------------------------ | ------------- |
| `GET`  | `/auth/google`          | Initiate Google OAuth flow     | No            |
| `GET`  | `/auth/google/callback` | Google OAuth callback          | No            |
| `GET`  | `/auth/me`              | Get current authenticated user | Yes (Cookie)  |
| `GET`  | `/auth/check`           | Check authentication status    | No            |
| `POST` | `/auth/refresh`         | Refresh access token           | No (Cookie)   |
| `POST` | `/auth/logout`          | Logout user                    | No            |

### Users

| Method | Endpoint            | Description         | Auth Required |
| ------ | ------------------- | ------------------- | ------------- |
| `GET`  | `/user`             | Get all users       | Yes           |
| `GET`  | `/user/profile/:id` | Get user by ID      | Yes           |
| `PUT`  | `/user/profile/:id` | Update user profile | Yes           |
| `POST` | `/user/create`      | Create new user     | Yes           |

## 🔐 Security Features

- **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies (invisible to JavaScript)
- **Secure Cookies**: Cookies use `Secure` flag in production
- **SameSite Protection**: Cookies use `SameSite=lax` to prevent CSRF
- **Rate Limiting**: 10 requests per minute per IP
- **Helmet.js**: Security headers (XSS protection, content security policy)
- **CORS**: Configured for specific frontend origin
- **Input Validation**: DTOs with class-validator decorators

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── strategies/       # Passport strategies (Google, JWT)
│   │   ├── guards/           # Auth guards
│   │   ├── decorators/       # Custom decorators (@Public)
│   │   └── dto/              # Data transfer objects
│   ├── users/                # User management module
│   │   ├── entities/         # User entity
│   │   └── dto/              # User DTOs
│   ├── database/             # Database configuration
│   ├── config/               # Configuration files
│   └── main.ts               # Application entry point
├── .env                      # Environment variables (not in git)
└── package.json
```

## 🧪 Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## 📝 Database Migrations

The application uses TypeORM migrations for database schema management. **Never use `synchronize: true` in production!**

### Migration Commands

```bash
# Generate a new migration based on entity changes
yarn migration:generate src/database/migrations/MigrationName

# Create an empty migration file
yarn migration:create src/database/migrations/MigrationName

# Run pending migrations
yarn migration:run

# Revert the last migration
yarn migration:revert

# Show migration status
yarn migration:show
```

### Initial Setup

1. **Create the database**:

```bash
createdb your-db-name
# or using psql
psql -U postgres -c "CREATE DATABASE your-db-name;"
```

2. **Run migrations**:

```bash
yarn migration:run
```

### Creating Migrations

When you modify entities, generate a migration:

```bash
# This compares your entities with the database and generates a migration
yarn migration:generate src/database/migrations/AddNewColumnToUser
```

**Example**: If you add a new column to the User entity, run:

```bash
yarn migration:generate src/database/migrations/AddPhoneNumberToUser
```

This will create a migration file that you can review and commit to version control.

### Migration Best Practices

- ✅ Always review generated migrations before running
- ✅ Test migrations on a development database first
- ✅ Commit migration files to version control
- ✅ Run migrations in production using CI/CD pipeline
- ❌ Never edit existing migrations that have been run in production
- ❌ Never use `synchronize: true` in production

## 🔄 Cookie Flow

1. User signs in with Google → Backend receives OAuth callback
2. Backend generates JWT tokens → Sets HTTP-only cookies
3. Browser automatically sends cookies with every request
4. JWT Strategy extracts token from cookie → Validates → Grants access
5. On token expiration → Frontend calls `/auth/refresh` → New tokens set

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `CREATE DATABASE xborg_db;`

### OAuth Callback 404

- Verify `GOOGLE_CALLBACK_URL` matches Google Cloud Console settings
- Ensure callback URL points to **backend** (port 3001), not frontend

### 401 Unauthorized Errors

- Check if cookies are being sent (use browser DevTools → Network)
- Verify `withCredentials: true` in frontend axios config
- Ensure CORS allows credentials

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Passport.js Documentation](http://www.passportjs.org/)
- [TypeORM Documentation](https://typeorm.io/)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)

## 📄 License

MIT
