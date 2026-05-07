
// Supabase Configuration
const SUPABASE_URL = 'https://pzxwgimfeoqfdjhkogsp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_fPSOGc0rOV_3iQfT7pgS6Q_K4fLWIQ7';

// Initialize Supabase Client
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const CURRENT_USER_KEY = 'careplus_currentUser';

// Use prefixed tables to avoid conflicts with previous project
const USERS_TABLE = 'users';
const DOCTORS_TABLE = 'doctors';
const APPOINTMENTS_TABLE = 'appointments';

/**
 * Unified API call function using Supabase
 */
async function apiCall(endpoint, method = 'GET', body = null) {
    if (!supabaseClient) {
        console.error('Supabase not initialized.');
        throw new Error('Database connection failed');
    }

    try {
        // --- LOGIN ---
        if (endpoint === '/users/login' && method === 'POST') {
            const { data, error } = await supabaseClient
                .from(USERS_TABLE)
                .select('*')
                .eq('email', body.email)
                .eq('password', body.password)
                .single();
            
            if (error || !data) throw new Error('Invalid email or password');
            return data;
        }

        // --- REGISTER ---
        if (endpoint === '/users/register' && method === 'POST') {
            const { data, error } = await supabaseClient
                .from(USERS_TABLE)
                .insert([body])
                .select()
                .single();
            
            if (error) throw new Error('Registration failed: ' + error.message);
            return data;
        }

        // --- DOCTORS ---
        if (endpoint === '/doctors' && method === 'GET') {
            const { data, error } = await supabaseClient
                .from(DOCTORS_TABLE)
                .select('*')
                .order('name');
            
            if (error) throw error;
            return data;
        }

        if (endpoint === '/doctors' && method === 'POST') {
            const { data, error } = await supabaseClient
                .from(DOCTORS_TABLE)
                .insert([body])
                .select()
                .single();
            if (error) throw error;
            return data;
        }

        if (endpoint.startsWith('/doctors/') && method === 'DELETE') {
            const id = endpoint.split('/')[2];
            const { error } = await supabaseClient
                .from(DOCTORS_TABLE)
                .delete()
                .eq('id', id);
            if (error) throw error;
            return { message: 'Doctor deleted' };
        }

        // --- APPOINTMENTS ---
        if (endpoint === '/appointments/all' && method === 'GET') {
            const { data, error } = await supabaseClient
                .from(APPOINTMENTS_TABLE)
                .select(`
                    *,
                    doctor:doctor_id (*),
                    patient:patient_id (*)
                `)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data.map(item => ({
                id: item.id,
                appointmentTime: item.appointment_time,
                status: item.status,
                doctor: item.doctor,
                patient: item.patient
            }));
        }

        if (endpoint.startsWith('/appointments/patient/') && method === 'GET') {
            const patientId = endpoint.split('/')[3];
            const { data, error } = await supabaseClient
                .from(APPOINTMENTS_TABLE)
                .select(`
                    *,
                    doctor:doctor_id (*)
                `)
                .eq('patient_id', patientId)
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data.map(item => ({
                id: item.id,
                appointmentTime: item.appointment_time,
                status: item.status,
                doctor: item.doctor
            }));
        }

        if (endpoint.startsWith('/appointments/book') && method === 'POST') {
            const params = new URLSearchParams(endpoint.split('?')[1] || '');
            const payload = {
                patient_id: params.get('patientId') || body?.patientId,
                doctor_id: params.get('doctorId') || body?.doctorId,
                appointment_time: params.get('time') || body?.time,
                status: 'Scheduled'
            };

            const { data, error } = await supabaseClient
                .from(APPOINTMENTS_TABLE)
                .insert([payload])
                .select()
                .single();
            
            if (error) throw error;
            return data;
        }

        if (endpoint.match(/\/appointments\/\d+\/status/) && method === 'PUT') {
            const id = endpoint.split('/')[2];
            const params = new URLSearchParams(endpoint.split('?')[1] || '');
            const newStatus = params.get('status') || body?.status;

            const { data, error } = await supabaseClient
                .from(APPOINTMENTS_TABLE)
                .update({ status: newStatus })
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        }

        if (endpoint.startsWith('/appointments/') && method === 'DELETE') {
            const id = endpoint.split('/')[2];
            const { error } = await supabaseClient
                .from(APPOINTMENTS_TABLE)
                .delete()
                .eq('id', id);
            if (error) throw error;
            return { message: 'Appointment deleted' };
        }

    } catch (err) {
        console.error('Supabase API Error:', err.message);
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

