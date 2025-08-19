# Frontend Authentication Integration Guide

This document provides guidance for integrating the frontend authentication system with backend APIs and existing SDLC Core components.

## Authentication API Endpoints

The frontend expects the following API endpoints to be implemented:

### POST /auth/api/login
**Request:**
```json
{
  "username": "string",
  "password": "string",
  "rememberMe": boolean (optional)
}
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": number,
    "username": "string", 
    "email": "string",
    "roles": [
      {
        "id": number,
        "name": "string",
        "description": "string"
      }
    ],
    "isActive": boolean,
    "memberSince": "string",
    "lastLogin": "string"
  },
  "token": "string" (optional - for JWT implementation)
}
```

**Response (Error - 401):**
```json
{
  "error": "Invalid credentials"
}
```

### POST /auth/api/register
**Request:**
```json
{
  "username": "string",
  "email": "string", 
  "password": "string",
  "confirmPassword": "string"
}
```

**Response:** Same as login success response

### POST /auth/api/logout
**Request:** Empty body or JWT token in headers
**Response:** 200 OK

### GET /auth/api/user/profile
**Request:** JWT token in Authorization header (if using JWT)
**Response:** User object (same format as login response)

## Role-Based Access Integration

### Available Roles
- `admin` - Full system administrator access
- `user` - Standard user access  
- `moderator` - Content moderation access
- `analyst` - Analytics and reporting access
- `developer` - Development and deployment access

### Using Authentication in Components

```tsx
import { useAuth, RequireRole, RequireAuth } from '../stores/authStore';

// Check authentication status
const { isAuthenticated, user, hasRole } = useAuth();

// Protect entire components
<RequireAuth>
  <ProtectedContent />
</RequireAuth>

// Protect by specific role
<RequireRole role="admin">
  <AdminContent />
</RequireRole>

// Protect by multiple roles
<RequireRole role={["admin", "developer"]}>
  <DevContent />
</RequireRole>

// Check roles in code
if (hasRole('analyst')) {
  // Show analytics features
}
```

### Protecting API Calls

```tsx
import { useAuth } from '../stores/authStore';

const MyComponent = () => {
  const { user, isAuthenticated } = useAuth();
  
  const callProtectedAPI = async () => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }
    
    // Include user token in API calls
    const response = await fetch('/api/protected-endpoint', {
      headers: {
        'Authorization': `Bearer ${user.token}`, // if using JWT
        'Content-Type': 'application/json'
      }
    });
    
    return response.json();
  };
};
```

## Backend Integration Steps

### 1. Update Authentication Store
Replace the mock API in `frontend/stores/authStore.tsx`:

```tsx
// Replace mockApi object with actual API calls
const api = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await fetch('/auth/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return response.json();
  },
  
  // ... implement other methods
};
```

### 2. Add JWT Token Management (Optional)
If using JWT tokens:

```tsx
// Add token to localStorage
localStorage.setItem('authToken', user.token);

// Include token in API requests
const token = localStorage.getItem('authToken');
headers: {
  'Authorization': `Bearer ${token}`
}

// Remove token on logout
localStorage.removeItem('authToken');
```

### 3. Environment Configuration
Add environment variables for API endpoints:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_AUTH_ENDPOINT=/auth/api
```

### 4. Error Handling
Update error handling for production:

```tsx
// Add proper error boundaries
// Implement user-friendly error messages  
// Add logging for authentication errors
```

## Security Considerations

1. **HTTPS Only**: Ensure all authentication happens over HTTPS
2. **Token Expiration**: Implement proper token expiration and refresh
3. **Rate Limiting**: Add rate limiting to prevent brute force attacks
4. **Password Policies**: Enforce strong password requirements
5. **Session Management**: Implement secure session handling
6. **CSRF Protection**: Add CSRF token validation for forms

## Testing

The authentication system includes comprehensive test scenarios:

1. **Login Flow**: Valid/invalid credentials, remember me functionality
2. **Registration**: New user creation, validation, role assignment  
3. **Role Protection**: Access control for admin/user roles
4. **Navigation**: Context-aware navigation based on auth state
5. **Session Persistence**: Page refresh maintaining login state
6. **Logout**: Clean session termination

## Demo Credentials

For development/testing:
- Admin: `admin` / `admin123`
- User: `user` / `user123`

Remove these before production deployment.

## Component Architecture

```
AuthProvider (Context)
├── App (Main routing logic)
├── Navigation (Auth-aware navigation)
├── LoginForm (Authentication form)
├── RegisterForm (User registration)
├── Dashboard (User profile & info)
├── AdminPanel (Role-protected admin interface)
└── AuthGuards (HOCs for access control)
    ├── RequireAuth
    ├── RequireRole  
    ├── RequireAdmin
    ├── RequireModerator
    ├── RequireAnalyst
    └── RequireDeveloper
```

This architecture provides a solid foundation for secure, role-based authentication throughout the SDLC Core system.