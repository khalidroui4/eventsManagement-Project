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

```text
project/
│
├── frontend/ (React)
│   └── src/
│       ├── api/
│       │   ├── authApi.js
│       │   ├── evaluationsApi.js
│       │   ├── eventsApi.js
│       │   ├── organizerRequestsApi.js
│       │   ├── participationsApi.js
│       │   ├── profileApi.js
│       │   └── userApi.js
│       │
│       ├── Components/
│       │   ├── common/
│       │   │   ├── ConfirmModal.jsx
│       │   │   ├── EventCard.jsx
│       │   │   ├── Modal.jsx
│       │   │   ├── ProtectedRoute.jsx
│       │   │   ├── Skeleton.jsx
│       │   │   └── Toast.jsx
│       │   ├── profile/
│       │   │   ├── AdminDashboard.jsx
│       │   │   ├── DashboardStats.jsx
│       │   │   ├── EditProfileModal.jsx
│       │   │   ├── EventList.jsx
│       │   │   ├── EventModal.jsx
│       │   │   ├── OrganizerDashboard.jsx
│       │   │   ├── OrganizerRequestSection.jsx
│       │   │   ├── PerformanceChart.jsx
│       │   │   └── ProfileHeader.jsx
│       │   ├── footer.jsx
│       │   └── navbar.jsx
│       │
│       ├── context/
│       │   └── ToastContext.js
│       │
│       ├── pages/
│       │   ├── About.jsx
│       │   ├── Contact.jsx
│       │   ├── EventDetails.jsx
│       │   ├── Events.jsx
│       │   ├── Home.jsx
│       │   ├── NotFound.jsx
│       │   ├── Profile.jsx
│       │   ├── PublicProfile.jsx
│       │   ├── Signin.jsx
│       │   └── Signup.jsx
│       │
│       ├── store/
│       │   ├── authSlice.js
│       │   ├── evaluationsSlice.js
│       │   ├── eventsSlice.js
│       │   ├── organizerRequestsSlice.js
│       │   ├── participationsSlice.js
│       │   ├── profileSlice.js
│       │   └── store.js
│       │
│       ├── styles/
│       │   ├── about.css
│       │   ├── contact.css
│       │   ├── eventDetails.css
│       │   ├── events.css
│       │   ├── footer.css
│       │   ├── home.css
│       │   ├── index.css
│       │   ├── notFound.css
│       │   ├── profile.css
│       │   ├── sign.css
│       │   └── skeleton.css
│       │
│       └── utils/
│           ├── constants.js
│           ├── pageTransition.jsx
│           └── storage.js
│
└── project_backend/ (PHP)
    ├── admin.php
    ├── authentification.php
    ├── config.php
    ├── contact.php
    ├── evaluations.php
    ├── events.php
    ├── fix_trigger.php
    ├── get_public_user.php
    ├── organizer_requests.php
    ├── participations.php
    ├── stats.php
    └── update_profile.php
```




---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/khalidroui4/gestion-front.git 
git clone https://gitlab.com/rouibaa.khalid05/gestion-events
x