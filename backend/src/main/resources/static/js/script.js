
// Java Backend API Base URL
const API_BASE_URL = '/api';

const CURRENT_USER_KEY = 'careplus_currentUser';

/**
 * Unified API call function using Java Spring Boot Backend
 */
async function apiCall(endpoint, method = 'GET', body = null) {
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
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'API request failed');
        }

        // Some endpoints might return no content (DELETE)
        if (response.status === 204) return { message: 'Success' };
        
        return await response.json();
    } catch (err) {
        console.error('Backend API Error:', err.message);
        throw err;
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

