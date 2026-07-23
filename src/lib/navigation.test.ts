import { describe, expect, it } from 'vitest';
import { pageFromPath, pathAllowedForRole, roleFromPath } from './navigation';

describe('navegação por perfil', () => {
  it('resolve URLs conhecidas', () => {
    expect(pageFromPath('/paciente/agendamentos')).toBe('appointments');
    expect(pageFromPath('/funcionario/agenda')).toBe('staff-agenda');
    expect(pageFromPath('/admin/estoque')).toBe('admin-stock');
  });

  it('identifica páginas inexistentes', () => {
    expect(pageFromPath('/rota-inexistente')).toBe('not-found');
  });

  it('infere o perfil pela área', () => {
    expect(roleFromPath('/admin/dashboard')).toBe('admin');
    expect(roleFromPath('/funcionario/agenda')).toBe('employee');
    expect(roleFromPath('/paciente/inicio')).toBe('patient');
  });

  it('bloqueia acesso cruzado entre perfis', () => {
    expect(pathAllowedForRole('/admin/dashboard', 'patient')).toBe(false);
    expect(pathAllowedForRole('/funcionario/agenda', 'admin')).toBe(false);
    expect(pathAllowedForRole('/paciente/inicio', 'employee')).toBe(false);
    expect(pathAllowedForRole('/admin/dashboard', 'admin')).toBe(true);
  });
});
