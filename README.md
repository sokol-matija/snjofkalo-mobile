# Snjofkalo Mobile App

A React Native mobile application with authentication and navigation features.

## Project Structure

- `/app`: Main application code
  - `/screens`: Screen components (Login, Register, Home)
  - `/navigation`: Navigation configuration
  - `/context`: App-wide contexts (Authentication)
  - `/api`: API client and backend integration

## Features

- User authentication (Login/Register)
- Navigation between screens
- Placeholder home screen with sections for future content
- Backend integration with token-based authentication
- Form validation and error handling
- Loading states for API operations

## JIRA Tasks Completed

- SCRUM-89: Install and configure navigation package
- SCRUM-90: Define routes/screens
- SCRUM-91: Hook up navigation between login and register
- SCRUM-92: Add placeholder for home screen

## Installation

```bash
# Clone the repository
git clone <repository_url>
cd snjofkalo-mobile

# Install dependencies
npm install

# Update API configuration
# Edit app/api/client.js and set your backend URL

# Run the app
npm start
```

## Development

This project uses:
- React Navigation for screen navigation
- React Context for state management
- AsyncStorage for token persistence
- Fetch API for backend communication

### Backend Integration

The app is designed to work with a RESTful API backend. The main API endpoints used are:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/validate` - Token validation
- `POST /auth/logout` - User logout

To configure your backend URL, update the `apiUrl` variable in `app/api/client.js`.
