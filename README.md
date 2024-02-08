# Chingari Chatbot node js project with mongodb
# user-details
  {
    fullName: String,
    email: String,
    password: String,
    isDeleted: Boolean
  }

# message-details
  {
    text: String,
    sender: String,
    recipient: String,
    isDeleted: Boolean
  }

# Instructions to run the project
  1. Clone the project.
  2. Navigate to the src directory using cd src.
  3. Install dependencies with npm install.
  4. Set up environment variables (DATABASE_URL, JWT_PRIVATE_KEY).
  5. Start the server with npm run start.
  6. Open a web browser and navigate to localhost:3000.

# Functionality
  1. Create a user with email, fullName, and password.
  2. Login using email and password.
  3. Send messages to other users and view conversations with them.