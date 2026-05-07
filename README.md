# CarePlus | Hospital Appointment Management System

CarePlus is a modern, high-performance healthcare ecosystem designed to bridge the gap between patients and specialized medical care. Built with a focus on efficiency, accessibility, and transparency, it transforms antiquated manual scheduling into a seamless digital experience.

## ✨ Key Features

- **Patient Lifecycle Management**: Seamless registration, secure login, and personalized health dashboards.
- **Dynamic Specialist Directory**: Filter and discover medical experts based on specialty, experience, and verified ratings.
- **Smart Booking Engine**: Appointment scheduling with real-time availability tracking.
- **Glassmorphism UI**: A premium, mobile-responsive user interface designed for trust and professional aesthetics.
- **Admin Command Center**: Centralized visibility for hospital administrators to manage doctor schedules and patient metrics.
- **Role-Based Access Control**: Distinct environments tailored for Patients, Doctors, and Administrators.

## 🛠️ Technology Stack

### Backend
- **Core**: Java 17 | Spring Boot
- **Persistence**: H2 Database (In-memory/File-based for portability)
- **Security**: Custom Session-based authentication logic.
- **Build Tool**: Maven

### Frontend (Served by Spring Boot)
- **HTML5 & CSS3**: Custom styles with advanced Glassmorphism design patterns.
- **JavaScript**: ES6+ for interactive components and local API communication via `fetch`.
- **Logic**: All API calls point to the local Java `/api` endpoints.

## 📁 Project Structure

```text
hospital-appointment-system/
├── backend/                # Primary Application Directory
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Spring Boot Source Code (Controllers, Models, Repositories)
│   │   │   └── resources/
│   │   │       ├── static/ # Frontend Assets (HTML, CSS, JS) - SERVED HERE
│   │   │       └── application.properties
│   └── pom.xml             # Maven Dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven

### Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Lakshyachaudhary13/hospital-oppointment-system.git
   cd hospital-oppointment-system/backend
   ```

2. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```
   The application will be available at `http://localhost:8080`.

3. **Default Credentials**
   - **Admin Email**: `admin@careplus.com`
   - **Admin Password**: `admin`

## 📈 Future Roadmap

- [ ] **Persistent Database**: Integration with PostgreSQL or MySQL for production.
- [ ] **AI Search Core**: Symptom-based doctor recommendations.
- [ ] **Payment Integration**: Secure billing and insurance processing.
- [ ] **Push Notifications**: SMS/Email reminders for upcoming consultations.

## 📄 License

This project is developed for educational purposes as part of the Major Project requirement.

---
**Maintained by:** [Lakshya Chaudhary](https://github.com/Lakshyachaudhary13)
