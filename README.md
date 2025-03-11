# Node.js Backend Service

## Project Overview

This project is a Node.js backend service designed to handle routing, controller logic, and database interactions for a web application. It includes robust error handling, token validation, and CRUD operations secured with JSON Web Tokens (JWT). Below is an outline of the project structure and the functionality of each component.

## Project Structure

### `server.js`

- **Description**: The entry point of the application. This file sets up initial routing and middleware, imports necessary libraries, and delegates further routing to the `Routes` directory.
- **Key Features**:
  - Initialization of middleware
  - Error handling setup
  - Route definitions

### Routes

Contains route definitions that handle incoming requests and direct them to the appropriate controllers.

- **Files**:
  - `contactRoutes.js`: Manages routes for contact-related operations.
  - `userRoutes.js`: Handles user-related functionalities such as authentication and user management.
- **Features**:
  - Use of asynchronous JavaScript (async/await) and promises for handling asynchronous operations.
  - Token validation to secure routes.

### Controllers

Responsible for processing incoming requests, performing operations via models, and sending responses back to the client.

- **Files**:
  - `contactController.js`: Controls the logic for contact management.
  - `userController.js`: Manages user interactions and validations.
- **Features**:
  - Manipulation of request and response objects.
  - Sending success and error responses.
  - Validation of tokens and user IDs to secure CRUD operations.

### Middleware

Modules that handle various preprocessing tasks on the requests before they reach the controllers.

- **Files**:
  - `errorHandler.js`: Centralized error handling module that interprets different status codes and structures error messages accordingly.
  - `validateTokenHandler.js`: Uses the `jsonwebtoken` library to generate and validate tokens based on the secret key.

### Models

Defines schemas for the database and provides an interface to interact with the MongoDB database.

- **Files**:
  - `contactModel.js`: Schema for contact-related data.
  - `userModel.js`: Schema for user data.

### Config

Configuration settings for connecting to external services like the MongoDB database.

- **Files**:
  - `dbConnection.js`: Configures and establishes a connection to MongoDB using connection strings from the MongoDB Atlas service and the Mongoose library.

### `.env`

- **Description**: Stores environment-specific variables in a secure and modular way.
- **Contents**:
  - Secret keys for JWT.
  - Database connection strings.
  - Application port.
