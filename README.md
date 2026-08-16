<div align="center">
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express JS" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node JS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <br>
  <img src="https://img.shields.io/badge/Render-%2346E3B7.svg?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
  <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
  <br><br>
  <img src="https://img.shields.io/badge/Status-Production_Ready-brightgreen?style=for-the-badge" alt="Status Live" />
  <img src="https://img.shields.io/badge/Rating-Enterprise_Grade-gold?style=for-the-badge" alt="Enterprise Grade" />

  <h1>🎓 RDMP Student Portal (College Management System)</h1>
  <p>A comprehensive, full-stack Academic Management Solution designed to streamline hierarchical college operations across Admins, Teachers, and Students securely.</p>

  | Deployment Tier | Server | Details & Architecture | Live Link |
  | :--- | :--- | :--- | :--- |
  | 🌐 **Frontend UI** | Vercel | React 19 (Vite) SPA enforcing dynamic RBAC routing, Context API auth, and responsive Tailwind dashboards. | [View Live Frontend →](https://rdmp-student-portal.vercel.app) |
  | ⚡ **Backend API** | Render | Node.js Express REST API managing 19 endpoints with JWT security, Rate Limiting, and CORS policies. | [View API Endpoint →](https://rdmp-student-portal.onrender.com) |
  | 🗄️ **Database** | MongoDB Atlas | Cloud NoSQL cluster utilizing strict Mongoose schema validation and robust ObjectID relational binding. | *[Private Cluster (Secured)]* |
</div>

<hr/>

## 📖 Overview

The **RDMP Student Portal** is a scalable, cloud-deployed Enterprise Resource Planning (ERP) application built specifically for modern educational institutions. It digitizes paper-pen processes into a robust digital ecosystem, allowing seamless tracking of attendance, marks, leaves, library transactions, and student fees in real-time. 

Developed with a strong emphasis on **Data Integrity**, **Role-Based Access Control (RBAC)**, and **UI/UX precision**, this product serves as a testament to efficient team collaboration and industry-standard software architecture.

## 👥 The Team & Roles

This project was developed collaboratively by a two-person engineering team, demonstrating robust Git version control, parallel feature delivery, and strict separation of concerns (Frontend Client vs. Backend API mapping).

| Role | Developer Name | Technical Responsibilities & Core Contributions |
| :--- | :--- | :--- |
| **Backend Engineer & QA** | **Kasim Shah** | 🔹 **Architectural Design:** Engineered robust, highly normalized MongoDB schemas with optimized relationships and aggregate pipelines.<br>🔹 **API & Business Logic:** Developed 20+ secure RESTful endpoints mapping complex business logic to dedicated routing controllers.<br>🔹 **Enterprise Security:** Fortified the backend infrastructure with stateless JWT authentication, Helmet headers, CORS policies, and global Express Rate Limiting.<br>🔹 **QA & Cloud Deployment:** Handled exhaustive E2E Postman API testing, automated database seeders, and managed a flawless CI/CD pipeline to Render. |
| **Frontend Engineer & UI/UX** | **Sohel Shaikh** | 🔹 **System Design:** Spearheaded the React 19 (Vite) Single Page Application (SPA) architecture, prioritizing modular design and component reusability.<br>🔹 **User Experience (UX):** Crafted highly responsive, aesthetically premium dashboards utilizing modern TailwindCSS utility grids and dynamic state styling.<br>🔹 **State Management:** Centralized the application's global secure state via Context API and managed protected React Router navigation (RBAC).<br>🔹 **Integration & Deployment:** Implemented resilient Axios HTTP instances with automatic request/response interceptors for token refreshing, deploying efficiently to Vercel. |

## 🚀 Key Features by Role

### 👨‍💼 1. Administrator Dashboard (Superuser)
- **Centralized Entity Management:** Engineered dynamic CRUD interfaces for managing Students, Teachers, and Divisions, bound securely to underlying MongoDB document collections.
- **Institutional Broadcasting:** Built an automated Notice Board system for institute-wide announcements, circulars, and document distribution.
- **Data-Driven Insights:** Developed interactive statistical widgets powered by complex MongoDB Aggregation Pipelines to visualize college capacity, financial invoices, and global attendance metrics.

### 👨‍🏫 2. Teacher Dashboard (Faculty)
- **Dynamic Attendance Registry:** Architected a highly performant, real-time bulk attendance system featuring visual absence mapping and automated percentage calculations.
- **Comprehensive Grading Engine:** Delivered a structured marks entry and submission portal supporting multi-term validation logic (Mid-term, Final exams).
- **Division Autonomy:** Integrated hierarchical authorization, granting assigned teachers sovereign control over their division's timetables and the ability to instantly approve/reject student leave applications.

### 👨‍🎓 3. Student Portal (Self-Service)
- **Real-Time Academic Transparency:** Implemented seamless Read-Only access endpoints allowing students to securely track personal daily timetables, exam schedules, and graded subject reports.
- **Automated Grievance & Leave Systems:** Created streamlined POST pipelines for students to independently apply for sick leaves and submit structured feedback directly to administrators.
- **Financial tracking & Library Index:** Integrated dynamic tracking systems for real-time monitoring of outstanding fee invoices, payment deadlines, and authenticated library book transactions.

## 🛠 Tech Stack

### 🖥 Backend Architecture (Node.js ecosystem)
| Architectural Layer | Core Technologies | Implementation Details |
| :--- | :--- | :--- |
| **Runtime & Framework** | Node.js, Express.js | High-performance, non-blocking asynchronous event-driven server runtime. |
| **Database & ODM** | MongoDB Atlas, Mongoose | Cloud-hosted NoSQL with strict schema validation, pre-save hooks, and complex aggregate pipelines. |
| **Security & Auth**| bcryptjs, JWT, Helmet, Rate-Limit | Multi-layered security: password hashing, stateless tokens, header fortification, and DDOS protection. |
| **File Handling** | Multer, PDF-Lib | Secure multi-part form data parsing and dynamic server-side PDF document generation. |

### 🎨 Frontend Architecture (React ecosystem)
| Architectural Layer | Core Technologies | Implementation Details |
| :--- | :--- | :--- |
| **Core Framework** | React 19, Vite | Lightning-fast HMR, highly modular component architecture, and optimized production builds. |
| **Styling & UI** | TailwindCSS v4 | Utility-first CSS for pixel-perfect, highly responsive, and accessible dashboard layouts. |
| **State Management**| Context API, React Hooks | Centralized global auth state management bridging deeply nested component trees securely. |
| **Routing & Http** | React Router DOM v7, Axios | Robust client-side routing with exact Role-Based Access Control (RBAC) and token interceptors. |
| **Data Visualization**| Recharts, Lucide React | Interactive, responsive SVG graphing for analytics and lightweight, consistent iconography. |

## ⚙️ System Workflow & Security Measures
To showcase a truly enterprise-ready posture, several critical full-stack architectural paradigms and security measures are strictly enforced across the application lifecycle:

1. 🔒 **Advanced Relational Data Modeling (MongoDB):** 
   Utilizes strict `mongoose.Schema.Types.ObjectId` referencing and complex aggregation pipelines to build dynamic relationships between models. For instance, `LibraryTransaction`, `LeaveApplication`, and `FeeInvoice` are safely bound to the core `Student` profile, ensuring zero orphaned records.

2. 🛡️ **Zero-Trust Double-Layer Validation:** 
   Client-side sanitized strings are never trusted implicitly. Inputs undergo rigorous secondary schema validation on the Node.js boundary, utilizing built-in Mongoose validators and secure pre-save lifecycle hooks (e.g., dynamic password salting & hashing via `bcryptjs`).

3. 🚦 **Global Graceful Error Catching & Rate Limiting:** 
   Custom centralized Error Handling middleware intercepts fatal database crashes, CastErrors, and API edge cases, serving scrubbed contextual JSON payloads rather than crashing the Express runtime. Furthermore, `express-rate-limit` prevents brute-force polling globally.

4. 🔄 **Silent Token Interceptors & Session Management:** 
   The frontend `api.js` Axios instance operates as a silent sentry. It intercepts HTTP `401 Unauthorized` and `403 Forbidden` response codes across all components globally, purging stale context state and triggering automatic secure logout procedures to guarantee deterministic session lifecycles.

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