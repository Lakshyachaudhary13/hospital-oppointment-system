
const API_BASE = 'http://localhost:8080/api';
const CURRENT_USER_KEY = 'careplus_currentUser';


const USERS_KEY = 'careplus_users';
const DOCTORS_KEY = 'careplus_doctors';
const APPOINTMENTS_KEY = 'careplus_appointments';

// Embedded doctor data for static hosting (Vercel)
const STATIC_DOCTORS = [
    { 
        id: 1, name: 'Dr. Sarah Wilson', specialty: 'Cardiologist', experience: '12 Years', 
        image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=400&h=400&fit=crop',
        bio: 'Dr. Sarah Wilson is a renowned cardiologist specializing in interventional cardiology and heart failure management.',
        education: 'MD from Harvard Medical School, Residency at Mayo Clinic',
        achievements: ['Awarded Top Cardiologist 2024', 'Published 20+ research papers in JAMA', 'Pioneer in minimally invasive heart surgery'],
        rating: 4.9
    },
    { 
        id: 2, name: 'Dr. James Miller', specialty: 'Neurologist', experience: '15 Years', 
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
        bio: 'With 15 years in neurology, Dr. Miller is an expert in neuro-oncology and movement disorders.',
        education: 'MD from Johns Hopkins University, Fellowship at Oxford',
        achievements: ['National Merit in Neurology research', 'Member of American Academy of Neurology', 'Developed new protocols for stroke recovery'],
        rating: 4.8
    },
    { 
        id: 3, name: 'Dr. Elena Rodriguez', specialty: 'Pediatrician', experience: '8 Years', 
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
        bio: 'Dr. Elena is passionate about child healthcare, focusing on holistic development and preventive medicine.',
        education: 'MD from Stanford University, Pediatric Specialty at Boston Children\'s Hospital',
        achievements: ['Patient Choice Award 3 years running', 'Lead advisor for Child Wellness programs', 'Expert in pediatric allergy management'],
        rating: 5.0
    },
    { 
        id: 4, name: 'Dr. Michael Chen', specialty: 'Dermatologist', experience: '10 Years', 
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
        bio: 'Dr. Chen specializes in medical and cosmetic dermatology, providing advanced treatments for skin rejuvenation.',
        education: 'MD from Yale School of Medicine, Dermatology Training at NYU',
        achievements: ['Certified by American Board of Dermatology', 'Innovator in Laser Skin Therapy', 'Author of "The Modern Skin Guide"'],
        rating: 4.7
    }
];

const STATIC_USERS = [
    { id: 1, name: 'Demo Patient', email: 'patient@example.com', password: 'password', role: 'patient' },
    { id: 101, name: 'System Admin', email: 'admin@careplus.com', password: 'admin', role: 'admin' }
];

// Check if running on localhost (with backend) or static hosting
const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Initialize localStorage with static data if needed
function initLocalData() {
    if (!localStorage.getItem(DOCTORS_KEY)) {
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(STATIC_DOCTORS));
    }
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(STATIC_USERS));
    }
    if (!localStorage.getItem(APPOINTMENTS_KEY)) {
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([]));
    }
}

// Local data handlers for static hosting
function localApiCall(endpoint, method = 'GET', body = null) {
    // GET /doctors
    if (endpoint === '/doctors' && method === 'GET') {
        return JSON.parse(localStorage.getItem(DOCTORS_KEY)) || STATIC_DOCTORS;
    }
    // POST /doctors
    if (endpoint === '/doctors' && method === 'POST') {
        const doctors = JSON.parse(localStorage.getItem(DOCTORS_KEY)) || [];
        const newDoc = { id: Date.now(), ...body };
        doctors.push(newDoc);
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
        return newDoc;
    }
    // DELETE /doctors/:id
    if (endpoint.startsWith('/doctors/') && method === 'DELETE') {
        const id = endpoint.split('/')[2];
        let doctors = JSON.parse(localStorage.getItem(DOCTORS_KEY)) || [];
        doctors = doctors.filter(d => d.id != id);
        localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
        return { message: 'Doctor deleted' };
    }
    // POST /users/login
    if (endpoint === '/users/login' && method === 'POST') {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        const user = users.find(u => u.email === body.email && u.password === body.password);
        if (user) return user;
        throw new Error('Invalid credentials');
    }
    // POST /users/register
    if (endpoint === '/users/register' && method === 'POST') {
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        const newUser = { id: Date.now(), ...body };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return newUser;
    }
    // GET /appointments/all
    if (endpoint === '/appointments/all' && method === 'GET') {
        const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
        const doctors = JSON.parse(localStorage.getItem(DOCTORS_KEY)) || [];
        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
        return appointments.map(a => ({
            ...a,
            doctor: doctors.find(d => d.id == a.doctorId),
            patient: users.find(u => u.id == a.patientId)
        }));
    }
    // GET /appointments/patient/:id
    if (endpoint.startsWith('/appointments/patient/') && method === 'GET') {
        const patientId = endpoint.split('/')[3];
        const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
        const doctors = JSON.parse(localStorage.getItem(DOCTORS_KEY)) || [];
        const myAppts = appointments.filter(a => a.patientId == patientId);
        return myAppts.map(a => ({
            ...a,
            doctor: doctors.find(d => d.id == a.doctorId)
        }));
    }
    // POST /appointments/book (uses query-style params in body)
    if (endpoint.startsWith('/appointments/book') && method === 'POST') {
        const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
        const params = new URLSearchParams(endpoint.split('?')[1] || '');
        const newAppt = {
            id: appointments.length + 1,
            patientId: params.get('patientId') || body?.patientId,
            doctorId: params.get('doctorId') || body?.doctorId,
            appointmentTime: params.get('time') || body?.time,
            status: 'Scheduled',
            createdAt: new Date().toISOString()
        };
        appointments.push(newAppt);
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
        return newAppt;
    }
    // PUT /appointments/:id/status
    if (endpoint.match(/\/appointments\/\d+\/status/) && method === 'PUT') {
        const id = endpoint.split('/')[2];
        const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
        const appt = appointments.find(a => a.id == id);
        if (appt) {
            const params = new URLSearchParams(endpoint.split('?')[1] || '');
            appt.status = params.get('status') || body?.status;
            localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
            return appt;
        }
        throw new Error('Appointment not found');
    }
    // DELETE /appointments/:id
    if (endpoint.startsWith('/appointments/') && method === 'DELETE') {
        const id = endpoint.split('/')[2];
        let appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY)) || [];
        appointments = appointments.filter(a => a.id != id);
        localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
        return { message: 'Appointment deleted' };
    }

    return null;
}

async function apiCall(endpoint, method = 'GET', body = null) {
    // Initialize local data on first call
    initLocalData();

    // If running on static hosting, use localStorage
    if (!IS_LOCAL) {
        try {
            const result = localApiCall(endpoint, method, body);
            return result;
        } catch (error) {
            console.error('Local API Error:', error);
            throw error;
        }
    }

    // If running on localhost, try server first, fallback to local
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, options);
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        if (!response.ok) {
            throw new Error(data?.message || 'API call failed');
        }
        return data;
    } catch (error) {
        console.warn('Server unavailable, using local data:', error.message);
        try {
            return localApiCall(endpoint, method, body);
        } catch (localError) {
            console.error('Local API Error:', localError);
            throw localError;
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
    initTheme();
    renderHeader();
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
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
    
    // Toggle icon across all potential menu buttons
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

