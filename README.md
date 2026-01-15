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
├── frontend/
│ ├── src/
│ │ ├── pages/ # Home, Events, Profile, EventDetails, etc.
│ │ ├── store/ # Redux slices
│ │ ├── api/ # API handlers
│ │ ├── Components/ # Navbar, Footer, Modals, etc.
│ │ └── styles/ # CSS files
│
├── project_backend/
│ ├── config.php
│ ├── authentification.php
│ ├── events.php
│ ├── participations.php
│ ├── organizer_requests.php
│ ├── admin.php
│ └── update_profile.php


---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/event-management-platform.git
