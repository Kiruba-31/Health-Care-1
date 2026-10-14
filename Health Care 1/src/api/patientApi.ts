import axios from 'axios';

const REST_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api/patients`
  : 'https://park-conversations-developmental-instrument.trycloudflare.com/api/patients';

export interface Patient {
  id?: number;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

// GET all patients from Spring Boot
export const getPatients = () => {
  return axios.get<Patient[]>(REST_API_BASE_URL);
};

// Alias for getPatients so either name works
export const listPatients = getPatients;

// POST a new patient to Spring Boot
export const createPatient = (patient: Patient) => {
  return axios.post<Patient>(REST_API_BASE_URL, patient);
};