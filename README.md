# DoctorPateint

## 1. Authentication Routes (/api/auth)
Yeh routes user ke login aur registration ke liye honge.

Register User

Endpoint: POST /api/auth/register

Kaam: Naye patient ya doctor ko register karne ke liye.

Request Body (Data Jo Bhejna Hoga): { "name": "...", "email": "...", "password": "...", "role": "Patient" } ya { "role": "Doctor" }.

Response (Data Jo Milega): { "token": "...", "user": { ... } }

Login User

Endpoint: POST /api/auth/login

Kaam: Existing patient ya doctor ko login karne ke liye.

Request Body: { "email": "...", "password": "..." }

Response: { "token": "...", "user": { ... } }

## 2. Doctors Routes (/api/doctors)
Yeh routes patients ko doctors ki list dikhane ke liye hain.

Get All Doctors

Endpoint: GET /api/doctors

Kaam: Sabhi registered doctors ki list fetch karna taaki patient unhe mobile app mein dekh sake.

Kiske Liye: Patient (Login hona zaroori hai).

Response: [ { "id": "...", "name": "Dr. Verma", "speciality": "..." }, ... ]

## 3. Appointments Routes (/api/appointments)
Yeh routes appointment book karne, dekhne, aur update karne ke liye hain.

Book a New Appointment

Endpoint: POST /api/appointments

Kaam: Patient ke liye ek naya appointment book karna.

Kiske Liye: Patient (Login hona zaroori hai).

Request Body: { "doctorId": "...", "appointmentDate": "..." }. Patient ki ID aap token se nikalenge.

Response: { "message": "Appointment booked successfully!", "appointment": { ... } }

Get Patient's Appointments

Endpoint: GET /api/appointments/my

Kaam: Logged-in patient ke saare appointments (upcoming aur past) fetch karna.

Kiske Liye: Patient (Login hona zaroori hai).

Response: [ { "id": "...", "doctorName": "...", "status": "Booked" }, ... ]

Get Doctor's Appointments

Endpoint: GET /api/appointments/doctor

Kaam: Logged-in doctor ko assign kiye gaye saare appointments fetch karna.

Kiske Liye: Doctor (Login hona zaroori hai).

Response: [ { "id": "...", "patientName": "...", "status": "Booked" }, ... ]

Mark Appointment as Completed

Endpoint: PATCH /api/appointments/:id/complete

Kaam: Doctor ke dwara kisi appointment ko "Completed" mark karna. Yahan :id appointment ki ID hogi.

Kiske Liye: Doctor (Login hona zaroori hai).

Response: { "message": "Appointment marked as completed.", "appointment": { ... } }

## 4. Prescriptions Routes (/api/prescriptions)
Yeh routes doctor dwara prescription banane aur patient dwara dekhne ke liye hain.

Create a Prescription

Endpoint: POST /api/prescriptions

Kaam: Doctor jab appointment complete kar de, tab uske liye ek prescription banana.

Kiske Liye: Doctor (Login hona zaroori hai).

Request Body: { "appointmentId": "...", "patientId": "...", "symptoms": "...", "diagnosis": "...", "medicines": [...] }

Response: { "message": "Prescription created successfully.", "prescription": { ... } }

Get Prescription for an Appointment

Endpoint: GET /api/prescriptions/appointment/:appointmentId

Kaam: Patient ya Doctor ke liye kisi khaas appointment ka prescription dekhna. Yahan :appointmentId appointment ki ID hogi.

Kiske Liye: Patient aur Doctor (Login hona zaroori hai).

Response: { "id": "...", "symptoms": "...", "diagnosis": "...", ... }

Zaroori Salah (Important Advice):
Aapko ek authentication middleware banana hoga. Yeh middleware har protected route (jaise appointment book karna) se pehle chalega aur check karega ki:

Request ke header mein valid JWT token hai ya nahi.

User ka role (Patient/Doctor) uss route ko access karne ke liye sahi hai ya nahi.

Yeh structure aapke project ke liye ek solid foundation hai. Good luck! 👍







Gemini can make mistakes, so double-check it