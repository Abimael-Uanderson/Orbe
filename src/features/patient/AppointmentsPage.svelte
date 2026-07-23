<script lang="ts">
  import Button from '../../design-system/components/Button.svelte';
  import Card from '../../design-system/components/Card.svelte';
  import StatusBadge from '../../design-system/components/StatusBadge.svelte';
  import ConfirmDialog from '../../design-system/components/ConfirmDialog.svelte';
  import Toast from '../../design-system/components/Toast.svelte';
  import { appointments, currentPatient } from '../../mocks/patient';
  let { onSchedule }: { onSchedule: () => void } = $props();
  let selectedAppointment = $state('');
  let pendingAction = $state<'reschedule' | 'cancel' | ''>('');
  let toast = $state('');
  function confirmAction() {
    toast = pendingAction === 'cancel' ? 'Agendamento cancelado com sucesso.' : 'Solicitação de reagendamento iniciada.';
    pendingAction = '';
    selectedAppointment = '';
  }
</script>

<div class="page">
  <header><div><p class="eyebrow">Vacinação</p><h1>Agendamentos</h1><p>Acompanhe e gerencie as próximas vacinas de {currentPatient.firstName}.</p></div><Button onclick={onSchedule}>Agendar vacina</Button></header>
  <div class="patient-pill">{currentPatient.name}<button>Alterar⌄</button></div>
  <section><h2>Próximos agendamentos</h2><div class="list">{#each appointments as appointment}<Card><article><div><StatusBadge status={appointment.status} /><h3>{appointment.vaccine}</h3><p>{appointment.dose} · {appointment.manufacturer}</p></div><dl><div><dt>Data</dt><dd>{appointment.date}</dd></div><div><dt>Horário</dt><dd>{appointment.time}</dd></div><div><dt>Local</dt><dd>{appointment.location}</dd></div></dl><div class="actions"><Button variant="secondary" size="sm">Ver detalhes</Button><Button variant="ghost" size="sm" onclick={()=>{selectedAppointment=appointment.id;pendingAction='reschedule'}}>Reagendar</Button><button class="cancel" onclick={()=>{selectedAppointment=appointment.id;pendingAction='cancel'}}>Cancelar</button></div></article></Card>{/each}</div></section>
</div>
{#if pendingAction}<ConfirmDialog title={pendingAction==='cancel'?'Cancelar agendamento?':'Reagendar atendimento?'} description={pendingAction==='cancel'?'O horário será liberado e esta ação ficará registrada no histórico.':'Você será direcionado para escolher uma nova data e horário.'} confirmLabel={pendingAction==='cancel'?'Cancelar agendamento':'Continuar'} danger={pendingAction==='cancel'} onConfirm={confirmAction} onCancel={()=>{pendingAction='';selectedAppointment=''}} />{/if}
{#if toast}<Toast message={toast} onClose={()=>toast=''}/>{/if}

<style>
  .page { width:min(100%, var(--content-max)); margin:0 auto; padding:var(--space-10); } header { display:flex; align-items:flex-end; justify-content:space-between; gap:var(--space-6); } .eyebrow { color:var(--color-brand-500); font-size:var(--text-xs); font-weight:800; text-transform:uppercase; letter-spacing:.08em; } h1 { margin-top:var(--space-2); font-size:var(--text-3xl); letter-spacing:-.04em; } header p:last-child { margin-top:var(--space-2); color:var(--text-secondary); } .patient-pill { display:inline-flex; align-items:center; gap:var(--space-3); margin-top:var(--space-8); border-radius:var(--radius-pill); background:var(--surface-subtle); padding:.55rem .8rem .55rem 1rem; font-size:var(--text-sm); font-weight:650; }.patient-pill button { border:0; background:transparent; color:var(--text-secondary); font-size:var(--text-xs); cursor:pointer; } section { margin-top:var(--space-10); } section>h2 { margin-bottom:var(--space-5); font-size:var(--text-xl); }.list { display:grid; gap:var(--space-4); } article { display:grid; grid-template-columns:1.1fr 1.5fr auto; align-items:center; gap:var(--space-6); } h3 { margin-top:var(--space-3); } article p { margin-top:var(--space-2); color:var(--text-secondary); font-size:var(--text-sm); } dl { display:grid; grid-template-columns:repeat(3, 1fr); gap:var(--space-5); margin:0; } dt { color:var(--text-tertiary); font-size:var(--text-xs); } dd { margin:.25rem 0 0; font-size:var(--text-sm); font-weight:650; }.actions { display:flex; align-items:center; gap:var(--space-2); }.cancel{border:0;background:transparent;color:var(--status-danger);font-size:var(--text-xs);font-weight:700;cursor:pointer} @media(max-width:1000px){article{grid-template-columns:1fr 1fr}.actions{grid-column:1/-1}dl{grid-template-columns:1fr}} @media(max-width:680px){.page{padding:var(--space-5)}header{align-items:flex-start;flex-direction:column}article{grid-template-columns:1fr}.actions{grid-column:auto;flex-wrap:wrap}}
</style>
