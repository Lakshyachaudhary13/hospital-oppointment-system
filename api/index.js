const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const rootDir = process.cwd();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initial Dataset for CarePlus Demo
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
            achievements: ['Patient Choice Award 3 years running', 'Lead advisor for Child Wellness programs', 'Expert in pediatric allergy management'],
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
        },
        {
            id: 5,
            name: 'Dr. Ananya Sharma',
            specialty: 'Gynecologist',
            experience: '10 Years',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
            bio: 'Dr. Ananya is an expert in maternal-fetal medicine and women\'s reproductive health with extensive surgical experience.',
            education: 'MD from AIIMS Delhi, Fellowship at Royal College of OBGYN',
            achievements: ['Best Women Healthcare Advocate 2023', 'Expert in robotic-assisted surgery', '1000+ Successful Deliveries'],
            rating: 4.8
        },
        {
            id: 6,
            name: 'Dr. Robert Vance',
            specialty: 'Orthopedic Surgeon',
            experience: '18 Years',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
            bio: 'Specializing in sports medicine and joint replacements with a focus on minimally invasive recovery techniques.',
            education: 'MD from Johns Hopkins, Orthopedic Surgery Residency at Cleveland Clinic',
            achievements: ['Successfully performed 2000+ joint replacements', 'Chief Surgeon at Global Ortho Center', 'Olympic Team Consultant'],
            rating: 4.9
        },
        {
            id: 7,
            name: 'Dr. Lisa Wang',
            specialty: 'Ophthalmologist',
            experience: '7 Years',
            image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=400&h=400&fit=crop',
            bio: 'Dedicated to preserving vision through advanced laser eye surgery, cornea treatments, and glaucoma management.',
            education: 'MD from Stanford University, Ophthalmology Fellowship at UCLA',
            achievements: ['Innovator in LASIK technology', 'Published researcher in eye pathology', 'Distinguished Care Award'],
            rating: 4.7
        },
        {
            id: 8,
            name: 'Dr. David Miller',
            specialty: 'Oncologist',
            experience: '14 Years',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
            bio: 'A leading researcher in immunotherapy and personalized cancer treatment protocols with compassionate care.',
            education: 'MD/PhD from Yale, Oncology Fellowship at MD Anderson Cancer Center',
            achievements: ['Director of Cancer Research Institute', 'Recipient of National Medical Excellence Award', 'Leader in Targeted Therapies'],
            rating: 4.9
        },
        {
            id: 9,
            name: 'Dr. Sophia Patel',
            specialty: 'Psychiatrist',
            experience: '11 Years',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
            bio: 'Focusing on holistic mental wellness, adult psychotherapy, and cognitive behavioral therapy for all age groups.',
            education: 'MD from University of Chicago, Psychiatry Specialty at Mount Sinai',
            achievements: ['Author of "Mind Matters" book series', 'Expert in adolescent mental health', 'Keynote Speaker at World Health Summit'],
            rating: 4.8
        },
        {
            id: 10,
            name: 'Dr. Kevin Foster',
            specialty: 'Dentist',
            experience: '9 Years',
            image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
            bio: 'Expert in cosmetic dentistry, smile design, implantology, and restorative oral surgery.',
            education: 'DDS from Harvard School of Dental Medicine',
            achievements: ['Leading expert in dental implants', 'Certified in sedation dentistry', 'Top Aesthetic Dentist 2024'],
            rating: 4.6
        }
    ],
    appointments: [
        {
            id: 1,
            patientId: 1,
            doctorId: 1,
            appointmentTime: new Date(Date.now() + 86400000 * 2).toISOString().replace(/T.*/, 'T10:00:00'),
            reason: 'Annual Cardiovascular Health Checkup',
            status: 'Approved',
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            patientId: 1,
            doctorId: 4,
            appointmentTime: new Date(Date.now() + 86400000 * 5).toISOString().replace(/T.*/, 'T14:30:00'),
            reason: 'Dermatology consultation for skin rash',
            status: 'Scheduled',
            createdAt: new Date().toISOString()
        }
    ]
};

// In-memory DB state for serverless execution
let db = JSON.parse(JSON.stringify(initialData));

// Router for API endpoints
const router = express.Router();

// --- Doctors ---
router.get('/doctors', (req, res) => {
    res.json(db.doctors);
});

