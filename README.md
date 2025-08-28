# Todo App

A full-stack Todo App built with React, Node.js, Express, and MongoDB. This project demonstrates modern front-end and back-end practices, state management, API integration, and responsive design.

## Features

- **Add, Edit, Delete Tasks**: Full CRUD operations with real-time updates
- **Task Status Management**: Mark tasks as completed/incomplete with visual feedback
- **Task Metadata**: Add due dates, priorities, and categories to tasks
- **Search & Filter**: Find specific tasks or filter by status, priority, or date
- **Bulk Actions**: Select multiple tasks for batch operations
- **Drag & Drop**: Reorder tasks with intuitive drag and drop functionality
- **Dark/Light Mode**: Choose your preferred theme with system detection
- **Persistence**: Tasks persist between browser sessions with database and local storage backup
- **Responsive Design**: Optimized for desktop, tablet and mobile devices
- **Error Handling & Loading States**: Comprehensive user feedback for all operations
- **Productivity Tips**: Carousel of productivity enhancement suggestions

## Tech Stack

### Frontend
- React with functional components and Hooks
- Context API for state management
- react-beautiful-dnd for drag and drop functionality
- Axios for API calls
- react-icons for UI icons
- Custom CSS for styling

### Backend
- Node.js and Express for server
- MongoDB with Mongoose for database
- RESTful API architecture
- Environment variables with dotenv

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/todo_app
   PORT=5000
   ```
   Note: Replace the MONGO_URI with your own MongoDB connection string if using MongoDB Atlas

4. Start the server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The app will open in your browser at http://localhost:3000

## API Endpoints

- `GET /api/tasks`: Fetch all tasks
- `GET /api/tasks/:id`: Fetch a single task by ID
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update an existing task
- `PATCH /api/tasks/:id/toggle`: Toggle task completion status
- `DELETE /api/tasks/:id`: Delete a task

## Design Decisions

- **Theme**: Purple gradient background with dark card container as specified in the requirements
- **State Management**: Context API for cleaner code and better state sharing
- **Backend**: Custom Express backend for full control over the API
- **Dual Persistence**: Using both localStorage and MongoDB for resilience
- **Error Handling**: Comprehensive error handling for all API calls
- **Accessibility**: Focus on keyboard navigation and screen reader support

## Areas for Improvement

- Add unit and integration tests
- Implement user authentication
- Add task categories or tags
- Implement task deadlines with notifications
- Add data export/import functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details