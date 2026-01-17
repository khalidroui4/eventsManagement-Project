# 📘 Technical Documentation: Event Management Platform

## 🌟 Introduction
This document serves as a comprehensive technical manual for the **Event Management Platform**. It is designed to bridge the gap between high-level features and low-level implementation details, making it suitable for both beginner developers and senior engineers.

The platform is a full-stack application leveraging **React/Redux** for a dynamic frontend and **PHP/MySQL** for a robust, relational backend.

---

## 🏗️ Architecture Overview

The application follows a classic **Client-Server** architecture with a RESTful API communication layer.

```mermaid
graph TD
    User[User / Client Browser] -->|Interacts| UI[React UI Components]
    UI -->|Dispatches Action| Redux[Redux Store]
    Redux -->|Calls Async Thunk| API_Layer[API Utility Functions]
    API_Layer -->|HTTP Request (Fetch)| Backend[PHP Backend API]
    Backend -->|SQL Query| Database[(MySQL Database)]
    Database -->|Result Set| Backend
    Backend -->|JSON Response| API_Layer
    API_Layer -->|Payload| Redux
    Redux -->|State Update| UI
```

---

## 📂 Project Structure Explained

### Frontend (`/src`)
*   **`pages/`**: Top-level Page components (views) corresponding to routes (e.g., `Home.jsx`, `Events.jsx`).
*   **`Components/`**: Reusable UI blocks.
    *   `common/`: Generic components like `Skeleton`, `ProtectedRoute`.
    *   `profile/`: Specific components for the Profile dashboard (`OrganizerDashboard`, `EventList`).
*   **`store/`**: Redux Toolkit logic (Slices & Store configuration).
*   **`api/`**: Functions wrapping the `fetch` API to communicate with the backend.
*   **`utils/`**: Helper functions and constants (e.g., `constants.js` holding the API URL).

### Backend (`/backend`)
*   **`config.php`**: Database connection settings.
*   **`*.php`**: Endpoint files handling specific resources (e.g., `events.php`, `authentification.php`).

---

## 💻 Codebase Deep Dive

### 1. 🗄️ Database Layer (`database.sql`)

The foundation of the application. It uses **Stored Procedures** and **Triggers** to handle complex business logic directly within the database, ensuring data integrity and performance.

#### **Key Tables**
*   **`utilisateur`**: Stores user credentials and roles (`admin`, `organizer`, `user`).
*   **`evenement`**: Stores event details (`capaciteE`, `num_participant`, `etat`).
*   **`participations`**: A junction table linking Users to Events.

#### **Logic Spotlight: Automated Status Control**
The system automatically updates an event's status (Open vs Full) using a **Trigger**. This prevents overbooking at the database level.

```sql
/**
 * Trigger: After_participation_insert
 * Purpose: Automatically increments the participant count when a user joins.
 * Note: If 'num_participant' reaches 'capaciteE', another trigger (before_event_update)
 *       will automatically set the event state to 'complet'.
 */
CREATE TRIGGER After_participation_insert
AFTER INSERT ON participations
FOR EACH ROW
BEGIN
    IF NEW.statut = 'active' THEN
        UPDATE evenement
        SET num_participant = num_participant + 1
        WHERE idE = NEW.event_id;
    END IF;
END$$
```

#### **Logic Spotlight: Concurrent Participation**
The **Stored Procedure** `Inscrire_utilisateur` ensures that a user cannot join a full event, even if multiple users click "Join" simultaneously.

```sql
CREATE PROCEDURE Inscrire_utilisateur(IN p_user INT, IN p_event INT)
BEGIN
    -- 1. Check if event is full using a helper function
    IF Event_complet(p_event) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Evenement plein';
    END IF;

    -- 2. Check if user already participated
    -- 3. Insert or Update participation status
END$$
```

---

### 2. 🐘 Backend Logic (PHP)

The PHP scripts act as a REST API. They receive JSON input, interact with the database via PDO, and return JSON responses.

#### **`authentification.php`**: Secure Login
Handles user registration and login.

*   **Hashing**: Uses `password_hash()` (Bcrypt) for security. Never stores plain-text passwords.
*   **CORS**: Headers at the top allow cross-origin requests from the React frontend.

