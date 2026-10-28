# FoodieHub – Online Food Ordering System
**Final-Year B.Tech Computer Science and Engineering Full-Stack Project**

## 1. Project Overview
FoodieHub is a full-stack online food ordering system built with **React.js, Bootstrap 5, Node.js, Express.js, MySQL, JWT Authentication, and Axios**.

## 2. Directory Structure
```
FoodieHub-BTech-Project/
├── frontend/                 # React.js + Vite + Bootstrap 5 Customer Portal
│   ├── src/
│   │   ├── services/api.js   # Axios instance with JWT Bearer interceptor
│   │   ├── App.jsx           # Complete UI (Home, Menu, Restaurants, Cart, Checkout, Live Tracking)
│   │   └── main.jsx          # React DOM entry point
│   ├── index.html            # HTML5 template with Bootstrap 5
│   └── package.json
├── backend/                  # Node.js + Express.js REST API
│   ├── config/db.js          # MySQL2 connection pool
│   ├── middleware/authMiddleware.js # JWT verification middleware
│   ├── server.js             # Express API routes (Auth, Restaurants, Menu, Orders)
│   ├── .env.example          # Environment variables template
│   └── package.json
├── database/
│   └── schema.sql            # MySQL 8.0 tables + sample Indian restaurants & dishes seed data
└── render.yaml               # One-click Render Cloud Deployment Blueprint
```

## 3. Local Setup Instructions

### Step 1: Database Setup (MySQL)
1. Open MySQL Workbench or terminal and run:
   ```sql
   SOURCE database/schema.sql;
   ```

### Step 2: Backend Setup (Node.js & Express)
1. Open a terminal in the `backend` folder:
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
   The API will start at `http://localhost:5000`.

### Step 3: Frontend Setup (React.js)
1. Open a new terminal in the `frontend` folder:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## 4. Cloud Deployment Guide (GitHub + Render)
1. Push this entire folder to a new **GitHub repository**.
2. Log in to **Render.com** -> Click **New +** -> Select **Blueprint**.
3. Connect your GitHub repository. Render will automatically detect `render.yaml` and deploy both `foodiehub-frontend` and `foodiehub-backend`!
