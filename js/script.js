// CarePlus System - Core Script & Unified API Engine
const API_BASE_URL = '/api';
const CURRENT_USER_KEY = 'careplus_currentUser';
const DOCTORS_KEY = 'careplus_doctors';
const USERS_KEY = 'careplus_users';
const APPOINTMENTS_KEY = 'careplus_appointments';

// Initial Dataset for CarePlus Demo Presentation
const STATIC_DOCTORS = [
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
];

const STATIC_USERS = [
    { id: 1, name: 'Demo Patient', email: 'patient@example.com', password: 'password', role: 'patient' },
    { id: 101, name: 'System Admin', email: 'admin@careplus.com', password: 'admin', role: 'admin' }
];

const STATIC_APPOINTMENTS = [
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
];

// Initialize localStorage with complete static presentation data
function initLocalData() {
    if (!localStorage.getItem(DOCTORS_KEY) || JSON.parse(localStorage.getItem(DOCTORS_KEY)).length < 5) {
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(STATIC_DOCTORS));
    }
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(STATIC_USERS));
    }
    if (!localStorage.getItem(APPOINTMENTS_KEY)) {
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(STATIC_APPOINTMENTS));
    }
}

// Client-side Local API engine for presentation reliability
function localApiCall(endpoint, method = 'GET', body = null) {
    initLocalData();

    // 1. GET /doctors
    if (endpoint === '/doctors' && method === 'GET') {
        return JSON.parse(localStorage.getItem(DOCTORS_KEY)) || STATIC_DOCTORS;
    }

    // 2. POST /doctors
    if (endpoint === '/doctors' && method === 'POST') {
        const doctors = JSON.parse(localStorage.getItem(DOCTORS_KEY)) || STATIC_DOCTORS;
        const newDoc = { 
            id: Date.now(), 
            rating: 4.8, 
            achievements: ['Certified Specialist', 'CarePlus Excellence Provider'],
            bio: `${body.name} is a dedicated healthcare specialist in ${body.specialty} with ${body.experience} of clinical experience.`,
            education: 'MD from Accredited Medical University',
            ...body 
        };
        doctors.push(newDoc);
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
        return newDoc;
    }

    // 3. DELETE /doctors/:id
    if (endpoint.startsWith('/doctors/') && method === 'DELETE') {
        const id = endpoint.split('/')[2];
        let doctors = JSON.parse(localStorage.getItem(DOCTORS_KEY)) || STATIC_DOCTORS;
        doctors = doctors.filter(d => d.id != id);
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
        return { message: 'Doctor deleted successfully' };
    }

    // 4. POST /users/login
    if (endpoint === '/users/login' && method === 'POST') {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || STATIC_USERS;
        const user = users.find(u => u.email.toLowerCase() === (body?.email || '').toLowerCase() && u.password === body?.password);
        if (user) return user;
        throw new Error('Invalid email or password.');
    }

    // 5. POST /users/register
    if (endpoint === '/users/register' && method === 'POST') {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || STATIC_USERS;
        const exists = users.find(u => u.email.toLowerCase() === (body?.email || '').toLowerCase());
        if (exists) {
            throw new Error('An account with this email address already exists.');
        }
        const newUser = { id: Date.now(), ...body, role: body?.role || 'patient' };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return newUser;
    }

    // 6. GET /appointments/all
    if (endpoint === '/appointments/all' && method === 'GET') {
        const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || STATIC_APPOINTMENTS;
        const doctors = JSON.parse(localStorage.getItem(DOCTORS_KEY)) || STATIC_DOCTORS;
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || STATIC_USERS;

        return appointments.map(a => ({
            ...a,
            doctor: doctors.find(d => d.id == a.doctorId) || { name: 'Dr. Specialist', specialty: 'General' },
            patient: users.find(u => u.id == a.patientId) || { name: 'Demo Patient', email: 'patient@example.com' }
        }));
    }

    // 7. GET /appointments/patient/:id
    if (endpoint.startsWith('/appointments/patient/') && method === 'GET') {
        const patientId = endpoint.split('/')[3];
        const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || STATIC_APPOINTMENTS;
        const doctors = JSON.parse(localStorage.getItem(DOCTORS_KEY)) || STATIC_DOCTORS;

        const myAppts = appointments.filter(a => a.patientId == patientId);
        return myAppts.map(a => ({
            ...a,
            doctor: doctors.find(d => d.id == a.doctorId) || { name: 'Dr. Specialist', specialty: 'General' }
        }));
    }

    // 8. POST /appointments/book
    if (endpoint.startsWith('/appointments/book') && method === 'POST') {
        const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || STATIC_APPOINTMENTS;
        const urlParams = new URLSearchParams(endpoint.includes('?') ? endpoint.split('?')[1] : '');

        const patientId = urlParams.get('patientId') || body?.patientId;
        const doctorId = urlParams.get('doctorId') || body?.doctorId;
        const time = urlParams.get('time') || body?.time;
        const reason = urlParams.get('reason') || body?.reason || 'Medical Consultation';

        const newAppt = {
            id: appointments.length + 1,
            patientId: Number(patientId) || patientId,
            doctorId: Number(doctorId) || doctorId,
            appointmentTime: time,
            reason: decodeURIComponent(reason),
            status: 'Scheduled',
            createdAt: new Date().toISOString()
        };

        appointments.push(newAppt);
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
        return newAppt;
    }

    // 9. PUT /appointments/:id/status
    if (endpoint.includes('/appointments/') && endpoint.includes('/status') && method === 'PUT') {
        const id = endpoint.split('/')[2];
        const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || STATIC_APPOINTMENTS;
        const appt = appointments.find(a => a.id == id);
        if (appt) {
            const urlParams = new URLSearchParams(endpoint.includes('?') ? endpoint.split('?')[1] : '');
            appt.status = urlParams.get('status') || body?.status || 'Approved';
            localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
            return appt;
        }
        throw new Error('Appointment not found');
    }

    // 10. DELETE /appointments/:id
    if (endpoint.startsWith('/appointments/') && method === 'DELETE') {
        const id = endpoint.split('/')[2];
        let appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || STATIC_APPOINTMENTS;
        appointments = appointments.filter(a => a.id != id);
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
        return { message: 'Appointment cancelled successfully' };
    }

    return null;
}

