# Smart Library Management System

A modern full-stack library management application for college use, built with React, React Router, Express, and MongoDB-ready APIs. The project includes public browsing, student flows, and admin management tools.

## Features

- Attractive landing page with hero section and stats
- Book catalog with search, category filtering, and sorting
- Student login and registration flow
- Borrow and return tracking
- Fine and overdue visibility
- Admin dashboard with summary cards and management views
- Responsive, animated UI built with Framer Motion and Lucide icons
- Mock-data fallback mode when MongoDB is not available

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Framer Motion, Lucide React
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose (supports fallback mock mode)

## Demo Credentials

- Admin: admin@library.com / Admin@123
- Student: student@library.com / Student@123

## Running the Project

1. Install dependencies:
   npm install
   npm install --prefix server
   npm install --prefix client

2. Start both apps in development mode:
   npm run dev

3. Or run them separately:
   npm run server
   npm run client

## Mock Mode

If MongoDB is not configured or unavailable, the backend automatically switches to a mock-data mode for demonstration purposes. This lets the app remain usable without a local database.

## Project Structure

- client/: React frontend
- server/: Express backend and API routes
- README.md: project overview and setup instructions

## Notes

This project is intended as a college project/demo library system and is designed to be easy to extend for coursework, assignments, or presentations.
