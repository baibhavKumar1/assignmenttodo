# MERN Stack Project: Project Manager

## Overview

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) project management application. It allows users to create projects and manage todos within those projects. Additionally, users have the option to export their todos in Gist format and store them locally using local storage.

## Features

- **Project Creation**: Users can create new projects.
- **Todo Management**: Users can create, update, and delete todos within projects.
- **Export to Gist**: Users have the option to export todos to Gist format.
- **Local Storage**: Exported todos can be stored locally using browser's local storage.

## Technologies Used

- **Frontend**:
  - React.js
  - React- Redux
  - TAILWINDCSS
  - Axios (for API requests)
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)

## Installation

1. Clone the repository:
   ```bash
   git clone : https://github.com/xyz/assignmenttodo
   cd BE  |  cd FE
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
    FOR BE
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     ```
     PORT=<port-number>
     MONGODB_URI=<mongodb-uri>
     ```
     FOR FE
     ```
     VITE_BACKEND_URL=<>
     VITE_ACCESS_TOKEN=<Github token>
     ```
5. Start the development server:
   ```bash
   npm start  |  npm run dev
   ```

6. Access the application:
   Open your browser and navigate to `http://localhost:5173`.

## Usage

1. **Creating a Project**:
   - Click on the "Create Project" button.
   - Enter the project details and submit the form.

2. **Managing Todos**:
   - Within a project, click on the "Add Todo" button to create a new todo.
   - Click on a todo to edit or delete it.

3. **Exporting Todos**:
   - Click on the "Export Todos" button to export todos in Gist format.
   - You can then copy the Gist link and store it locally using local storage.

---
