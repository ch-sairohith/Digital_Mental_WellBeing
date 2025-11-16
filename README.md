# MindEase Campus

A comprehensive digital mental wellness platform designed specifically for college students, providing AI-powered support, professional counseling services, and evidence-based resources.

## Overview

MindEase Campus is a full-stack web application that addresses the mental health needs of students through an integrated platform featuring AI chat assistance, mood tracking, resource library, counseling booking, and interactive wellness tools.

## Features

### Core Functionality
- **AI Chat Assistant**: 24/7 confidential mental health support powered by advanced AI
- **Mood Tracking & Analytics**: Daily mood logging with visual trend analysis and insights
- **Resource Library**: Curated articles, videos, and audio guides on mental wellness topics
- **Professional Counseling**: Book and manage sessions with licensed counselors
- **Interactive Tools**: Games, creative tools (doodle, mandala, kaleidoscope), and relaxation exercises
- **Peer Support Forum**: Anonymous community support and discussion topics

### User Experience
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dark/Light Theme**: User preference-based theme switching
- **Dynamic Animations**: Smooth scroll animations and interactive UI elements
- **Real-time Updates**: Live notifications and activity tracking

## Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Radix UI** components

### Backend
- **Express.js** server
- **Firebase** for authentication and database
- **Google Generative AI** for chat functionality



## Architecture

The application follows a modular architecture with clear separation of concerns:

- **Client**: React-based frontend with component-based architecture
- **Server**: Express.js API with RESTful endpoints
- **Database**: Firebase Firestore for real-time data and PostgreSQL for structured data
- **Authentication**: Firebase Authentication with role-based access control
- **Storage**: Firebase Storage for media files

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/      # Route pages
│   │   ├── hooks/      # Custom React hooks
│   │   └── lib/        # Utilities and configurations
├── server/             # Backend Express server
│   ├── routes.ts       # API route definitions
│   └── index.ts        # Server entry point
└── shared/             # Shared types and schemas
```

## Key Components

- **Header**: Navigation with user profile dropdown and theme toggle
- **ChatBot**: Floating AI assistant with message history
- **Dashboard**: Personalized analytics and activity overview
- **ResourceView**: Interactive document viewer with share, save, and PDF export
- **MoodLogger**: Daily mood tracking with emotion recognition
- **Booking System**: Counselor scheduling and session management

## Security & Privacy

- Anonymous peer support options
- Role-based access control (Student, Counselor, Institute)
- Secure authentication with Firebase

## Performance

- Optimized bundle size with code splitting
- Lazy loading for routes and components
- Efficient state management with React Query
- Responsive image handling
- Smooth 60fps animations

## Accessibility

- WCAG 2.1 compliant components
- Keyboard navigation support
- Screen reader compatibility
- High contrast theme options
- Focus management

## Development

Built with modern web development practices including TypeScript for type safety, ESLint for code quality, and comprehensive error handling throughout the application.
