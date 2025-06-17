# EduAdvisor AI

A personalized, AI-powered learning roadmap generator.

## 📺 Video Presentation

🎥 [Watch the full video on YouTube](https://www.youtube.com/watch?v=-eRjUZ9hBkQ)

---

## ❗ The Problem

In the age of information abundance, aspiring learners often face a paradox of choice. With countless online courses, tutorials, and articles available, it's easy to feel overwhelmed and unsure of where to start, what to learn next, or which resources are credible. This lack of a clear, structured path leads to *analysis paralysis*, hindering progress and demotivating learners.

---

## ✅ The Solution: EduAdvisor AI

**EduAdvisor AI** eliminates the unstructured nature of self-learning by acting as a personal academic advisor. It generates customized, step-by-step learning roadmaps for any desired skill or subject area.

Users simply specify their learning objective and current experience level. The AI then uses a powerful **Retrieval-Augmented Generation (RAG)** system to generate a logical, sequential learning path, ensuring the recommendations are based on a curated, high-quality knowledge base.

✔️ Stay focused  
✔️ Track your progress  
✔️ Reach your learning goals efficiently

---

## ✨ Features

- 🔒 **Secure User Authentication** – Login/Signup with JWT (access + refresh tokens)
- 🧠 **AI-Powered Roadmap Generation** – Personalized learning roadmaps for any topic
- 🎛 **Customizable Learning Paths** – Adjust by experience level and learning style
- 📚 **Retrieval-Augmented Generation (RAG)** – Verifiable, high-quality recommendations
- 📂 **Dashboard** – Manage and delete all your saved roadmaps in one place
- 🖥 **Modern UI** – Responsive, clean interface for desktop & mobile

---

## ⚙️ Tech Stack

### 🔸 Frontend
- **Angular (v20)** – SPA framework
- **TypeScript** – Strict type safety
- **Angular Signals** – Fine-grained state management
- **Angular Material** – Pre-built UI components
- **RxJS** – Async streams handling
- **Zoneless** – Configured without Zone.js for optimal performance

### 🔸 Backend
- **Node.js** – Server runtime
- **Express.js** – REST API framework
- **TypeScript** – Type-safe code
- **MongoDB Atlas** – Cloud NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication

### 🔸 AI & DevOps
- **OpenAI API** – GPT-powered language model (gpt-4o-mini)
- **RAG Architecture** – Enhanced with:
  - **Vector Embeddings**: OpenAI `text-embedding-3-small`
  - **MongoDB Vector Search**
- **Git & GitHub** – Version control

---

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js (v18 or later)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB Atlas connection string
- OpenAI API key

### 📂 Installation

1️⃣ Clone the repository:

```bash
git clone <your-repo-link>
cd edu-advisor-ai

2️⃣ Setup the Backend:
cd backend
npm install

➡️ Create .env in the backend root:
MONGO_URI=your_mongodb_atlas_connection_string
SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key

➡️ Seed the RAG knowledge base:
npx ts-node src/data/create_embeddings.ts

➡️ Setup the Vector Search Index for the learningresources collection (MongoDB Atlas → Search Indexes)

➡️ Start the backend server:
npm run dev

3️⃣ Setup the Frontend:
cd ../frontend
npm install
ng serve
Open: http://localhost:4200

👨‍💻 Developed By
Rustem Garryyev