```php
// Login Logic Snippet
if ($user && password_verify($data["motdepasse"], $user["passwordU"])) {
    // SECURITY: Remove password hash before sending user object to frontend
    unset($user["passwordU"]); 
    echo json_encode(["success" => true, "user" => $user]);
}
```

#### **`events.php`**: Dynamic CRUD
Handles Create, Read, Update, Delete operations for events.

*   **Dynamic Query parameters**: It checks `$_GET` parameters to decide whether to return *all events*, *one event*, or *events by a specific organizer*.
*   **Transaction Safety**: When deleting an event, it uses a transaction to ensure all related data (evaluations, participations) is deleted *before* the event itself, preventing orphaned data.

```php
// Delete Event Transaction
$pdo->beginTransaction();
try {
    $pdo->prepare("DELETE FROM evaluations WHERE event_id = ?")->execute([$id]);
    $pdo->prepare("DELETE FROM participations WHERE event_id = ?")->execute([$id]);
    $pdo->prepare("DELETE FROM evenement WHERE idE = ?")->execute([$id]);
    $pdo->commit(); // Only saves if ALL queries succeed
} catch (Exception $e) {
    $pdo->rollBack(); // Revert everything if one fails
}
```

---

### 3. ⚛️ Frontend State Management (Redux Toolkit)

The application uses **Redux Toolkit (RTK)** for global state management. This avoids "prop drilling" and makes data accessible anywhere.

#### **`store/authSlice.js`**: Authentication State
Manages the logged-in user's session.

*   **Initialization**: Reads `localStorage` on boot to keep the user logged in even after refreshing.
*   **Thunks**: `register` and `loginUser` are **Async Thunks**. They handle the 3 states of an API call automatically:
    1.  `pending`: Sets `loading = true`.
    2.  `fulfilled`: Updates `user` state and saves to `localStorage`.
    3.  `rejected`: Sets error message.

```javascript
/* Async Thunk Example: Login */
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, motdepasse }, { rejectWithValue }) => {
    try {
      const res = await login(email, motdepasse); // Call API layer
      if (!res.success) return rejectWithValue(res.error);
      return res; // Payload for 'fulfilled'
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
```

#### **`store/profileSlice.js`**: Complex Data Fetching
Manages data specific to the user's profile, such as the list of events they are participating in vs. the events they organized.

*   **Separation of Concerns**: It handles `participations` and `createdEvents` in separate arrays, allowing the Profile page to display both simultaneously without conflict.

---

### 4. 🌐 API Layer (`api/`)

A clean abstraction layer that separates the UI from network logic. The components don't know *how* `fetch` works; they just call these functions.

#### **`api/eventsApi.js`**
Constructs standard `FormData` for file uploads or simple JSON payloads for data.

```javascript
export const createEvent = async (eventData, user) => {
  // Logic: Send POST request to backend
  const res = await fetch(`${API_URL}/events.php`, {
    method: "POST",
    body: JSON.stringify({ ...eventData, creator_id: user.idU })
  });
  return res.json();
};
```

---

### 5. 🧩 Frontend Components

#### **`src/App.js`**: Routing hub
*   Uses `react-router-dom` v6.
*   **`ProtectedRoute`**: A wrapper component. If a user isn't logged in (Redux state), it redirects them to `/signIn` before they can see the `/profile` page.

#### **`src/pages/Profile.jsx`**: The Smart Container
*   **Role-Based Rendering**: It checks `user.roleU`.
    *   If `admin`, it shows `AdminDashboard`.
    *   If `organizer`, it shows `OrganizerDashboard`.
    *   If `user`, it shows the standard participant view.
*   **Animations**: Uses `framer-motion` for smooth entrance effects (`variants`, `initial`, `animate`).

#### **`OrganizerDashboard.jsx`**: Feature-Rich Component
*   **Local State**: Uses `useState` to control Modals (Edit/Delete).
*   **Optimistic UI**: When an event is deleted, it dispatches `removeEvent` to Redux, which immediately updates the list, making the app feel snappy.

---

## 🚀 Conclusion

This project demonstrates a professional command of full-stack development concepts. It uses advanced database features for integrity, a structured API access pattern, and a modern, scalable frontend architecture with robust state management.
