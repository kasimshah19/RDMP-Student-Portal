<div align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-blueviolet?style=for-the-badge&logo=mongodb" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Backend-success?style=for-the-badge&logo=nodedotjs" alt="Node JS" />
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge" alt="Status Live" />

  <h1>🎓 RDMP Student Portal (College Management System)</h1>
  <p>A comprehensive, full-stack Academic Management Solution designed to streamline hierarchical college operations across Admins, Teachers, and Students securely.</p>

  **[View Live Frontend (Vercel)](https://rdmp-student-portal.vercel.app)** &nbsp; • &nbsp; **[Backend API Endpoint (Render)](https://rdmp-student-portal.onrender.com)**
</div>

<hr/>

## 📖 Overview

The **RDMP Student Portal** is a scalable, cloud-deployed Enterprise Resource Planning (ERP) application built specifically for modern educational institutions. It digitizes paper-pen processes into a robust digital ecosystem, allowing seamless tracking of attendance, marks, leaves, library transactions, and student fees in real-time. 

Developed with a strong emphasis on **Data Integrity**, **Role-Based Access Control (RBAC)**, and **UI/UX precision**, this product serves as a testament to efficient team collaboration and industry-standard software architecture.

## 👥 The Team & Roles

This project was developed collaboratively by a two-person engineering team, demonstrating robust Git version control, parallel feature delivery, and strict separation of concerns (Frontend Client vs. Backend API mapping).

| Role | Developer Name | Key Responsibilities & Contributions |
| :--- | :--- | :--- |
| **Backend Engineer & QA** | **Kasim Shah** *(Me)* | 🔹 Designed the entire MongoDB schema & entity relationships.<br>🔹 Created 19 robust RESTful APIs with strict access policies.<br>🔹 Implemented JWT Auth, Security (Rate Limiting, Helmet).<br>🔹 Automated environment DB Seeders & E2E Testing.<br>🔹 Handled server CI/CD pipeline deployments (Render). |
| **Frontend Engineer & UI/UX** | **[Friend's Name]** | 🔹 Architected the React (Vite) interface and routing logic.<br>🔹 Designed responsive, fully accessible modular dashboards.<br>🔹 Consolidated React Context for Auth state management.<br>🔹 Handled Axios interceptors & UI side effects.<br>🔹 Managed client CI/CD pipeline deployments (Vercel). |

*(Note: Replace `[Friend's Name]` with the actual co-developer's name)*

## 🚀 Key Features by Role

### 👨‍💼 1. Administrator Dashboard
- **Entity Management:** Full CRUD authorization over Students, Teachers, and Classes.
- **Academic Control:** Global notice generation and file/document circulation.
- **Insights:** High-level statistical views of college capacity, financial reports, and ongoing examinations.

### 👨‍🏫 2. Teacher Dashboard
- **Attendance Registry:** Real-time bulk attendance marking with virtualized absence tracking.
- **Grading App:** Submission of academic scores across multiple terms (Mid, Final).
- **Division Authority:** Supervised control over assigned division's specific leave applications and timetable periods.

### 👨‍🎓 3. Student Portal
- **Academic Transparency:** Real-time checking of personal marks, exam timetables, and period schedules.
- **Self-Service:** Independent leave application portal and feedback/grievance submissions.
- **Financials & Library:** Track outstanding fee invoices, payment dues, and library book transactions.

## 🛠 Tech Stack

### 🖥 Backend Architecture (Node.js ecosystem)
| Area | Technologies Used |
| :--- | :--- |
| **Runtime & Framework** | Node.js, Express.js |
| **Database & ODM** | MongoDB Atlas, Mongoose |
| **Security & Auth**| bcryptjs, jsonwebtoken (JWT), Helmet, Express-Rate-Limit |
| **File Handling** | Multer, PDF-Lib |

### 🎨 Frontend Architecture (React ecosystem)
| Area | Technologies Used |
| :--- | :--- |
| **Core Framework** | React 19, Vite |
| **Styling** | TailwindCSS v4 |
| **State Management**| Context API, React Hooks |
| **Routing & Http** | React Router DOM v7, Axios |
| **UI Components** | Lucide React (Icons), Recharts (Graphing) |

## ⚙️ System Workflow & Security Measures
To showcase an enterprise-ready posture, several critical backend architectures were enforced:
1. **Model Relationality:** Utilizes strict `mongoose.Schema.Types.ObjectId` referencing between complex models (e.g., `LibraryTransaction`, `FeeInvoice`, `Timetable` all bound securely to the core `Student` profile).
2. **Double-Layer Validation:** Inputs are sanitized on the UI layer before being caught and strictly re-validated through Mongoose pre-save hooks (like password hashing via `bcrypt`).
3. **Graceful Error Catching:** Global Error Handling middleware uniformly intercepts database crashes or empty states and serves contextual JSON messages rather than crashing the Express runtime.
4. **Token Interceptor Fallbacks:** The `api.js` client acts as a silent sentry; intercepting `401 Unauthorized` codes and triggering automatic logout procedures, securing client sessions robustly.

## 🔑 Live Test Credentials

Recruiters and previewers can explore all three platform layers securely. All accounts share the same password password.

| Portal Access | Email Login | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@rdmpcollege.edu.in` | `Password@123` |
| **Teacher** | `teacher@rdmpcollege.edu.in` | `Password@123` |
| **Student** | `student@rdmpcollege.edu.in` | `Password@123` |

## 💻 Local Installation (For Developers)

To run this complex application locally, ensure you have **Node.js** and **MongoDB** installed.

```bash
# 1. Clone the repository
git clone https://github.com/kasimshah19/RDMP-Student-Portal.git
cd RDMP-Student-Portal

# 2. Setup standard ENVs in /server/.env 
MONGO_URI=your_cluster_url
JWT_SECRET=your_jwt_strong_key
PORT=5000

# 3. Setup client ENVs in /client/.env 
VITE_API_BASE_URL=http://localhost:5000/api

# 4. Install dependencies (Requires two CLI instances)
# Instance A (Backend)
cd server
npm install
npm start

# Instance B (Frontend)
cd client
npm install
npm run dev
```

---
> 💡 *This project was engineered to simulate true product environments. Every API call interacts directly with the database safely, avoiding typical static mock arrays, ensuring long-term software maintainability.*