router.post('/doctors', (req, res) => {
    const newDoc = { 
        id: Date.now(), 
        rating: 4.8, 
        achievements: ['Certified Specialist', 'CarePlus Excellence Provider'],
        ...req.body 
    };
    db.doctors.push(newDoc);
    res.status(201).json(newDoc);
});

router.delete('/doctors/:id', (req, res) => {
    db.doctors = db.doctors.filter(d => d.id != req.params.id);
    res.json({ message: 'Doctor deleted' });
});

// --- Users ---
router.post('/users/login', (req, res) => {
    const { email, password } = req.body || {};
    const user = db.users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Invalid email or password.' });
    }
});

router.post('/users/register', (req, res) => {
    const { name, email, password, role } = req.body || {};
    const existing = db.users.find(u => u.email === email);
    if (existing) {
        return res.status(400).json({ message: 'User with this email already exists.' });
    }
    const newUser = { id: Date.now(), name, email, password, role: role || 'patient' };
    db.users.push(newUser);
    res.status(201).json(newUser);
});

// --- Appointments ---
router.get('/appointments/all', (req, res) => {
    const detailed = db.appointments.map(a => ({
        ...a,
        doctor: db.doctors.find(d => d.id == a.doctorId) || { name: 'Dr. Specialist', specialty: 'General' },
        patient: db.users.find(u => u.id == a.patientId) || { name: 'Demo Patient', email: 'patient@example.com' }
    }));
    res.json(detailed);
});

router.get('/appointments/patient/:id', (req, res) => {
    const patientId = req.params.id;
    const myAppts = db.appointments.filter(a => a.patientId == patientId);
    const detailed = myAppts.map(a => ({
        ...a,
        doctor: db.doctors.find(d => d.id == a.doctorId) || { name: 'Dr. Specialist', specialty: 'General' }
    }));
    res.json(detailed);
});

router.post('/appointments/book', (req, res) => {
    const patientId = req.query.patientId || req.body?.patientId;
    const doctorId = req.query.doctorId || req.body?.doctorId;
    const time = req.query.time || req.body?.time;
    const reason = req.query.reason || req.body?.reason || 'General Consultation';

    const newAppt = {
        id: db.appointments.length + 1,
        patientId: Number(patientId) || patientId,
        doctorId: Number(doctorId) || doctorId,
        appointmentTime: time,
        reason: decodeURIComponent(reason),
        status: 'Scheduled',
        createdAt: new Date().toISOString()
    };
    db.appointments.push(newAppt);
    res.status(201).json(newAppt);
});

router.put('/appointments/:id/status', (req, res) => {
    const status = req.query.status || req.body?.status;
    const appt = db.appointments.find(a => a.id == req.params.id);
    if (appt) {
        appt.status = status;
        res.json(appt);
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
});

router.delete('/appointments/:id', (req, res) => {
    db.appointments = db.appointments.filter(a => a.id != req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
});

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Mount router on both `/api` and `/`
app.use('/api', router);
app.use('/', router);

// Serve static assets from project root if any request reaches Express
app.use(express.static(rootDir));
app.use('/ppt', express.static(path.join(rootDir, 'ppt')));
app.use('/css', express.static(path.join(rootDir, 'css')));
app.use('/js', express.static(path.join(rootDir, 'js')));
app.use('/images', express.static(path.join(rootDir, 'images')));

// Fallback static page helper
function serveFileIfExists(res, filePath) {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(rootDir, filePath);
    if (fs.existsSync(fullPath)) {
        res.sendFile(fullPath);
    } else {
        res.status(404).send('Page Not Found');
    }
}

app.get(['/', '/index.html'], (req, res) => serveFileIfExists(res, 'index.html'));
app.get('/doctors.html', (req, res) => serveFileIfExists(res, 'doctors.html'));
app.get('/login.html', (req, res) => serveFileIfExists(res, 'login.html'));
app.get('/register.html', (req, res) => serveFileIfExists(res, 'register.html'));
app.get('/appointment.html', (req, res) => serveFileIfExists(res, 'appointment.html'));
app.get('/dashboard.html', (req, res) => serveFileIfExists(res, 'dashboard.html'));
app.get('/admin.html', (req, res) => serveFileIfExists(res, 'admin.html'));
app.get(['/ppt', '/ppt/', '/ppt/index.html'], (req, res) => serveFileIfExists(res, path.join('ppt', 'index.html')));
app.get('/ppt/presentation.html', (req, res) => serveFileIfExists(res, path.join('ppt', 'presentation.html')));

module.exports = app;
