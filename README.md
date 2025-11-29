# 🎓 Student Result Management System

_A Mini-Project using React (Vite) + JSON Server_

A clean and efficient web-based system for managing student exam results. This project uses **React (Vite)** for the frontend and **JSON Server** as a lightweight backend/database.

---

##  Features

### Result Management
-  Add new results
-  Edit existing results
-  Delete results
-  Filter results by **student**, **subject**, or **section**

### Modal & Form Components
- Add / Edit Result Form
- Add / Edit Section Form
- Delete Confirmation Dialog

### JSON Server Database
- All records stored in `db.json`
- Automatically updates on CRUD operations
- Works like a REST API

---

##  Tech Stack

| Area        | Technology              |
| ----------- | ----------------------- |
| Frontend    | React (Vite)            |
| Styling     | CSS / Custom Components |
| Backend     | JSON Server             |
| HTTP Client | Fetch API / Axios       |

---

##  Folder Structure

```
Students_Result_Managment_System/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StudentAdd.jsx
│   │   └── Tab.jsx
│   ├── model/
│   │   ├── DeleteDialog.jsx
│   │   └── SectionForm.jsx
│   ├── pages/
│   │   ├── ResultTable.jsx
│   │   ├── SectionTable.jsx
│   │   └── StudentTable.jsx
│   ├── style/
│   │   ├── header.css
│   │   ├── student.css
│   │   ├── tab.css
│   │   ├── App.css
│   │   └── index.css
│   ├── App.jsx
│   ├── main.jsx
│   └── db.json
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

##  Prerequisites

Before running the project, make sure you have:

- ✅ Node.js installed
- ✅ npm installed
- ✅ JSON Server installed globally

### Install JSON Server

```bash
npm install -g json-server
```

---

## How to Run the Project

### Start the Frontend

1. Open terminal
2. Navigate to the project folder:

```bash
cd Students_Result_Managment_System
```

3. Install dependencies (if not already done):

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

The frontend will start on: **http://localhost:5173/**

(or whichever port Vite assigns)

### Start the Backend (JSON Server)

1. Open another terminal window
2. Navigate to the src folder:

```bash
cd Students_Result_Managment_System/src
```

3. Start JSON Server:

```bash
json-server --watch db.json
```

JSON Server will run on: **http://localhost:3000/**

---

## 🔌 API Endpoints

| Endpoint    | Purpose                     |
| ----------- | --------------------------- |
| `/results`  | Get/Add/Edit/Delete results |
| `/students` | Get/Add/Edit/Delete students|
| `/subjects` | Get/Add/Edit/Delete subjects|

---


- Ensure both frontend and backend servers are running simultaneously
- The JSON Server acts as a mock REST API for development
- All data is persisted in `src/db.json`

---
