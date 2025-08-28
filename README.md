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
- react-router-dom for navigation
- react-toastify for notifications
- framer-motion for animations
- Tailwind CSS for styling

### Backend
- Node.js and Express for server
- MongoDB with Mongoose for database
- JWT for authentication
- bcrypt.js for password hashing
- RESTful API architecture
- Environment variables with dotenv
- CORS for cross-origin resource sharing

## Project Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Clone Repository
```
git clone https://github.com/R-Tharanka/react-todo.git
cd react-todo
```

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
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:3000
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

3. Create a `.env` file in the root of the frontend directory (optional):
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```
   npm start
   ```
   The app will open in your browser at http://localhost:3000

## Available Scripts

### Backend Scripts
- `npm start`: Run the server in production mode
- `npm run dev`: Run the server in development mode with nodemon (auto-restart on file changes)
- `npm test`: Run tests (not implemented yet)

### Frontend Scripts
- `npm start`: Start the development server
- `npm run dev`: Start the development server with nodemon for auto-reload
- `npm run build`: Build the app for production
- `npm test`: Run tests
- `npm run eject`: Eject from create-react-app (not recommended)

## API Configuration Details

The API is configured with the following features:

### Base URL
```
http://localhost:5000/api
```

### Authentication
All endpoints are secured with JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

### Environment Variables
- **Backend**
  - `MONGO_URI`: MongoDB connection string
  - `PORT`: Server port (default: 5000)
  - `JWT_SECRET`: Secret key for JWT signing
  - `CORS_ORIGIN`: Allowed origins for CORS (comma-separated)

- **Frontend**
  - `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000)

### API Endpoints

#### User Endpoints
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Authenticate a user
- `GET /api/users/profile`: Get user profile information

#### Task Endpoints
- `GET /api/tasks`: Fetch all tasks with filtering and sorting options
  - Query parameters:
    - `filter`: Filter by status (completed, active, today, upcoming, overdue, all)
    - `sort`: Sort by criteria (newest, oldest, dueDate, priority, az)
- `GET /api/tasks/:id`: Fetch a single task by ID
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update an existing task
- `PATCH /api/tasks/:id/toggle`: Toggle task completion status
- `DELETE /api/tasks/:id`: Delete a task

## Design Decisions and Assumptions

- **Authentication System**: Implemented JWT-based authentication for secure access to task data
- **Theme Implementation**: Purple gradient background with dark card container as specified in requirements
- **State Management**: Chose Context API over Redux for simpler state management and better integration with React hooks
- **Modular Architecture**: Separated concerns into components, contexts, pages, and utility functions
- **Backend Structure**: Organized with MVC pattern (models, controllers, routes)
- **Security**: Implemented proper password hashing and JWT authentication
- **API Design**: RESTful API with clear resource endpoints and consistent response formats
- **Error Handling**: Comprehensive error handling on both frontend and backend
- **Responsiveness**: Mobile-first design approach with Tailwind CSS
- **Persistence Strategy**: Dual persistence with MongoDB for server storage and local storage for offline functionality
- **Accessibility**: Focus on keyboard navigation and screen reader support

## Known Limitations and Areas for Improvement

- **Testing**: Need to implement unit, integration, and end-to-end tests
- **Performance Optimization**:
  - Implement pagination for large task lists
  - Add caching strategies for frequently accessed data
- **Feature Enhancements**:
  - Add recurring tasks functionality
  - Implement collaborative task sharing
  - Add email notifications for upcoming due dates
  - Develop task statistics and reporting features
- **Security Improvements**:
  - Implement rate limiting
  - Add CSRF protection
  - Enhance input validation
- **User Experience**:
  - Add onboarding tutorial for new users
  - Implement offline mode with better synchronization
  - Add more customization options for task categories
- **Deployment**:
  - Set up CI/CD pipeline
  - Add containerization with Docker
  - Configure production-ready server settings

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/R-Tharanka/react-todo/blob/0e531dc9e6d604f76ed78f924ccb77549848be92/LICENSE) file for details
