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
- **JavaScript**: ES6+ for interactive components and API orchestration.
- **Cloud SDK**: Supabase Client for direct database interaction.

### Backend (Modern Architecture)
- **Primary Persistence**: Supabase (PostgreSQL) for real-time, cloud-synchronized data.
- **Enterprise Logic**: Java 17 | Spring Boot (Maintained for enterprise-scale extensibility).
- **Control Layer**: Maven for build automation and dependency management.
- **Dev Tooling**: Node.js & Express for rapid UI prototyping.

### Data Layer
- **Cloud Relational**: Supabase SQL with optimized indexing for healthcare data.
- **Local Mocking**: `db.json` for lightweight offline development.

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

2. **Database Setup (Supabase)**
   - Create a new project on [Supabase](https://supabase.com/).
   - Execute the schema found in `supabase_setup.sql` in the Supabase SQL Editor.
   - Update `SUPABASE_URL` and `SUPABASE_KEY` in `js/script.js`.

3. **Frontend & Local Server**
   ```bash
   npm install
   # Start the Express server to serve static files
   node server.js
   ```
   The application will be available at `http://localhost:8080`.

4. **Optional: Backend Services (Spring Boot)**
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
