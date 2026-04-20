const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve frontend files

// Initial Data
const initialData = {
    users: [
        { id: 1, name: 'Demo Patient', email: 'patient@example.com', password: 'password', role: 'patient' },
        { id: 101, name: 'System Admin', email: 'admin@careplus.com', password: 'admin', role: 'admin' }
    ],
    doctors: [
        { 
            id: 1, 
            name: 'Dr. Sarah Wilson', 
            specialty: 'Cardiologist', 
            experience: '12 Years', 
            image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=400&h=400&fit=crop',
            bio: 'Dr. Sarah Wilson is a renowned cardiologist specializing in interventional cardiology and heart failure management with over a decade of clinical excellence.',
            education: 'MD from Harvard Medical School, Residency at Mayo Clinic',
            achievements: ['Awarded Top Cardiologist 2024', 'Published 20+ research papers in JAMA', 'Pioneer in minimally invasive heart surgery'],
            rating: 4.9
        },
        { 
            id: 2, 
            name: 'Dr. James Miller', 
            specialty: 'Neurologist', 
            experience: '15 Years', 
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
            bio: 'With 15 years in neurology, Dr. Miller is an expert in neuro-oncology and movement disorders, dedicated to patient-centered neurological care.',
            education: 'MD from Johns Hopkins University, Fellowship at Oxford',
            achievements: ['National Merit in Neurology research', 'Member of American Academy of Neurology', 'Developed new protocols for stroke recovery'],
            rating: 4.8
        },
        { 
            id: 3, 
            name: 'Dr. Elena Rodriguez', 
            specialty: 'Pediatrician', 
            experience: '8 Years', 
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
            bio: 'Dr. Elena is passionate about child healthcare, focusing on holistic development and preventive medicine for children of all ages.',
            education: 'MD from Stanford University, Pediatric Specialty at Boston Children\'s Hospital',
            achievements: ['"Patient Choice" Award 3 years running', 'Lead advisor for Child Wellness programs', 'Expert in pediatric allergy management'],
            rating: 5.0
        },
        { 
            id: 4, 
            name: 'Dr. Michael Chen', 
            specialty: 'Dermatologist', 
            experience: '10 Years', 
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
            bio: 'Dr. Chen specializes in medical and cosmetic dermatology, providing advanced treatments for skin rejuvenation and oncology.',
            education: 'MD from Yale School of Medicine, Dermatology Training at NYU',
            achievements: ['Certified by American Board of Dermatology', 'Innovator in Laser Skin Therapy', 'Author of "The Modern Skin Guide"'],
            rating: 4.7
        }
    ],
    appointments: []
};

// Helper to load/save data
function loadDB() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// --- API Endpoints ---

// Doctors
app.get('/api/doctors', (req, res) => {
    const db = loadDB();
    res.json(db.doctors);
});

app.post('/api/doctors', (req, res) => {
    const db = loadDB();
    const newDoc = { id: Date.now(), ...req.body };
    db.doctors.push(newDoc);
    saveDB(db);
    res.status(201).json(newDoc);
});

app.delete('/api/doctors/:id', (req, res) => {
    const db = loadDB();
    db.doctors = db.doctors.filter(d => d.id != req.params.id);
    saveDB(db);
    res.json({ message: 'Doctor deleted' });
});

// Users
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
    const db = loadDB();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/api/users/register', (req, res) => {
    const db = loadDB();
    const newUser = { id: Date.now(), ...req.body };
    db.users.push(newUser);
    saveDB(db);
    res.status(201).json(newUser);
});

// Appointments
app.get('/api/appointments/all', (req, res) => {
    const db = loadDB();
    // Join with doctor and patient data for admin view
    const detailed = db.appointments.map(a => ({
        ...a,
        doctor: db.doctors.find(d => d.id == a.doctorId),
        patient: db.users.find(u => u.id == a.patientId)
    }));
    res.json(detailed);
});

app.get('/api/appointments/patient/:id', (req, res) => {
    const db = loadDB();
    const myAppts = db.appointments.filter(a => a.patientId == req.params.id);
    const detailed = myAppts.map(a => ({
        ...a,
        doctor: db.doctors.find(d => d.id == a.doctorId)
    }));
    res.json(detailed);
});

app.post('/api/appointments/book', (req, res) => {
    const { patientId, doctorId, time } = req.query;
    const db = loadDB();
    const newAppt = {
        id: db.appointments.length + 1,
        patientId,
        doctorId,
        appointmentTime: time,
        status: 'Scheduled',
        createdAt: new Date().toISOString()
    };
    db.appointments.push(newAppt);
    saveDB(db);
    res.json(newAppt);
});

app.put('/api/appointments/:id/status', (req, res) => {
    const { status } = req.query;
    const db = loadDB();
    const appt = db.appointments.find(a => a.id == req.params.id);
    if (appt) {
        appt.status = status;
        saveDB(db);
        res.json(appt);
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
});

app.delete('/api/appointments/:id', (req, res) => {
    const db = loadDB();
    db.appointments = db.appointments.filter(a => a.id != req.params.id);
    saveDB(db);
    res.json({ message: 'Appointment deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`CarePlus Localhost Server running at http://localhost:${PORT}`);
    console.log(`Static files are being served from current directory.`);
});
