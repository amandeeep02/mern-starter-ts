# MERN Starter with TypeScript

A modern full-stack starter template built with MongoDB, Express, React, and Node.js, all written in TypeScript for type safety and better developer experience.

## 🚀 Features

- **TypeScript** throughout the entire stack
- **React 19** with the latest hooks and patterns
- **Express 5** API backend
- **MongoDB** database with Mongoose
- **Firebase Authentication** integration
- **Tailwind v4 CSS** with dark/light mode support
- **ShadCN UI components** for a polished interface
- **Responsive design** with mobile-first approach
- **Framer Motion** for smooth animations
- **React Router v7** for client-side routing
- **Vite** for lightning-fast development and builds
- **Context API** for state management
- **Aurora background** component for beautiful visual effects
- **ESLint** configuration for clean code

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas connection)
- Firebase account for authentication

## 🛠️ Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/amandeeep02/mern-starter-ts.git
cd mern-starter-ts
```

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   REACT_APP_BASE_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm run start
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory with your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌓 Theme Support

This starter comes with built-in dark and light mode support. The theme is automatically detected based on your system preferences but can be toggled using the theme toggle button.

## 📱 Responsive Design

The UI is designed to work seamlessly across all device sizes, from mobile phones to large desktop monitors.

## 🔒 Authentication

Authentication is handled through Firebase with Google Sign-In integration. The project includes:
- Protected routes
- Authentication context
- User profile management

## 📁 Project Structure

```
mern-starter-ts/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── contexts/       # React contexts
│       ├── hooks/          # Custom hooks
│       ├── lib/            # Utility functions
│       ├── pages/          # Page components
│       └── router/         # React Router setup
│
└── server/                 # Express backend
    ├── src/
    │   ├── controllers/    # Route controllers
    │   ├── models/         # Mongoose models
    │   ├── routes/         # API routes
    │   └── App.ts          # Express app setup
    └── tsconfig.json       # TypeScript configuration
```

## 🧩 Available Commands

### Server

- `npm run start` - Start the server with nodemon
- `npm run build` - Build the server

### Client

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Lint the code

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Made with ❤️ by [Amandeep Singh](http://amandeep-singh.xyz)
