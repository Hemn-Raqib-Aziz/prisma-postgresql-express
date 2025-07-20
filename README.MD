# 📦 Prisma + PostgreSQL + Express API Demo

This is a backend demo project using:

* 🧹 **Prisma ORM** – modern and type-safe database toolkit
* 🐘 **PostgreSQL** – relational database hosted via [Aiven](https://console.aiven.io/)
* 🚀 **Express.js** – minimalist Node.js web framework (using ES Modules)
* 🖥️ **pgAdmin** – GUI tool to manage PostgreSQL visually

---

## 🧰 Project Structure

```
☑️ routes/         # Express route definitions
☑️ controllers/    # Logic to handle API routes
☑️ prisma/         
   └── schema.prisma     # DB schema and models
   └── migrations/      # Prisma migrations (auto-created)
☑️ generated/      # Prisma-generated client files
☑️ explain.txt     # Notes and command references
```

---

## ✨ Features

* Full CRUD operations for:

  * 📂 **Categories**
  * 📦 **Products** (associated with categories)
* Integration with PostgreSQL hosted on **Aiven**
* Clean project structure with modular routing and controllers
* Uses **Prisma Studio** for visual DB inspection

---

## 🚀 Getting Started (Local Setup)

### 1. 📅 Clone the Repository

```bash
git clone https://github.com/Hemn-Raqib-Aziz/prisma-postgresql-express.git
cd prisma-postgresql-express
```

### 2. ⚙️ Set Up `.env` File

Create a `.env` file in the root folder with the following:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?sslmode=require
```

You can get these credentials by creating a PostgreSQL service via Aiven and opening the connection info.

Aiven provides:

* `SERVICE_URI`
* `DATABASE_NAME`
* `HOST`
* `PORT`
* `USER`
* `PASSWORD`
* `SSL_MODE`
* `CONNECTION_LIMIT`
* `CA_CERTIFICATE`

> 🔐 **Do NOT** upload your `.env` or any secret keys to GitHub.

---

### 3. 🛠️ Initialize Prisma

Install dependencies:

```bash
npm install
```

If not already initialized, run:

```bash
npx prisma init
```

Then define your models inside `prisma/schema.prisma`.

To create database tables:

```bash
npx prisma migrate dev --name initial_migration
```

Regenerate Prisma client:

```bash
npx prisma generate
```

Launch Prisma Studio GUI:

```bash
npx prisma studio
```

---

## 🦚 Sample Prisma Workflow 

```bash
# Step 1: Edit schema.prisma to define models

# Step 2: Apply DB changes
npx prisma migrate dev --name meaningful_name

# Step 3: Generate Prisma Client
npx prisma generate

# Optional: Visual DB interface
npx prisma studio
```

---

## 💡 Notes

* This project uses **ES Modules** (`type: "module"` in `package.json`)
* Uses **pgAdmin** (desktop app) with **Aiven** secrets to create/manage the PostgreSQL database
* Make sure your PostgreSQL server (e.g., Aiven) allows SSL connections
* Use either **pgAdmin** or **Prisma Studio** to inspect and manage your data

---

Built with ❤️ by [Hemn Raqib Aziz](https://github.com/Hemn-Raqib-Aziz)