/**
 * Resilient Unified API call function
 * Attempts backend API first, automatically falls back to client storage on failure
 */
async function apiCall(endpoint, method = 'GET', body = null) {
    initLocalData();
    const url = `${API_BASE_URL}${endpoint}`;
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            // If backend returned 404/500/etc, use local storage fallback
            const errorData = await response.json().catch(() => ({}));
            // If it's a 401 on login or 400 on register, let the real message through
            if (response.status === 401 || response.status === 400) {
                throw new Error(errorData.message || 'Authentication error');
            }
            // For other HTTP errors (404 on Vercel), fall back to local
            console.warn(`API returned ${response.status}, falling back to local client engine`);
            return localApiCall(endpoint, method, body);
        }

        if (response.status === 204) return { message: 'Success' };
        
        return await response.json();
    } catch (err) {
        // If it's an explicit login/register error thrown above, rethrow it
        if (err.message === 'Invalid email or password.' || err.message.includes('already exists')) {
            throw err;
        }
        
        // On network error or Vercel 404, gracefully fall back to local storage engine
        console.warn('API fetch unavailable, using client storage engine:', err.message);
        try {
            return localApiCall(endpoint, method, body);
        } catch (localErr) {
            console.error('Local Engine Error:', localErr.message);
            throw localErr;
        }
    }
}

function checkAuth(requireRole = null) {
    const defaultPages = ['/index.html', '/login.html', '/register.html', '/'];
    const currentPath = window.location.pathname;

    if (defaultPages.some(page => currentPath.endsWith(page))) {
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    if (requireRole && currentUser.role !== requireRole) {
        alert('Access Denied. Redirecting to your dashboard.');
        window.location.href = currentUser.role === 'admin' ? 'admin.html' : 'dashboard.html';
    }
}

function renderHeader() {
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Remove existing profile if it exists
    const existingProfile = document.querySelector('.user-profile-nav');
    if (existingProfile) existingProfile.remove();

    if (currentUser) {
        const profileDiv = document.createElement('div');
        profileDiv.className = 'user-profile-nav';
        profileDiv.style.display = 'flex';
        profileDiv.style.alignItems = 'center';
        profileDiv.style.gap = '1.25rem';
        profileDiv.style.marginRight = '1rem';
        
        const initials = currentUser.name.charAt(0).toUpperCase();
        
        profileDiv.innerHTML = `
            <div class="notifications hidden-mobile" style="color: var(--light-text); cursor: pointer; position: relative;">
                <i class="fa-solid fa-bell"></i>
                <span style="position: absolute; top: -6px; right: -6px; width: 8px; height: 8px; background: var(--accent); border-radius: 50%; border: 2px solid var(--white);"></span>
            </div>
            <div style="text-align: right; line-height: 1.2;" class="hidden-mobile">
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--dark);">${currentUser.name}</div>
                <a href="${currentUser.role === 'admin' ? 'admin.html' : 'dashboard.html'}" style="font-size: 0.75rem; font-weight: 600; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px;">Dashboard</a>
            </div>
            <div style="width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; border: 2px solid var(--primary-light); box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);">
                ${initials}
            </div>
        `;
        navLinks.prepend(profileDiv);
    }
}

function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    initLocalData();
    initTheme();
    renderHeader();
    
    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

function initTheme() {
    const savedTheme = localStorage.getItem('careplus_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('careplus_theme', newTheme);
    
    // Update icons if any
    const moonIcon = document.querySelector('.theme-toggle i');
    if (moonIcon) {
        moonIcon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    sidebar.classList.toggle('active');
    
    const icons = document.querySelectorAll('.menu-toggle i');
    icons.forEach(icon => {
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-equals');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-equals');
        }
    });
}
