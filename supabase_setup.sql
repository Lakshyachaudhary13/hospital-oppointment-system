-- CarePlus Hospital System - Supabase Setup
-- Run this in Supabase SQL Editor

-- 1. Users Table
CREATE TABLE IF NOT EXISTS hosp_users (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'patient' CHECK (role IN ('patient', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Doctors Table
CREATE TABLE IF NOT EXISTS hosp_doctors (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    experience TEXT,
    image TEXT,
    bio TEXT,
    education TEXT,
    achievements TEXT[],
    rating NUMERIC(2,1) DEFAULT 4.5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Appointments Table
CREATE TABLE IF NOT EXISTS hosp_appointments (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT REFERENCES hosp_users(id) ON DELETE CASCADE,
    doctor_id BIGINT REFERENCES hosp_doctors(id) ON DELETE CASCADE,
    appointment_time TEXT NOT NULL,
    status TEXT DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Approved', 'Rejected', 'Cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Insert Default Users
INSERT INTO hosp_users (name, email, password, role) VALUES
    ('Demo Patient', 'patient@example.com', 'password', 'patient'),
    ('System Admin', 'admin@careplus.com', 'admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 5. Insert Default Doctors
INSERT INTO hosp_doctors (name, specialty, experience, image, bio, education, achievements, rating) VALUES
    (
        'Dr. Sarah Wilson', 'Cardiologist', '12 Years',
        'https://images.unsplash.com/photo-1559839734-2b71f1536783?w=400&h=400&fit=crop',
        'Dr. Sarah Wilson is a renowned cardiologist specializing in interventional cardiology and heart failure management.',
        'MD from Harvard Medical School, Residency at Mayo Clinic',
        ARRAY['Awarded Top Cardiologist 2024', 'Published 20+ research papers in JAMA', 'Pioneer in minimally invasive heart surgery'],
        4.9
    ),
    (
        'Dr. James Miller', 'Neurologist', '15 Years',
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
        'With 15 years in neurology, Dr. Miller is an expert in neuro-oncology and movement disorders.',
        'MD from Johns Hopkins University, Fellowship at Oxford',
        ARRAY['National Merit in Neurology research', 'Member of American Academy of Neurology', 'Developed new protocols for stroke recovery'],
        4.8
    ),
    (
        'Dr. Elena Rodriguez', 'Pediatrician', '8 Years',
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
        'Dr. Elena is passionate about child healthcare, focusing on holistic development and preventive medicine.',
        'MD from Stanford University, Pediatric Specialty at Boston Children''s Hospital',
        ARRAY['Patient Choice Award 3 years running', 'Lead advisor for Child Wellness programs', 'Expert in pediatric allergy management'],
        5.0
    ),
    (
        'Dr. Michael Chen', 'Dermatologist', '10 Years',
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
        'Dr. Chen specializes in medical and cosmetic dermatology, providing advanced treatments for skin rejuvenation.',
        'MD from Yale School of Medicine, Dermatology Training at NYU',
        ARRAY['Certified by American Board of Dermatology', 'Innovator in Laser Skin Therapy', 'Author of "The Modern Skin Guide"'],
        4.7
    );

-- 6. Enable Row Level Security (RLS) - Allow public read/write for demo
ALTER TABLE hosp_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosp_doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE hosp_appointments ENABLE ROW LEVEL SECURITY;

-- Allow all operations for demo (you can restrict later)
CREATE POLICY "Allow all users" ON hosp_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all doctors" ON hosp_doctors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all appointments" ON hosp_appointments FOR ALL USING (true) WITH CHECK (true);
