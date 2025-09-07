# Frontend Summary - Nexa Project

## Overview
This frontend is a modern React application built with Vite, designed for user authentication in the Nexa virtual assistant platform. It features a sleek glassmorphism UI design and integrates seamlessly with the backend API for user registration and login functionality.

## Project Structure
- **src/main.jsx**: Entry point that sets up React with routing and context providers.
- **src/App.jsx**: Main component defining application routes.
- **src/context/UserContext.jsx**: Context provider for sharing server URL across components.
- **src/pages/SignUp.jsx**: User registration page component.
- **src/pages/SignIn.jsx**: User login page component.
- **src/index.css**: Global styles importing Tailwind CSS.
- **src/assets/**: Contains background image and icons for the UI.

## Technologies Used
- **React 19**: Latest version of React for building the user interface.
- **Vite**: Fast build tool and development server.
- **React Router DOM**: For client-side routing between pages.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests to the backend.
- **React Icons**: Icon library for UI elements like password visibility toggles.

## Key Features

### User Authentication
- **Sign Up Page**: Allows new users to create accounts with name, email, and password.
- **Sign In Page**: Enables existing users to log into their accounts.
- Both pages include form validation, error handling, and loading states.

### UI/UX Design
- **Glassmorphism Effect**: Semi-transparent forms with backdrop blur for a modern look.
- **Background Image**: Full-screen background image for visual appeal.
- **Password Visibility Toggle**: Interactive icons to show/hide password input.
- **Responsive Design**: Forms adapt to different screen sizes with max-width constraints.
- **Smooth Transitions**: Hover effects and transitions for better user experience.

### API Integration
- Uses Axios to communicate with the backend API endpoints.
- Sends POST requests to `/api/auth/signup` and `/api/auth/signin`.
- Includes `withCredentials: true` for cookie-based authentication.
- Handles API responses and errors gracefully.

## Component Details

### Main Entry (main.jsx)
- Wraps the app with `BrowserRouter` for routing.
- Provides `UserContext` to share the server URL (`http://localhost:8000`).
- Renders the `App` component in StrictMode.

### App Component (App.jsx)
- Defines routes for `/signin` and `/signup` pages.
- Uses React Router's `Routes` and `Route` components.

### UserContext (UserContext.jsx)
- Creates a context for sharing the backend server URL.
- Provides the URL as `serverUrl` to child components.

### SignUp Page (SignUp.jsx)
- Form with inputs for name, email, and password.
- Password field with show/hide toggle using eye icons.
- Submits data to backend signup endpoint.
- Displays error messages if registration fails.
- Redirects to sign-in page on successful registration.
- Includes link to navigate to sign-in page.

### SignIn Page (SignIn.jsx)
- Form with inputs for email and password.
- Similar password toggle functionality.
- Submits data to backend signin endpoint.
- Displays error messages for login failures.
- Includes link to navigate to sign-up page.

## Styling Approach
- **Tailwind CSS Classes**: Extensive use of utility classes for layout, colors, and effects.
- **Custom Colors**: Uses white, sky blue, and transparent backgrounds.
- **Typography**: Clean, readable fonts with appropriate sizes.
- **Spacing**: Consistent padding and margins using Tailwind's spacing scale.
- **Shadows and Effects**: Box shadows and backdrop blur for depth.

## Summary
The frontend provides a polished, user-friendly interface for the Nexa virtual assistant authentication system. It demonstrates modern React development practices with clean component architecture, effective state management, and seamless API integration. The glassmorphism design creates an engaging visual experience while maintaining functionality and accessibility.
