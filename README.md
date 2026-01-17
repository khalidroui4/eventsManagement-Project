# 🌟 E-Gestion | Premium Event Management Platform

> **A modern, secure, and aesthetically pleasing platform for organizing and discovering events in Morocco.**

![Banner](https://via.placeholder.com/1200x400?text=E-Gestion+Premium+Platform)

## 📖 Overview

**E-Gestion** is a full-stack web application designed to simplify event management. Built with a robust **React** frontend and a secure **PHP/MySQL** backend, it offers a seamless experience for Users, Organizers, and Administrators.

The platform relies on a **Premium Dark/Gold Theme**, ensuring a high-end look and feel while maintaining accessibility and responsiveness across all devices.

---

## 🚀 Key Features

### 🎨 User Experience (UX/UI)
- **Premium Design:** Dark mode with elegant Gold (#F4C430) accents and glassmorphism effects.
- **Fully Responsive:** Optimized for specific mobile brakpoints (Events Grid, Profile Dashboard, Navbar).
- **Smooth Animations:** Powered by `framer-motion` for page transitions and interactive elements.
- **Custom 404 Page:** A stylish error page to guide lost users back home.

### 👤 User Roles & Capabilities

| **User** | **Organizer** | **Admin** |
| :--- | :--- | :--- |
| Browse & Search Events | **Create & Manage Events** | **Global Event Control** |
| Participate in Events | Edit/Delete Own Events | Verify Organizer Requests |
| View History (Active/Past) | View Participant Stats | User Role Management |
| Request Organizer Status | Dashboard Analytics | System-wide Oversight |

### 🛠️ Technical Highlights
- **Smart Footer:** Dynamic layout with social links and simplified navigation.
- **Real-time Feedback:** Toast notifications for all major actions (CRUD, Auth).
- **Dynamic Search:** Filter events by status (Open, Full, Closed) and text.

---

## 🔒 Security Hardening (New)

We have implemented industry-standard security measures to protect user data and integrity:

- **🔐 Secure Authentication:**
  - **PHP Sessions:** Replaced unsafe client-side storage with server-side `HttpOnly` and `SameSite` enabled cookies.
  - **Argon2 / BVcrypt:** Passwords are hashed using modern algorithms.

- **🛡️ Access Control:**
  - **Strict CORS:** API calls are restricted to trusted origins (Localhost) with credential validation.
  - **Ownership Verification:** Backend logic strictly enforces that users can only modify/delete resources they *actually* own (preventing IDOR attacks).

- **💉 Injection Protection:**
  - **Prepared Statements (PDO):** All database queries use parameterized statements to prevent SQL Injection.
  - **Input Sanitization:** Frontend and backend validation to mitigate XSS risks.

---

## 💻 Tech Stack

**Frontend:**
*   React 18
*   Redux Toolkit (State Management)
*   React Router DOM v6
*   CSS Modules (Custom Variables system)

**Backend:**
*   PHP 8+ (REST API)
*   MySQL 8 (Relational Database)
*   Apache / Nginx

---

## 📁 Project Structure

```text
project/
│
├── frontend/ (React)
│   └── src/
│       ├── pages/          # Main application views (Home, Profile, etc.)
│       ├── Components/     # Reusable UI components
│       │   ├── common/     # Shared components (Card, Modal, Toast)
│       │   └── profile/    # Profile-specific widgets
│       ├── store/          # Redux Toolkit slices (State Management)
│       ├── api/            # API Service layer (Fetch wrapper)
│       ├── styles/         # CSS Modules & Global Styles
│       └── utils/          # Helper functions & Constants
│
└── project_backend/ (PHP)
    ├── config.php          # Database & CORS Configuration
    ├── authentification.php# Auth Logic (Login/Register)
    ├── events.php          # Event CRUD Operations
    ├── participations.php  # Participation Logic
    ├── update_profile.php  # User Profile Management
    └── admin.php           # Admin capabilities
```

---

## ⚙️ Installation & Setup

### Prerequisites
*   Node.js & npm
*   XAMPP / WAMP (for PHP & MySQL)

### 1. Backend Setup
1.  Clone the repository:
    ```bash
    git clone https://github.com/khalidroui4/gestion-front.git
    ```
2.  Move the `project_backend` folder to your server's root (e.g., `htdocs` in XAMPP).
3.  Configure `config.php` and import the SQL schema.

### 2. Frontend Setup
```bash
cd project_frontend
npm install
npm start
```

### 3. Access
The application will launch at `http://localhost:3000`.

---

*Developed by Admin & Team - 2026*
