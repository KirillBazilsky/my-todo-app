Overview
This documentation provides a step-by-step guide to running the My To-Do App project. The application is built with Next.js, Prisma, PostgreSQL, and Tailwind CSS. It supports authentication using NextAuth and includes automated testing with Jest.

Prerequisites
Before you begin, ensure the following tools are installed on your system:

Docker and Docker Compose
Node.js (v18 or higher)
npm (bundled with Node.js)

Environment Setup
Clone the Repository

bash

git clone <repository-url>
cd my-todo-app
Environment Variables
Create an .env file in the root directory and add the following values:

env

DATABASE_URL=postgresql://root:rootpassword@postgres:5432/mytodoapp?schema=public
NEXTAUTH_SECRET=12fdjgsdik902134nki122@dfjikd
NEXTAUTH_URL=http://localhost:3000
Modify these values as needed.

Running in Development Mode
Use the Development Docker Compose File
The docker-compose.development.yml file is optimized for local development, with hot-reloading enabled.

Run the following command:

bash

docker-compose -f docker-compose.development.yml up --build

This will:

Start a PostgreSQL container.
Start a Node.js container for the Next.js app in development mode.
Automatically apply Prisma migrations.
Access the App
Once the containers are running, open your browser and navigate to:

http://localhost:3000


Running in Production Mode
Use the Production Docker Compose File
The docker-compose.yml file is configured for production use, including Nginx for serving the application.

Run the following command:

bash

docker-compose up --build

This will:

Start a PostgreSQL container.
Build and start the Next.js app in production mode.
Serve the app using Nginx on port 80.
Access the App
Once the containers are running, open your browser and navigate to:

http://localhost


Running Tests
The project includes automated tests using Jest.

Run Tests Locally
Ensure all dependencies are installed by running:

bash

npm install

Then execute the tests:

bash

npm test
Run Tests in Docker

The nextjs container will automatically execute tests during startup. Ensure the docker-compose.development.yml file is used.

Stopping the Application
To stop the containers, run:

bash

docker-compose -f docker-compose.development.yml down
or

bash

docker-compose down


Cleaning Up
To remove all Docker resources associated with the app:

bash

docker-compose down -v
This will delete the containers, networks, and volumes.


Notes
Database Migrations
Prisma migrations are applied automatically during container startup. If you need to apply migrations manually:

bash

npx prisma migrate deploy

Static Files
Nginx serves static files from:

.next: Built Next.js files
public: Public assets (e.g., images)
For further assistance, refer to the official documentation of Next.js, Prisma, or Docker.