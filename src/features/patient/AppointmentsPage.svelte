<script lang="ts">
  import Button from '../../design-system/components/Button.svelte';
  import Card from '../../design-system/components/Card.svelte';
  import StatusBadge from '../../design-system/components/StatusBadge.svelte';
  import ConfirmDialog from '../../design-system/components/ConfirmDialog.svelte';
  import Toast from '../../design-system/components/Toast.svelte';
  import CollectionPanel from '../../design-system/components/CollectionPanel.svelte';
  import ViewModeToggle from '../../design-system/components/ViewModeToggle.svelte';
  import { currentPatient } from '../../mocks/patient';
  import { cancelAppointment, listAppointments, people, rescheduleAppointment } from '../../lib/patientRepository';
  let { onSchedule }: { onSchedule: () => void } = $props();
  let selectedAppointment = $state('');
  let pendingAction = $state<'reschedule' | 'cancel' | 'details' | ''>('');
  let toast = $state('');
  let items = $state(listAppointments(currentPatient.id));
  let newDate = $state('2026-08-03');
  let newTime = $state('10:00');
  let cancellationReason = $state('Imprevisto pessoal');
  let selectedPatient = $state(currentPatient.id);
  let viewMode = $state<'grid' | 'list'>((localStorage.getItem('orbe-view-appointments') as 'grid' | 'list') ?? 'grid');
  let selectedRecord = $derived(items.find((item) => item.id === selectedAppointment));
  $effect(() => localStorage.setItem('orbe-view-appointments', viewMode));
  function confirmAction() {
    if (pendingAction === 'details') {
      pendingAction = '';
      selectedAppointment = '';
      return;
    }
    if (pendingAction === 'cancel') cancelAppointment(selectedAppointment, cancellationReason);
    else
      rescheduleAppointment(
        selectedAppointment,
        newDate === '2026-08-03' ? '3 de agosto de 2026' : '5 de agosto de 2026',
        newTime,
      );
    items = listAppointments(selectedPatient);
    toast =
      pendingAction === 'cancel' ? 'Agendamento cancelado com sucesso.' : 'Agendamento atualizado para a nova data.';
    pendingAction = '';
    selectedAppointment = '';
  }
</script>

