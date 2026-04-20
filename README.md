# CarePlus | Hospital Appointment Management System

CarePlus is a modern, high-performance healthcare ecosystem designed to bridge the gap between patients and specialized medical care. Built with a focus on efficiency, accessibility, and transparency, it transforms antiquated manual scheduling into a seamless digital experience.

## ✨ Key Features

- **Patient Lifecycle Management**: Seamless registration, secure login, and personalized health dashboards.
- **Dynamic Specialist Directory**: Filter and discover medical experts based on specialty, experience, and verified ratings.
- **Smart Booking Engine**: Asynchronous appointment scheduling with real-time availability tracking and conflict prevention.
- **Glassmorphism UI**: A premium, mobile-responsive user interface designed for trust and professional aesthetics.
- **Admin Command Center**: Centralized visibility for hospital administrators to manage doctor schedules and patient metrics.
- **Role-Based Access Control**: Distinct environments tailored for Patients, Doctors, and Administrators.

## 🛠️ Technology Stack

### Frontend
- **HTML5 & CSS3**: Custom styles with advanced Glassmorphism design patterns.
- **JavaScript**: For interactive components and asynchronous API communication.

### Backend (Dual Architecture)
- **Primary Logic**: Java 17 | Spring Boot Framework (RESTful Architecture).
- **Control Layer**: Maven for build automation and dependency management.
- **Local Dev Server**: Node.js & Express for rapid UI prototyping and JSON-based persistence.

### Data Layer
- **Relational Database**: SQL-based persistence (H2/PostgreSQL).
- **Local Persistence**: `db.json` for lightweight development data tracking.

## 📁 Project Structure

```text
hospital-appointment-system/
├── backend/                # Spring Boot Backend Source Code
│   ├── src/
│   └── pom.xml             # Maven Configuration
├── css/                    # Custom Stylesheets
├── images/                 # UI Assets and Hero Graphics
├── js/                     # Frontend Logical Scripts
├── index.html              # Main Landing Page
├── appointment.html        # Booking Interface
├── server.js               # Node.js Development Server
└── db.json                 # Project Database (Dev)
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Java 17+ & Maven (for backend services)

### Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Lakshyachaudhary13/hospital-oppointment-system.git
   cd hospital-oppointment-system
   ```

2. **Frontend & Mock Server**
   ```bash
   npm install
   # Start the Express server
   node server.js
   ```
   The application will be available at `http://localhost:8080`.

3. **Backend Services (Spring Boot)**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

## 📈 Future Roadmap

- [ ] **AI Search Core**: Symptom-based doctor recommendations.
- [ ] **Payment Integration**: Secure billing and insurance processing.
- [ ] **Push Notifications**: SMS/Email reminders for upcoming consultations.
- [ ] **Tele-Health**: Integrated video consultation modules.

## 📄 License

This project is developed for educational purposes as part of the Major Project requirement.

---
**Maintained by:** [Lakshya Chaudhary](https://github.com/Lakshyachaudhary13)
