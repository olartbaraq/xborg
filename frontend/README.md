# XBorg Frontend

A modern Next.js 16 frontend application for secure authentication and user profile management, featuring a beautiful SwissBorg-inspired UI design.

## 🚀 Features

- **Google OAuth Sign-In** - One-click authentication with Google
- **Persistent Sessions** - HTTP-only cookie-based session management
- **User Profile Management** - View and edit user profiles
- **Protected Routes** - Automatic redirect for unauthenticated users
- **Beautiful UI** - SwissBorg-inspired design with Tailwind CSS
- **Toast Notifications** - User-friendly feedback for actions
- **Responsive Design** - Works seamlessly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+ and Yarn
- Backend API running (see backend README)

## 🔧 Environment Setup

1. Copy the environment example file:

```bash
cp env.example .env.local
```

2. Configure your backend API URL:

```env
NEXT_PUBLIC_API_URL={backendUrl}
```

## 📦 Installation

```bash
# Install dependencies
yarn install
```

## 🚀 Running the Application

```bash
# Development mode (with hot reload)
yarn dev

# Production build
yarn build
yarn start

# Lint code
yarn lint
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js App Router pages
│   ├── auth/                 # Auth callback pages
│   │   ├── success/          # OAuth success handler
│   │   └── error/            # OAuth error handler
│   ├── profile/              # User profile page
│   ├── signin/               # Sign-in page
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Landing page
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   └── layout/               # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── ProtectedRoute.tsx
├── lib/                      # Library code
│   ├── api/                  # API client and endpoints
│   │   ├── axios.ts          # Axios configuration
│   │   ├── auth.ts           # Auth API methods
│   │   └── user.ts           # User API methods
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # Authentication hook
│   │   └── useUser.ts        # User data hook
│   ├── providers/            # React context providers
│   │   ├── AuthProvider.tsx  # Auth state management
│   │   ├── QueryProvider.tsx # React Query client
│   │   └── ToastProvider.tsx # Toast notifications
│   └── types/                # TypeScript types
│       └── user.ts           # User-related types
└── public/                   # Static assets
```

## 🎨 Design System

The application uses a SwissBorg-inspired color scheme:

- **Primary Green**: `#01C38D` - Main brand color
- **Green Light**: `#00E5A0` - Accent color
- **Dark Background**: `#0D0E12` - Main background
- **Card Background**: `#1A1B23` - Card/surface color
- **Border**: `rgba(255,255,255,0.08)` - Subtle borders
- **Gray Text**: `#9CA3AF` - Secondary text

## 🔐 Authentication Flow

1. User clicks "Sign in with Google" → Redirects to backend `/auth/google`
2. Backend redirects to Google OAuth consent screen
3. User grants permission → Google redirects to backend callback
4. Backend sets HTTP-only cookies → Redirects to `/auth/success`
5. Frontend fetches user from `/auth/me` → Stores in React state
6. User redirected to `/profile` page

## 📱 Pages

### Landing Page (`/`)

- Hero section with feature highlights
- Call-to-action buttons
- Feature cards

### Sign In (`/signin`)

- Google OAuth button
- Beautiful glassmorphism card design
- Auto-redirect if already authenticated

### Profile (`/profile`)

- Protected route (requires authentication)
- View user information
- Edit first name and last name
- Account information display

### Auth Success (`/auth/success`)

- Handles OAuth callback
- Fetches user data
- Redirects to profile

### Auth Error (`/auth/error`)

- Displays authentication errors
- Retry option
- Redirects to sign-in

## 🔒 Security Features

- **HTTP-Only Cookies**: Tokens never exposed to JavaScript
- **Automatic Token Refresh**: Axios interceptor handles token refresh
- **Protected Routes**: Automatic redirect for unauthenticated users
- **CORS**: Configured to work with backend
- **Secure Cookie Handling**: Cookies sent automatically with `withCredentials: true`

## 🧩 Key Components

### `ProtectedRoute`

Wraps pages that require authentication. Automatically redirects to sign-in if user is not authenticated.

### `useAuth` Hook

Provides authentication state and methods:

- `user` - Current user object
- `isAuthenticated` - Boolean authentication status
- `login()` - Initiate Google OAuth
- `logout()` - Clear session and logout
- `isLoading` - Loading state

### `useUpdateUser` Hook

Mutation hook for updating user profile with automatic cache updates and toast notifications.

## 🐛 Troubleshooting

### API Connection Issues

- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running on the correct port
- Check CORS configuration in backend

### Authentication Not Working

- Check browser console for errors
- Verify cookies are being set (DevTools → Application → Cookies)
- Ensure `withCredentials: true` in axios config

### Profile Update Fails

- Check network tab for API errors
- Verify user is authenticated
- Check backend logs for validation errors

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)

## 📄 License

MIT
