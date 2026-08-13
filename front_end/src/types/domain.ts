export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export interface Patient {
  id: string;
  name: string;
  firstName: string;
}

export interface Appointment {
  id: string;
  vaccine: string;
  manufacturer: string;
  date: string;
  time: string;
  location: string;
  dose: string;
  status: AppointmentStatus;
}

export interface VaccineHistoryItem {
  id: string;
  vaccine: string;
  dose: string;
  date: string;
  batch: string;
}
