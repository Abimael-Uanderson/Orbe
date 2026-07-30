import { appointments as seedAppointments, vaccineHistory as seedHistory } from '../mocks/patient';
import { currentPatient } from '../mocks/patient';
import { dependents } from '../mocks/portal';
import type { Appointment, VaccineHistoryItem } from '../types/domain';

export interface PersonProfile {
  id: string;
  name: string;
  relationship: string;
}
export interface StoredAppointment extends Appointment {
  patientId: string;
  createdAt: string;
  cancelledAt?: string;
  cancellationReason?: string;
  previousDate?: string;
  previousTime?: string;
}
export interface StoredHistory extends VaccineHistoryItem {
  patientId: string;
  manufacturer: string;
  professional: string;
  location: string;
}
export interface VaccineRecommendation {
  id: string;
  patientId: string;
  vaccine: string;
  dose: string;
  dueLabel: string;
  reason: string;
  status: 'scheduled' | 'recommended' | 'review';
}

const APPOINTMENTS_KEY = 'orbe-db-appointments';
const HISTORY_KEY = 'orbe-db-vaccine-history';

export const people: PersonProfile[] = [
  { id: currentPatient.id, name: currentPatient.name, relationship: 'Titular' },
  ...dependents.map((person) => ({ id: person.id, name: person.name, relationship: person.relationship })),
];

function read<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('orbe-data-changed', { detail: { key } }));
}

function appointmentSeeds(): StoredAppointment[] {
  return seedAppointments.map((item) => ({
    ...item,
    patientId: currentPatient.id,
    createdAt: '2026-07-20T10:00:00.000Z',
  }));
}
function historySeeds(): StoredHistory[] {
  return [
    ...seedHistory.map((item) => ({
      ...item,
      patientId: currentPatient.id,
      manufacturer: item.vaccine === 'COVID-19' ? 'Pfizer' : 'Fiocruz',
      professional: 'Dra. Ana Ribeiro',
      location: 'Orbe Centro',
    })),
    {
      id: 'dep-app-001',
      patientId: 'dep-001',
      vaccine: 'Influenza pediátrica',
      dose: 'Dose anual',
      date: '12/04/2026',
      batch: 'INF260412',
      manufacturer: 'Sanofi Pasteur',
      professional: 'Dra. Ana Ribeiro',
      location: 'Orbe Centro',
    },
    {
      id: 'dep-app-002',
      patientId: 'dep-001',
      vaccine: 'Tríplice viral',
      dose: '2ª dose',
      date: '08/02/2024',
      batch: 'TV240208',
      manufacturer: 'Fiocruz',
      professional: 'Enf. Carla Dias',
      location: 'Orbe Centro',
    },
    {
      id: 'dep-app-003',
      patientId: 'dep-002',
      vaccine: 'Pentavalente',
      dose: '3ª dose',
      date: '02/11/2022',
      batch: 'PENTA221102',
      manufacturer: 'Instituto Butantan',
      professional: 'Enf. Carla Dias',
      location: 'Orbe Centro',
    },
  ];
}

export function listAppointments(patientId?: string): StoredAppointment[] {
  const items = read(APPOINTMENTS_KEY, appointmentSeeds());
  return patientId ? items.filter((item) => item.patientId === patientId) : items;
}
export function createAppointment(input: Omit<StoredAppointment, 'id' | 'createdAt'>): StoredAppointment {
  const item = { ...input, id: `apt-${Date.now()}`, createdAt: new Date().toISOString() };
  write(APPOINTMENTS_KEY, [item, ...listAppointments()]);
  return item;
}
export function cancelAppointment(id: string, reason: string): StoredAppointment | undefined {
  let changed: StoredAppointment | undefined;
  const items = listAppointments().map((item) => {
    if (item.id !== id) return item;
    changed = { ...item, status: 'cancelled', cancelledAt: new Date().toISOString(), cancellationReason: reason };
    return changed;
  });
  write(APPOINTMENTS_KEY, items);
  return changed;
}
export function rescheduleAppointment(id: string, date: string, time: string): StoredAppointment | undefined {
  let changed: StoredAppointment | undefined;
  const items = listAppointments().map((item) => {
    if (item.id !== id) return item;
    changed = { ...item, previousDate: item.date, previousTime: item.time, date, time, status: 'confirmed' };
    return changed;
  });
  write(APPOINTMENTS_KEY, items);
  return changed;
}
export function listHistory(patientId: string): StoredHistory[] {
  return read(HISTORY_KEY, historySeeds()).filter((item) => item.patientId === patientId);
}

const recommendations: VaccineRecommendation[] = [
  {
    id: 'rec-001',
    patientId: 'patient-001',
    vaccine: 'Influenza tetravalente',
    dose: 'Dose anual',
    dueLabel: 'Agendada para 28/07/2026',
    reason: 'Proteção anual contra influenza',
    status: 'scheduled',
  },
  {
    id: 'rec-002',
    patientId: 'patient-001',
    vaccine: 'Hepatite B',
    dose: '2ª dose',
    dueLabel: 'Agendada para 12/08/2026',
    reason: 'Continuidade do esquema iniciado',
    status: 'scheduled',
  },
  {
    id: 'rec-003',
    patientId: 'dep-001',
    vaccine: 'Influenza pediátrica',
    dose: 'Dose anual',
    dueLabel: 'Recomendada em agosto de 2026',
    reason: 'Campanha anual de vacinação',
    status: 'recommended',
  },
  {
    id: 'rec-004',
    patientId: 'dep-001',
    vaccine: 'HPV',
    dose: 'Avaliação do esquema',
    dueLabel: 'Revisar na próxima consulta',
    reason: 'Confirmar indicação conforme idade e histórico',
    status: 'review',
  },
  {
    id: 'rec-005',
    patientId: 'dep-002',
    vaccine: 'Influenza pediátrica',
    dose: 'Dose anual',
    dueLabel: 'Recomendada em agosto de 2026',
    reason: 'Campanha anual de vacinação',
    status: 'recommended',
  },
  {
    id: 'rec-006',
    patientId: 'dep-002',
    vaccine: 'Tríplice viral',
    dose: 'Revisão da 2ª dose',
    dueLabel: 'Revisar na próxima consulta',
    reason: 'Validar registros da caderneta física',
    status: 'review',
  },
];

export function listRecommendations(patientId: string): VaccineRecommendation[] {
  return recommendations.filter((item) => item.patientId === patientId);
}
