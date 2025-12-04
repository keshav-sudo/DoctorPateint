# 🩺 DoctorPatient (Full Stack)
[![Watch the video](https://img.youtube.com/vi/A4KlDewntVg/maxresdefault.jpg)](https://www.youtube.com/watch?v=A4KlDewntVg)
[Click On Image For Testing Video](https://www.youtube.com/watch?v=A4KlDewntVg)

Live Link : https://doctor-pateint.vercel.app/

# Api Deployed On Render

This is the backend for the **DoctorPatient** application, deployed on Render:
<img width="1606" height="718" alt="image" src="https://github.com/user-attachments/assets/5b3975dc-064a-4fbf-8105-655ed0823073" />


🌐 **Base URL:** [https://doctorpateint-1.onrender.com](https://doctorpateint-1.onrender.com)

💻 **Tech Stack & Features:**

* 🟦 **TypeScript** – Strongly typed backend
* 🗄️ **Prisma ORM** – Database modeling & queries
* 🔒 **bcrypt** – Password hashing for security        
* 🛡️ **JWT** – Authentication & Authorization
* 🍪 **res.cookie** – Storing JWT tokens in HTTP cookies
* 🩺 **Node.js + Express** – REST API backend
* 🐘 **PostgreSQL** – Database

---

## 🔑 **Available Endpoints**

### **1️⃣ Authentication**,

| Method  | Endpoint             | Description                        | Body / Notes                                                              |
| ------- | -------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| 📝 POST | `/api/auth/register` | Register a new user                | `{ "name": "John Doe", "role" : "DOCTOR"  ,"email": "john@example.com", "password": "****" }` |
| 🔑 POST | `/api/auth/login`    | Login user, returns JWT via cookie | `{ "email": "john@example.com", "password": "****" }`                     |
| 🚪 POST | `/api/auth/logout`   | Logout user, clears JWT cookie     | No body required                                                          |

> **Note:** JWT token is set in **HTTP-only cookie** using `res.cookie()`.

---

### **2️⃣ Users**

| Method | Endpoint            | Description               | Notes                    |
| ------ | ------------------- | ------------------------- | ------------------------ |
| 👤 GET | `/api/user/me`      | Get logged-in user info   | Requires JWT auth cookie |
| 📊 GET | `/api/user/me/dash` | Get all users (dashboard) | Requires JWT auth cookie |

---

### **3️⃣ Doctors**

| Method | Endpoint       | Description     | Notes                    |
| ------ | -------------- | --------------- | ------------------------ |
| 🩺 GET | `/api/doctors` | Get all doctors | Requires JWT auth cookie |

---

### **4️⃣ Appointments**

| Method  | Endpoint                         | Description                   | Body / Notes                                                                |
| ------- | -------------------------------- | ----------------------------- | --------------------------------------------------------------------------- |
| 📅 POST | `/api/appointments/`             | Book a new appointment        | `{ "patientId": "...", "doctorId": "...", "date": "YYYY-MM-DDTHH:mm:ssZ" }` |
| 📋 GET  | `/api/appointments/my`           | Get patient appointments      | Requires JWT auth cookie                                                    |
| 🏥 GET  | `/api/appointments/doctor`       | Get doctor appointments       | Requires JWT auth cookie                                                    |
| ✅ PATCH | `/api/appointments/:id/complete` | Mark appointment as completed | Requires JWT auth cookie                                                    |

---

### **5️⃣ Prescriptions**

| Method  | Endpoint                                        | Description                         | Body / Notes             |
| ------- | ----------------------------------------------- | ----------------------------------- | ------------------------ |
| 💊 POST | `/api/prescriptions/`                           | Create a prescription               | Requires JWT auth cookie |
| 📄 GET  | `/api/prescriptions/appointment/:appointmentId` | Get prescription for an appointment | Requires JWT auth cookie |

---

## ⚡ **Usage**

### **1️⃣ Test with Postman / Insomnia**

* Base URL: `https://doctorpateint-1.onrender.com`
* Include headers for authentication (JWT cookie is set automatically if logged in).

---

# For start The Backend -  build -> Run
  ```
  npm install
  npm run build
 node dist/index.js

```
# For start The Frontned
```
npm run dev
```


### **2️⃣ Connect from Frontend**

```ts
const BASE_URL = "https://doctorpateint-1.onrender.com";

// Example: Get all doctors
fetch(`${BASE_URL}/api/doctors`, {
  credentials: "include" // Important to send cookies
})
  .then(res => res.json())
  .then(data => console.log("🩺 Doctors:", data));
```

---

### **3️⃣ Book a New Appointment**

```ts
const appointment = {
  patientId: "123",
  doctorId: "456",
  date: "2025-08-25T10:00:00Z"
};

fetch(`${BASE_URL}/api/appointments/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include", // Send JWT cookie
  body: JSON.stringify(appointment)
})
.then(res => res.json())
.then(data => console.log("📅 Appointment booked:", data));
```

---
        
### **4️⃣ Security & Notes**

* 🔒 Passwords are hashed with **bcrypt**.
* 🛡️ JWT tokens are stored in **HTTP-only cookies** using `res.cookie()`.
* 🟦 TypeScript + Prisma ensures **type safety** for all database queries.
* Dates should follow **ISO format**: `YYYY-MM-DDTHH:mm:ssZ`.
