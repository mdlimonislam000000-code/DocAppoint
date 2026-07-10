# 🩺 DocAppoint — Doctor Appointment Manager

> **DocAppoint** is a modern and responsive doctor appointment booking platform that enables patients to easily find trusted doctors, explore detailed profiles, and schedule appointments online. The application also provides a secure dashboard where users can manage their appointments and update their personal profile using **Better Auth** and **JWT Authentication**.

---

## 🌐 Live Demo

🔗 **Live Website:** https://doctor-appointment-manager-iota.vercel.app/

## 📂 GitHub Repository

### 💻 Client Repository

https://github.com/mdlimonislam000000-code/DocAppoint

### 🖥️ Server Repository

https://github.com/mdlimonislam000000-code/DocAppointServer

---

# ✨ Key Features

* 👨‍⚕️ Browse experienced doctors with complete profile information.
* ⭐ Display Top Rated Doctors dynamically on the home page.
* 🔐 Secure authentication using Better Auth with JWT and Google Sign-In.
* 📅 Book doctor appointments with an easy-to-use booking form.
* 📋 Personal dashboard to manage appointments and profile information.
* ✏️ Update and delete appointments instantly without page reload.
* 🔍 Search doctors by name from the All Appointments page.
* ⭐ Shorting with ratting : high ratting to low ratting , low ratting to high ratting
* 🚀 Protected routes with persistent login after page refresh.
* 🔄 Loading spinner during data fetching for a better user experience.
* 📱 Fully responsive design optimized for mobile, tablet, and desktop.
* ❌ Custom 404 page for invalid routes.
* 🔔 Beautiful toast notifications instead of browser alerts.
* 🌐 SEO-friendly metadata added to every page.

---

# 🖼️ Pages

### 🏠 Public Pages

* Home
* All Appointments
* Login
* Register

### 🔒 Private Pages

* Dashboard
* My Bookings
* My Profile

---

# ⚙️ Core Functionalities

### 🏠 Home

* Hero Banner
* Top Rated Doctors
* Additional Healthcare Sections
* Responsive Layout

### 👨‍⚕️ Doctor Details

* Complete doctor information
* Available schedule
* Consultation fee
* Hospital information
* Book Appointment button

### 📅 Appointment Booking

* Appointment booking form
* Save appointment into MongoDB
* Success toast notification

### 📊 Dashboard

#### 📋 My Bookings

* View booked appointments
* Update appointment
* Delete appointment

#### 👤 My Profile

* View profile information
* Update profile photo
* Update name

---

# 🛠️ Technology Stack

## Frontend

* Next.js 15 (App Router)
* React.js
* Tailwind CSS
* React Hot Toast
* React Icons
* Fetch API

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* MongoDB Driver
* Better Auth
* JWT Authentication
* CORS
* Dotenv

---

# 🗄️ Database Collections

### doctors

Stores all doctor information.

### appointments

Stores patient appointment information.

### users

Stores authenticated user information.

### reviews *(Optional)*

Stores doctor reviews.

---

# 🔐 Authentication

* Email & Password Login
* Google Authentication
* Better Auth Integration
* JWT Protected Routes
* Persistent Authentication
* Secure Private Dashboard

---

# 🚀 Installation Guide

### Clone the repositories

```bash
git clone https://github.com/mdlimonislam000000-code/DocAppoint

git clone https://github.com/mdlimonislam000000-code/DocAppointServer
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

Client

```bash
npm run dev
```

Server

```bash
npm start
```

---

# 🔑 Environment Variables

### Client

```env
NEXT_PUBLIC_SERVER_URL=

NEXT_PUBLIC_BETTER_AUTH_URL=
```

### Server

```env
PORT=

MONGODB_URI=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

JWT_SECRET=
```

---

# 📌 Assignment Requirements Covered

* ✅ Better Auth Authentication
* ✅ JWT Authentication
* ✅ Protected Routes
* ✅ Doctor Details Page
* ✅ Appointment Booking
* ✅ MongoDB Integration
* ✅ Appointment CRUD Operations
* ✅ User Dashboard
* ✅ Profile Update
* ✅ Search by Doctor Name
* ✅ Loading Spinner
* ✅ Custom 404 Page
* ✅ SEO Metadata
* ✅ Toast Notifications
* ✅ Fully Responsive Design

---

# 📱 Responsive Design

The application is fully optimized for:

* 📱 Mobile Devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop Screens

---

# 🔮 Future Improvements

* Doctor Review & Rating System
* Online Payment Integration
* Appointment Reminder Notifications
* Video Consultation
* Admin Dashboard
* Multi-language Support

---

# 👨‍💻 Developer

**Md. Limon Islam**

Passionate Full Stack Web Developer

---

## ⭐ If you like this project, don't forget to give it a star on GitHub!
