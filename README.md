# DoctorPatient Backend API

This is the backend for the DoctorPatient application, deployed on Render:

**Base URL:** [https://doctorpateint-1.onrender.com](https://doctorpateint-1.onrender.com)

---

## **Available Endpoints**

### **1. Authentication**
| Method | Endpoint                  | Description                | Body / Notes                        |
|--------|---------------------------|----------------------------|-------------------------------------|
| POST   | `/api/auth/register`       | Register a new user        | `{ "name": "...", "email": "...", "password": "..." }` |
| POST   | `/api/auth/login`          | Login user                 | `{ "email": "...", "password": "..." }` |
| POST   | `/api/auth/logout`         | Logout user                | No body required                     |

---

### **2. Users**
| Method | Endpoint                  | Description                | Notes                        |
|--------|---------------------------|----------------------------|-------------------------------|
| GET    | `/api/user/me`             | Get logged-in user info    | Requires auth middleware      |
| GET    | `/api/user/me/dash`        | Get all users (dashboard)  | Requires auth middleware      |

---

### **3. Doctors**
| Method | Endpoint                  | Description                | Notes                        |
|--------|---------------------------|----------------------------|-------------------------------|
| GET    | `/api/doctors`             | Get all doctors            | Requires auth middleware      |

---

### **4. Appointments**
| Method | Endpoint                          | Description                        | Body / Notes                        |
|--------|-----------------------------------|------------------------------------|-------------------------------------|
| POST   | `/api/appointments/`              | Book a new appointment             | `{ "patientId": "...", "doctorId": "...", "date": "..." }` |
| GET    | `/api/appointments/my`            | Get patient appointments           | Requires auth middleware            |
| GET    | `/api/appointments/doctor`        | Get doctor appointments            | Requires auth middleware            |
| PATCH  | `/api/appointments/:id/complete`  | Mark appointment as completed      | Requires auth middleware            |

---

### **5. Prescriptions**
| Method | Endpoint                                 | Description                        | Body / Notes                        |
|--------|-----------------------------------------|------------------------------------|-------------------------------------|
| POST   | `/api/prescriptions/`                   | Create a prescription              | Requires auth middleware            |
| GET    | `/api/prescriptions/appointment/:appointmentId` | Get prescription for an appointment | Requires auth middleware            |

---

## **Usage**

### **1. Test with Postman or Insomnia**
- Use the **Base URL** above.
- Include any required headers (e.g., `Authorization` with JWT token).

### **2. Connect from frontend**
Replace your local backend URL with the live Render URL:

```js
const BASE_URL = "https://doctorpateint-1.onrender.com";

fetch(`${BASE_URL}/api/doctors`)
  .then(res => res.json())
  .then(data => console.log(data));
