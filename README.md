EduAdvisor AI
A personalized, AI-powered learning roadmap generator.

Video Presentation
Watch the full video presentation on YouTube

The Problem
In the age of information abundance, aspiring learners often face a paradox of choice. With countless online courses, tutorials, and articles available, it's easy to feel overwhelmed and unsure of where to start, what to learn next, or which resources are credible. This lack of a clear, structured path leads to "analysis paralysis," hindering progress and demotivating learners.

The Solution: EduAdvisor AI
EduAdvisor AI eliminates the unstructured nature of self-learning by acting as a personal academic advisor. It guides users by creating customized, step-by-step learning roadmaps for any desired skill or subject area.

Users simply specify their learning objective and current experience level. The AI then leverages a powerful Retrieval-Augmented Generation (RAG) system to generate a logical, sequential learning path, ensuring the recommendations are based on a curated, high-quality knowledge base. This allows users to stay focused, track their progress, and achieve their learning goals efficiently.

Features
Secure User Authentication: Full login/signup system using JSON Web Tokens (JWT) with access and refresh tokens.

AI-Powered Roadmap Generation: Create personalized learning roadmaps for any topic.

Customizable Learning Paths: Specify your experience level and preferred learning style to tailor the AI's recommendations.

Retrieval-Augmented Generation (RAG): The AI's advice is grounded in a verifiable knowledge base, ensuring high-quality, accurate, and reliable learning steps.

Dashboard: View, manage, and delete all your saved roadmaps in one place.

Modern, Responsive UI: A clean and beautiful user interface built for any device.

Tech Stack
This project is a full-stack application built with a modern, strictly-typed technology stack, adhering to all MWA course requirements.

Frontend
Angular (v20): A leading framework for building dynamic single-page applications.

TypeScript: For strict type safety and a better developer experience.

Angular Signals: For modern, fine-grained state management.

Angular Material: For a high-quality, pre-built component library.

RxJS: For handling asynchronous operations like API calls.

Zoneless Application: Configured to run without Zone.js for more granular control.

Backend
Node.js: A fast, scalable JavaScript runtime for the server.

Express.js: A minimal and flexible web application framework for creating a robust REST API.

TypeScript: Ensuring type safety across the entire stack.

MongoDB Atlas: A cloud-based NoSQL database for storing user data, roadmaps, and the RAG knowledge base.

Mongoose: An elegant object data modeling (ODM) library for MongoDB and Node.js.

JSON Web Tokens (JWT): For securing all protected API routes and managing user sessions.

AI & DevOps
OpenAI API: Leveraging powerful language models like gpt-4o-mini.

Retrieval-Augmented Generation (RAG):

Vector Embeddings: Using OpenAI's text-embedding-3-small model.

Vector Search: Powered by MongoDB Atlas Vector Search for efficient, semantic searching of the knowledge base.

Git & GitHub: For version control.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

Angular CLI (npm install -g @angular/cli)

A MongoDB Atlas account and a connection string.

An OpenAI API key.

Installation
Clone the repository:

git clone <your-repo-link>
cd edu-advisor-ai

Setup the Backend:

Navigate to the backend folder: cd backend

Install NPM packages: npm install

Create a .env file in the backend root and add your environment variables:

MONGO_URI="your_mongodb_atlas_connection_string"
SECRET="your_jwt_secret_key"
OPENAI_API_KEY="your_openai_api_key"

(Important) Seed the RAG knowledge base. This will populate your database with data and vector embeddings.

npx ts-node src/scripts/seed.ts

(Important) Set up the Vector Search Index in your MongoDB Atlas UI for the learningresources collection as described in the course materials.

Start the backend server: npm run dev
The server will be running on http://localhost:3000

Setup the Frontend:

Open a new terminal and navigate to the frontend folder: cd frontend

Install NPM packages: npm install

Start the frontend development server: ng serve
The application will be running on http://localhost:4200

Project Structure
The repository is organized into two main folders: backend and frontend.

backend/: Contains the Node.js/Express application.

src/features/: Code is organized by feature (e.g., users, roadmaps) for scalability.

src/middleware/: Contains the JWT authentication middleware.

src/services/: Contains services like the AI Vector Search service.

src/scripts/: Contains one-off scripts, like the database seeder.

frontend/: Contains the Angular application.

src/app/pages/: Contains the main page components (e.g., login, dashboard).

src/app/layouts/: Contains layout components for consistent styling (e.g., main-layout).

src/app/services/: Contains services like AuthService and RoadmapService.

src/app/guards/: Contains route guards for protecting pages.

Developed By
Rustem Garryyev