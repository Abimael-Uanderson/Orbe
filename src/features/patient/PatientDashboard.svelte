<script lang="ts">
  import Button from '../../design-system/components/Button.svelte';
  import Card from '../../design-system/components/Card.svelte';
  import StatusBadge from '../../design-system/components/StatusBadge.svelte';
  import { appointments, currentPatient, vaccineHistory } from '../../mocks/patient';
  let { onNavigate }: { onNavigate: (page: string) => void } = $props();
</script>

<div class="page">
  <header class="page-header">
    <div><p class="eyebrow">Portal do paciente</p><h1>Boa noite, {currentPatient.firstName}</h1><p class="subtitle">Acompanhe seus agendamentos e mantenha sua vacinação em dia.</p></div>
    <Button onclick={() => onNavigate('appointments')}>Agendar vacina</Button>
  </header>

  <section class="hero-grid" aria-label="Destaques">
    <article class="hero primary"><span class="hero-icon">✦</span><div><p>Próximo agendamento</p><h2>{appointments[0].vaccine}</h2><strong>{appointments[0].date} às {appointments[0].time}</strong></div><button onclick={() => onNavigate('appointments')}>Ver detalhes →</button></article>
    <article class="hero accent"><span class="hero-icon">✓</span><div><p>Sua carteira, sempre com você</p><h2>Histórico de vacinação</h2><strong>{vaccineHistory.length} aplicações registradas</strong></div><button onclick={() => onNavigate('history')}>Acessar carteira →</button></article>
    <article class="hero navy"><span class="hero-icon">◎</span><div><p>Proteção para sua família</p><h2>Gerencie dependentes</h2><strong>Agende e acompanhe em um só lugar</strong></div><button onclick={() => onNavigate('family')}>Minha família →</button></article>
  </section>

  <section class="section">
    <div class="section-heading"><div><h2>Próximos agendamentos</h2><p>Seus atendimentos confirmados e pendentes.</p></div><button class="text-link" onclick={() => onNavigate('appointments')}>Ver todos</button></div>
    <div class="appointment-grid">
      {#each appointments as appointment}
        <Card>
          <div class="appointment-card"><div class="date-box"><strong>{appointment.date.split(' ')[0]}</strong><span>{appointment.date.split(' ')[2].slice(0, 3)}</span></div><div class="appointment-info"><div class="appointment-title"><h3>{appointment.vaccine}</h3><StatusBadge status={appointment.status} /></div><p>{appointment.dose} · {appointment.time}</p><small>{appointment.location}</small></div></div>
        </Card>
      {/each}
    </div>
  </section>

  <section class="section">
    <div class="section-heading"><div><h2>Acessos rápidos</h2><p>Encontre o que precisa sem complicação.</p></div></div>
    <div class="shortcut-grid">
      {#each [{ icon:'✚', label:'Agendar vacina', page:'appointments' }, { icon:'▤', label:'Carteira vacinal', page:'history' }, { icon:'♧', label:'Minha família', page:'family' }, { icon:'◇', label:'Meus convênios', page:'insurance' }] as item}
        <button onclick={() => onNavigate(item.page)}><span>{item.icon}</span>{item.label}</button>
      {/each}
    </div>
  </section>
</div>

<style>
  .page { width:min(100%, var(--content-max)); margin:0 auto; padding:var(--space-10); }
  .page-header, .section-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:var(--space-6); }
  .eyebrow { margin-bottom:var(--space-2); color:var(--color-brand-500); font-size:var(--text-xs); font-weight:800; letter-spacing:.08em; text-transform:uppercase; }
  h1 { font-size:clamp(var(--text-2xl), 3vw, var(--text-3xl)); line-height:var(--leading-tight); letter-spacing:-.035em; }
  .subtitle, .section-heading p { margin-top:var(--space-2); color:var(--text-secondary); line-height:var(--leading-normal); }
  .hero-grid { display:grid; grid-template-columns:1.15fr 1fr 1fr; gap:var(--space-4); margin-top:var(--space-10); }
  .hero { display:flex; min-height:15.5rem; flex-direction:column; justify-content:space-between; overflow:hidden; border-radius:var(--radius-xl); padding:var(--space-6); box-shadow:var(--shadow-md); }
  .hero.primary { background:var(--color-brand-500); color:white; } .hero.accent { background:var(--color-accent-400); color:#111827; } .hero.navy { background:var(--color-navy-900); color:white; }
  .hero-icon { display:grid; width:2.75rem; height:2.75rem; place-items:center; border:1px solid currentColor; border-radius:var(--radius-md); font-size:1.2rem; opacity:.9; }
  .hero p { margin-bottom:var(--space-2); font-size:var(--text-xs); opacity:.78; }
  .hero h2 { max-width:15rem; font-size:var(--text-xl); line-height:1.25; }
  .hero strong { display:block; margin-top:var(--space-3); font-size:var(--text-xs); line-height:1.5; opacity:.82; }
  .hero button { align-self:flex-start; border:0; border-bottom:1px solid currentColor; background:transparent; padding:.25rem 0; color:inherit; font-size:var(--text-xs); font-weight:750; cursor:pointer; }
  .section { margin-top:var(--space-12); }
  .section-heading { margin-bottom:var(--space-5); }
  .section-heading h2 { font-size:var(--text-xl); letter-spacing:-.02em; }
  .section-heading p { font-size:var(--text-sm); }
  .text-link { border:0; background:transparent; color:var(--color-brand-500); font-size:var(--text-sm); font-weight:700; cursor:pointer; }
  .appointment-grid { display:grid; grid-template-columns:repeat(2, 1fr); gap:var(--space-4); }
  .appointment-card { display:flex; align-items:center; gap:var(--space-5); }
  .date-box { display:grid; min-width:4rem; min-height:4rem; place-content:center; border-radius:var(--radius-md); background:var(--color-brand-50); color:var(--color-brand-600); text-align:center; }
  :global([data-theme='dark']) .date-box { background:rgb(17 124 111 / .2); color:#70c9bd; }
  .date-box strong { font-size:var(--text-xl); line-height:1; } .date-box span { margin-top:.2rem; font-size:var(--text-xs); text-transform:uppercase; }
  .appointment-info { min-width:0; flex:1; }.appointment-title { display:flex; align-items:flex-start; justify-content:space-between; gap:var(--space-3); }.appointment-title h3 { font-size:var(--text-md); }
  .appointment-info p { margin-top:var(--space-2); color:var(--text-secondary); font-size:var(--text-sm); }.appointment-info small { display:block; margin-top:var(--space-1); color:var(--text-tertiary); }
  .shortcut-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:var(--space-4); }
  .shortcut-grid button { display:flex; min-height:7rem; flex-direction:column; align-items:flex-start; justify-content:space-between; border:1px solid var(--border-subtle); border-radius:var(--radius-lg); background:var(--surface-card); padding:var(--space-5); color:var(--text-primary); font-size:var(--text-sm); font-weight:700; cursor:pointer; box-shadow:var(--shadow-sm); transition:transform var(--transition-fast), border-color var(--transition-fast); }
  .shortcut-grid button:hover { transform:translateY(-2px); border-color:var(--color-brand-500); }.shortcut-grid span { color:var(--color-brand-500); font-size:1.35rem; }
  @media (max-width: 1100px) { .hero-grid { grid-template-columns:repeat(2, 1fr); }.hero:last-child { grid-column:1 / -1; min-height:12rem; }.shortcut-grid { grid-template-columns:repeat(2, 1fr); } }
  @media (max-width: 680px) { .page { padding:var(--space-5); }.page-header { align-items:flex-start; flex-direction:column; }.hero-grid, .appointment-grid { grid-template-columns:1fr; }.hero:last-child { grid-column:auto; }.hero { min-height:13.5rem; }.shortcut-grid { grid-template-columns:1fr 1fr; }.appointment-title { flex-direction:column; }.section-heading { align-items:flex-start; } }
</style>
