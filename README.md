# 🗨️ Comment App Backend (NestJS + PostgreSQL + Prisma)

This is a fully functional backend for a comment-based application developed using NestJs. 
---

## 🚀 Getting Started

You have **two options** to run this backend:

---

## Option 1: Local Development Setup (Manual)

> 🛠 Recommended if you're actively developing and want hot-reload.

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/comment-app.git
cd comment-app
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Create a \`.env\` file

\`\`\`bash
cp .env.example .env
\`\`\`

Update your \`.env\` with the correct PostgreSQL connection string:

\`\`\`
DATABASE_URL=postgres://postgres:postgres@localhost:5432/comments
JWT_SECRET=your_jwt_secret
\`\`\`

### 4. Run PostgreSQL Locally (Manual)

\`\`\`bash
docker run --name comments-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=comments \
  -p 5432:5432 \
  -d postgres:15
\`\`\`

### 5. Run Prisma Migrations

\`\`\`bash
npx prisma migrate deploy
\`\`\`

### 6. Start the App

\`\`\`bash
npm run start:dev
\`\`\`

The backend will now be running at: http://localhost:3000

---

## Option 2: Dockerized Setup 🐳

> 🐳 Best for quick testing, consistent environments, or deployment.

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/comment-app.git
cd comment-app
\`\`\`

### 2. Create a \`.env\` file

\`\`\`bash
cp .env.example .env
\`\`\`

Update values if needed.

### 3. Build and Run the Containers

\`\`\`bash
docker compose up --build
\`\`\`

### 4. Test

Visit the app at: http://localhost:3000

> This will:  
> - Build the NestJS backend  
> - Start PostgreSQL with a named volume  
> - Apply Prisma migrations automatically  

---

## 📁 Project Structure

\`\`\`
.
├── src/                 # NestJS source code
├── prisma/              # Prisma schema and migrations
├── Dockerfile           # Docker image for the backend
├── docker-compose.yml   # Multi-container setup
├── .env.example         # Sample environment variables
\`\`\`

---

## ✅ Features Recap

- JWT authentication with \`@nestjs/jwt\`  
- Multi-level nested comments  
- Edit/delete comment time window logic  
- Soft-deleted comment restoration  
- Notification toggle for replies  
- Prisma ORM with PostgreSQL  
- Clean Docker + Docker Compose setup  

---

## 🧑‍💻 Maintained By

**Ashwin Kotiyal**  
GitHub: https://github.com/kotiyalashwin  
LinkedIn: https://linkedin.com/in/ashwin-kotiyal

---

