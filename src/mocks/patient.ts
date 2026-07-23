import type { Appointment, Patient, VaccineHistoryItem } from '../types/domain';

export const currentPatient: Patient = {
  id: 'patient-001',
  name: 'Mariana Souza',
  firstName: 'Mariana'
};

export const appointments: Appointment[] = [
  {
    id: 'apt-001',
    vaccine: 'Influenza tetravalente',
    manufacturer: 'Sanofi Pasteur',
    date: '28 de julho de 2026',
    time: '09:30',
    location: 'Unidade Centro · Sala 02',
    dose: 'Dose anual',
    status: 'confirmed'
  },
  {
    id: 'apt-002',
    vaccine: 'Hepatite B',
    manufacturer: 'Instituto Butantan',
    date: '12 de agosto de 2026',
    time: '14:00',
    location: 'Unidade Centro · Sala 01',
    dose: '2ª dose',
    status: 'pending'
  }
];

export const vaccineHistory: VaccineHistoryItem[] = [
  { id: 'app-001', vaccine: 'COVID-19', dose: 'Reforço', date: '18/03/2026', batch: 'CX2026-0318' },
  { id: 'app-002', vaccine: 'Febre amarela', dose: 'Dose única', date: '10/01/2025', batch: 'FA250110' }
];