<div class="page">
  <header>
    <div>
      <p class="eyebrow">Vacinação</p>
      <h1>Agendamentos</h1>
      <p>Acompanhe e gerencie as próximas vacinas de {currentPatient.firstName}.</p>
    </div>
    <Button onclick={onSchedule}>Agendar vacina</Button>
  </header>
  <label class="patient-pill"
    >Carteira de <select bind:value={selectedPatient} onchange={() => (items = listAppointments(selectedPatient))}
      >{#each people as person}<option value={person.id}>{person.name}</option>{/each}</select
    ></label
  >
  <div class="collection">
    <CollectionPanel title="Agendamentos" description="Alterne entre grade e lista conforme sua preferência.">
      {#snippet actions()}<ViewModeToggle bind:value={viewMode} />{/snippet}
      <div class="list {viewMode}">
        {#each items as appointment}<Card
            ><article>
              <div>
                <StatusBadge status={appointment.status} />
                <h3>{appointment.vaccine}</h3>
                <p>{appointment.dose} · {appointment.manufacturer}</p>
              </div>
              <dl>
                <div>
                  <dt>Data</dt>
                  <dd>{appointment.date}</dd>
                </div>
                <div>
                  <dt>Horário</dt>
                  <dd>{appointment.time}</dd>
                </div>
                <div>
                  <dt>Local</dt>
                  <dd>{appointment.location}</dd>
                </div>
              </dl>
              <div class="actions">
                <Button
                  variant="secondary"
                  size="sm"
                  onclick={() => {
                    selectedAppointment = appointment.id;
                    pendingAction = 'details';
                  }}>Ver detalhes</Button
                >{#if appointment.status !== 'cancelled'}<Button
                    variant="ghost"
                    size="sm"
                    onclick={() => {
                      selectedAppointment = appointment.id;
                      pendingAction = 'reschedule';
                    }}>Reagendar</Button
                  ><button
                    class="cancel"
                    onclick={() => {
                      selectedAppointment = appointment.id;
                      pendingAction = 'cancel';
                    }}>Cancelar</button
                  >{/if}
              </div>
            </article></Card
          >{/each}{#if items.length === 0}<Card><p>Nenhum agendamento encontrado para esta pessoa.</p></Card>{/if}
      </div>
    </CollectionPanel>
  </div>
</div>
{#if pendingAction}<ConfirmDialog
    title={pendingAction === 'details'
      ? 'Detalhes do agendamento'
      : pendingAction === 'cancel'
        ? 'Cancelar agendamento?'
        : 'Escolha o novo horário'}
    description={pendingAction === 'details'
      ? 'Confira os dados completos do atendimento.'
      : pendingAction === 'cancel'
        ? 'O horário será liberado e o cancelamento permanecerá no histórico.'
        : 'A data anterior será preservada no histórico do agendamento.'}
    confirmLabel={pendingAction === 'details'
      ? 'Fechar'
      : pendingAction === 'cancel'
        ? 'Cancelar agendamento'
        : 'Confirmar reagendamento'}
    danger={pendingAction === 'cancel'}
    onConfirm={confirmAction}
    onCancel={() => {
      pendingAction = '';
      selectedAppointment = '';
    }}
    >{#snippet children()}{#if pendingAction === 'details' && selectedRecord}<dl>
          <div>
            <dt>Vacina</dt>
            <dd>{selectedRecord.vaccine}</dd>
          </div>
          <div>
            <dt>Dose</dt>
            <dd>{selectedRecord.dose}</dd>
          </div>
          <div>
            <dt>Data</dt>
            <dd>{selectedRecord.date} às {selectedRecord.time}</dd>
          </div>
          <div>
            <dt>Local</dt>
            <dd>{selectedRecord.location}</dd>
          </div>
          {#if selectedRecord.cancellationReason}<div>
              <dt>Motivo do cancelamento</dt>
              <dd>{selectedRecord.cancellationReason}</dd>
            </div>{/if}
        </dl>{:else if pendingAction === 'cancel'}<label class="dialog-field"
          >Motivo<select bind:value={cancellationReason}
            ><option>Imprevisto pessoal</option><option>Problema de saúde</option><option>Agendamento duplicado</option
            ><option>Outro motivo</option></select
          ></label
        >{:else}<div class="dialog-grid">
          <label class="dialog-field"
            >Nova data<select bind:value={newDate}
              ><option value="2026-08-03">3 de agosto de 2026</option><option value="2026-08-05"
                >5 de agosto de 2026</option
              ></select
            ></label
          ><label class="dialog-field"
            >Novo horário<select bind:value={newTime}
              ><option>09:00</option><option>10:00</option><option>14:30</option></select
            ></label
          >
        </div>{/if}{/snippet}</ConfirmDialog
  >{/if}
{#if toast}<Toast message={toast} onClose={() => (toast = '')} />{/if}

<style>
  .page {
    width: min(100%, var(--content-max));
    margin: 0 auto;
    padding: var(--space-8);
  }
  header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);
  }
  .eyebrow {
    color: var(--color-brand-500);
    font-size: var(--text-xs);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  h1 {
    margin-top: var(--space-2);
    font-size: var(--text-3xl);
    letter-spacing: -0.04em;
  }
  header p:last-child {
    margin-top: var(--space-2);
    color: var(--text-secondary);
  }
  .patient-pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-6);
    margin-bottom: var(--space-6);
    border-radius: var(--radius-pill);
    background: var(--surface-subtle);
    padding: 0.55rem 0.8rem 0.55rem 1rem;
    font-size: var(--text-sm);
    font-weight: 650;
  }
  .patient-pill select {
    border: 0;
    background: var(--surface-subtle);
    color: var(--text-secondary);
    font-size: var(--text-xs);
    cursor: pointer;
  }
  .list {
    display: grid;
    gap: var(--space-4);
  }
  .collection {
    margin-top: 0;
  }
  .list.grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .list.grid article {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .list.grid .actions {
    flex-wrap: wrap;
  }
  article {
    display: grid;
    grid-template-columns: 1.1fr 1.5fr auto;
    align-items: center;
    gap: var(--space-6);
  }
  h3 {
    margin-top: var(--space-3);
  }
  article p {
    margin-top: var(--space-2);
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }
  dl {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin: 0;
  }
  dt {
    color: var(--text-tertiary);
    font-size: var(--text-xs);
  }
  dd {
    margin: 0.25rem 0 0;
    font-size: var(--text-sm);
    font-weight: 650;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .cancel {
    border: 0;
    background: transparent;
    color: var(--status-danger);
    font-size: var(--text-xs);
    font-weight: 700;
    cursor: pointer;
  }
  .dialog-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }
  .dialog-field {
    display: grid;
    gap: var(--space-2);
    color: var(--text-primary);
    font-size: var(--text-sm);
    font-weight: 650;
  }
  .dialog-field select {
    min-height: 2.7rem;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    background: var(--surface-card);
    padding: 0 var(--space-3);
    color: var(--text-primary);
  }
  @media (max-width: 1000px) {
    .list.grid {
      grid-template-columns: 1fr;
    }
    article {
      grid-template-columns: 1fr 1fr;
    }
    .actions {
      grid-column: 1/-1;
    }
    dl {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 680px) {
    .page {
      padding: var(--space-5);
    }
    header {
      align-items: flex-start;
      flex-direction: column;
    }
    article {
      grid-template-columns: 1fr;
    }
    .actions {
      grid-column: auto;
      flex-wrap: wrap;
    }
    .dialog-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
