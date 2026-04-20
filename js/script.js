
const API_BASE = 'http://localhost:8080/api';
const CURRENT_USER_KEY = 'careplus_currentUser';


const USERS_KEY = 'careplus_users';
const DOCTORS_KEY = 'careplus_doctors';
const APPOINTMENTS_KEY = 'careplus_appointments';


async function apiCall(endpoint, method = 'GET', body = null) {
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
        console.error('API Error:', error);
        throw error;
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

    if (currentUser && navLinks) {
        if (currentUser.role === 'admin') {
            navLinks.innerHTML = `
                <a href="admin.html">Dashboard</a>
                <span class="btn btn-outline" style="cursor:pointer" onclick="logout()">Logout</span>
            `;
        } else {
            navLinks.innerHTML = `
                <a href="dashboard.html" style="margin-right: 0.5rem;">Dashboard</a>
                <a href="appointment.html" class="btn btn-primary">Book Now</a>
                <span class="btn btn-outline" style="cursor:pointer" onclick="logout()">Logout</span>
            `;
        }
    }
}


function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = 'index.html';
}


document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
});
