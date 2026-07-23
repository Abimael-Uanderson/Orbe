export type ThemePreference = 'light' | 'dark' | 'system';

export function getThemePreference(): ThemePreference {
  const stored = localStorage.getItem('orbe-theme');
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
}

export function applyTheme(preference: ThemePreference): void {
  const dark = preference === 'dark' || (preference === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  localStorage.setItem('orbe-theme', preference);
}
