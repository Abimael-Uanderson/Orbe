import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cancelAppointment,
  createAppointment,
  listAppointments,
  listHistory,
  listRecommendations,
  rescheduleAppointment,
} from './patientRepository';

const storage = new Map<string, string>();

beforeEach(() => {
  storage.clear();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
  });
  vi.stubGlobal('window', { dispatchEvent: vi.fn() });
  vi.stubGlobal(
    'CustomEvent',
    class {
      constructor(
        public type: string,
        public init: unknown,
      ) {}
    },
  );
});

describe('repositório do paciente', () => {
  it('cria um agendamento persistente', () => {
    const created = createAppointment({
      patientId: 'dep-001',
      vaccine: 'HPV',
      manufacturer: 'MSD',
      date: '5 de agosto de 2026',
      time: '10:00',
      location: 'Unidade Centro',
      dose: '1ª dose',
      status: 'confirmed',
    });
    expect(listAppointments('dep-001')).toContainEqual(created);
  });

  it('cancela sem excluir o agendamento', () => {
    const original = listAppointments()[0];
    cancelAppointment(original.id, 'Imprevisto pessoal');
    const cancelled = listAppointments().find((item) => item.id === original.id);
    expect(cancelled?.status).toBe('cancelled');
    expect(cancelled?.cancellationReason).toBe('Imprevisto pessoal');
  });

  it('reagenda preservando data e horário anteriores', () => {
    const original = listAppointments()[0];
    rescheduleAppointment(original.id, '5 de agosto de 2026', '14:30');
    const updated = listAppointments().find((item) => item.id === original.id);
    expect(updated?.previousDate).toBe(original.date);
    expect(updated?.previousTime).toBe(original.time);
    expect(updated?.time).toBe('14:30');
  });

  it('mantém carteiras independentes para os dependentes', () => {
    expect(listHistory('dep-001').length).toBeGreaterThan(0);
    expect(listHistory('dep-002').length).toBeGreaterThan(0);
    expect(listHistory('dep-001')).not.toEqual(listHistory('dep-002'));
  });

  it('explica as recomendações individualmente', () => {
    const items = listRecommendations('dep-002');
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => item.vaccine && item.dose && item.dueLabel && item.reason)).toBe(true);
  });
});
