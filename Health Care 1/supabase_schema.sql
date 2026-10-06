-- Create tables for MediAssist AI

CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  blood_group VARCHAR(10),
  contact_info TEXT,
  emergency_contact TEXT,
  allergies TEXT,
  existing_conditions TEXT,
  current_medications TEXT,
  family_history TEXT,
  status VARCHAR(50) DEFAULT 'Stable',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID, -- In a real app, this references auth.users
  symptoms JSONB,
  medical_history JSONB,
  vitals JSONB,
  ai_insights JSONB,
  doctor_notes TEXT,
  status VARCHAR(50) DEFAULT 'Pending Review',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE diagnostic_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  report_type VARCHAR(100),
  extracted_data JSONB,
  status VARCHAR(50) DEFAULT 'Processed',
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_reports ENABLE ROW LEVEL SECURITY;

-- Create policies (For development purposes, allowing all access. In production, restrict based on auth.uid())
CREATE POLICY "Allow all access to patients" ON patients FOR ALL USING (true);
CREATE POLICY "Allow all access to assessments" ON assessments FOR ALL USING (true);
CREATE POLICY "Allow all access to diagnostic_reports" ON diagnostic_reports FOR ALL USING (true);
