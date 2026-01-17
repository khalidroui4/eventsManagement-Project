# 🎯 Event Management Platform

A full-stack event management platform built with **React + Redux** on the frontend and **PHP + MySQL** on the backend.  
The system supports three roles: **User**, **Organizer**, and **Admin**, each with dedicated permissions and features.

---

## 🚀 Features

### 👤 User
- Register & Login
- View all available events
- Participate / cancel participation in events
- View participated events (current & past)
- Send request to become an Organizer
- Manage profile information

---

### 🧑‍💼 Organizer
(All User features +)

- Create new events
- Edit own events
- Delete own events
- View participants count
- Manage created events from profile

---

### 🛡️ Admin
(All Organizer features +)

- View **all events** on the platform
- Delete **any event** (global delete)
- View organizer requests
- Accept or refuse organizer requests
- Promote users to Organizer role
- Full control over event system

---

### 🔒 Security Hardening (New)

- **Secure Authentication:** Server-side PHP Sessions with `HttpOnly` and `SameSite` enabled cookies.
- **Strict CORS:** Restricted API access to trusted origins (Localhost) with credential validation.
- **Ownership Verification:** Strict backend checks to prevent IDOR (users can only edit/delete their own data).
- **Protection:** Prepared Statements (SQLi) and Input Sanitization (XSS).

---

## 🧱 Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router
- Framer Motion (animations)
- CSS (custom UI)

### Backend
- PHP (REST-style API)
- MySQL (Relational Database)
- PDO (Secure database access)

---


## 📁 Project Structure

project/
│
├── frontend/ (React)
│   └── src/
│       ├── pages/          # Main application views
│       ├── Components/
│       │   ├── common/     # Shared (Card, Modal, Toast)
│       │   ├── profile/    # Profile dashboard widgets
│       │   ├── Navbar.jsx
│       │   └── Footer.jsx
│       ├── store/          # Redux Toolkit slices
│       ├── api/            # API Services
│       ├── styles/         # CSS Modules
│       └── utils/          # Helpers
│
└── project_backend/ (PHP)
    ├── config.php          # DB & CORS Config
    ├── authentification.php
    ├── events.php          # Event CRUD
    ├── participations.php
    ├── update_profile.php
    └── admin.php           # Admin Controls




---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/khalidroui4/gestion-front.git
