<script lang="ts">
  import Button from '../../design-system/components/Button.svelte';
  import Card from '../../design-system/components/Card.svelte';
  import PageHeader from '../../design-system/components/PageHeader.svelte';
  import Toast from '../../design-system/components/Toast.svelte';
  import CollectionPanel from '../../design-system/components/CollectionPanel.svelte';
  import ViewModeToggle from '../../design-system/components/ViewModeToggle.svelte';
  import Tooltip from '../../design-system/components/Tooltip.svelte';
  import AdminCrudDialog from './AdminCrudDialog.svelte';
  import { adminUsers, auditEvents, batches, movements } from '../../mocks/admin';
  import { vaccines, insurances } from '../../mocks/portal';
  let {
    mode,
    onNavigate,
  }: {
    mode: 'dashboard' | 'users' | 'vaccines' | 'stock' | 'insurance' | 'reports' | 'audit';
    onNavigate: (page: string) => void;
  } = $props();
  let query = $state('');
  let page = $state(1);
  const pageSize = 4;
  const titles = {
    users: [
      'Acessos',
      'Usuários e perfis',
      'Cadastre pacientes, funcionários e administradores com permissões adequadas.',
    ],
    vaccines: ['Cadastros', 'Catálogo de vacinas', 'Mantenha as informações comerciais e clínicas das vacinas.'],
    stock: ['Estoque', 'Lotes e movimentações', 'Acompanhe quantidades, validades e o histórico do estoque.'],
    insurance: ['Cadastros', 'Convênios', 'Gerencie planos e códigos operacionais aceitos.'],
    reports: ['Indicadores', 'Relatórios', 'Analise a operação, aplicações e utilização do estoque.'],
    audit: ['Segurança', 'Auditoria', 'Consulte ações relevantes realizadas no sistema.'],
  } as const;
  const title = $derived(mode === 'dashboard' ? null : titles[mode]);
  let stockTab = $state<'batches' | 'movements'>('batches');
  type Entity = 'user' | 'vaccine' | 'batch' | 'insurance';
  type Row = Record<string, string>;
  function stored(key: string, fallback: Row[]) {
    try {
      return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
    } catch {
      return fallback;
    }
  }
  let usersData = $state<Row[]>(
    stored(
      'orbe-admin-users',
      adminUsers.map((u) => ({ ...u })),
    ),
  );
  let vaccinesData = $state<Row[]>(
    stored(
      'orbe-admin-vaccines',
      vaccines.map((v) => ({
        id: v.id,
        name: v.name,
        manufacturer: v.manufacturer,
        age: v.age,
        price: String(v.price),
        status: v.available ? 'Ativo' : 'Inativo',
      })),
    ),
  );
  let batchesData = $state<Row[]>(
    stored(
      'orbe-admin-batches',
      batches.map((b) => ({
        id: b.id,
        number: b.number,
        vaccine: b.vaccine,
        manufacturer: b.manufacturer,
        expires: b.expires,
        quantity: String(b.quantity),
        status: b.status,
      })),
    ),
  );
  let insuranceData = $state<Row[]>(
    stored(
      'orbe-admin-insurance',
      insurances.map((i, index) => ({
        id: i.id,
        company: i.company,
        plan: i.plan,
        code: `CV-${String(index + 1).padStart(4, '0')}`,
        validUntil: i.validUntil,
        status: i.active ? 'Ativo' : 'Inativo',
      })),
    ),
  );
  let auditData = $state<Row[]>([...stored('orbe-runtime-audit', []), ...auditEvents.map((event) => ({ ...event }))]);
  let modalEntity = $state<Entity | null>(null);
  let editIndex = $state(-1);
  let toast = $state('');
  let advancedFilters = $state(false);
  let adminView = $state<'grid' | 'list'>((localStorage.getItem('orbe-view-admin') as 'grid' | 'list') ?? 'list');
  $effect(() => localStorage.setItem('orbe-view-admin', adminView));
  $effect(() => localStorage.setItem('orbe-admin-users', JSON.stringify(usersData)));
  $effect(() => localStorage.setItem('orbe-admin-vaccines', JSON.stringify(vaccinesData)));
  $effect(() => localStorage.setItem('orbe-admin-batches', JSON.stringify(batchesData)));
  $effect(() => localStorage.setItem('orbe-admin-insurance', JSON.stringify(insuranceData)));
  function currentRows(entity: Entity) {
    return entity === 'user'
      ? usersData
      : entity === 'vaccine'
        ? vaccinesData
        : entity === 'batch'
          ? batchesData
          : insuranceData;
  }
  function openCreate(entity: Entity) {
    modalEntity = entity;
    editIndex = -1;
  }
  function openEdit(index: number) {
    modalEntity =
      mode === 'users' ? 'user' : mode === 'vaccines' ? 'vaccine' : mode === 'stock' ? 'batch' : 'insurance';
    editIndex = index;
  }
  function saveEntity(values: Row) {
    if (!modalEntity) return;
    const rows = currentRows(modalEntity);
    const next = { ...values, id: editIndex >= 0 ? rows[editIndex].id : `mock-${Date.now()}` };
    const updated = editIndex >= 0 ? rows.map((row, index) => (index === editIndex ? next : row)) : [next, ...rows];
    if (modalEntity === 'user') usersData = updated;
    else if (modalEntity === 'vaccine') vaccinesData = updated;
    else if (modalEntity === 'batch') batchesData = updated;
    else insuranceData = updated;
    toast = editIndex >= 0 ? 'Registro atualizado com sucesso.' : 'Registro cadastrado com sucesso.';
    modalEntity = null;
    editIndex = -1;
  }
  function exportReport() {
    const csv = [
      ['Indicador', 'Valor', 'Período'],
      ['Aplicações', '46', 'Últimos 30 dias'],
      ['Receita estimada', 'R$ 18.420', 'Últimos 30 dias'],
      ['Taxa de faltas', '6,2%', 'Últimos 30 dias'],
      ['Doses perdidas', '4', 'Últimos 30 dias'],
    ]
      .map((row) => row.join(';'))
      .join('\n');
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatorio-orbe.csv';
    link.click();
    URL.revokeObjectURL(url);
    toast = 'Relatório exportado em CSV.';
  }
</script>

<div class="page compact">
  {#if mode === 'dashboard'}<PageHeader
      eyebrow="Administração"
      title="Visão gerencial"
      description="Resumo da clínica em 22 de julho de 2026."
    />
    <div class="stats">
      {#each [{ n: '128', l: 'Pacientes ativos', d: '+8 este mês' }, { n: '46', l: 'Aplicações no mês', d: '+12% no período' }, { n: '95', l: 'Doses em estoque', d: '4 lotes ativos' }, { n: '2', l: 'Alertas de estoque', d: 'Requer atenção' }] as item}<Card
          ><div class="stat"><span>{item.l}</span><strong>{item.n}</strong><small>{item.d}</small></div></Card
        >{/each}
    </div>
    <div class="dashboard">
      <Card
        ><div class="card-head">
          <div class="inline-title">
            <h2>Aplicações por semana</h2>
            <Tooltip text="Últimas cinco semanas" />
          </div>
          <button onclick={() => onNavigate('admin-reports')}>Ver relatório</button>
        </div>
        <div class="chart">
          {#each [{ v: 45, l: 'S25' }, { v: 62, l: 'S26' }, { v: 54, l: 'S27' }, { v: 78, l: 'S28' }, { v: 91, l: 'S29' }] as bar}<div
            >
              <span style={`height:${bar.v}%`}></span><small>{bar.l}</small>
            </div>{/each}
        </div></Card
      ><Card
        ><div class="card-head">
          <div class="inline-title">
            <h2>Alertas prioritários</h2>
            <Tooltip text="Estoque e operação" />
          </div>
        </div>
        <div class="alerts">
          <button onclick={() => onNavigate('admin-stock')}
            ><i class="danger">!</i><span
              ><strong>Febre amarela com estoque baixo</strong><small>7 doses disponíveis</small></span
            ><b>›</b></button
          ><button onclick={() => onNavigate('admin-stock')}
            ><i class="warning">!</i><span
              ><strong>Lote próximo da validade</strong><small>LT-260502 · setembro de 2026</small></span
            ><b>›</b></button
          ><button onclick={() => onNavigate('admin-stock')}
            ><i class="success">✓</i><span
              ><strong>Inventário conciliado</strong><small>Última revisão ontem</small></span
            ><b>›</b></button
          >
        </div></Card
      >
    </div>
    <div class="quick">
      {#each [{ i: '♧', t: 'Gerenciar usuários', p: 'admin-users' }, { i: '✚', t: 'Nova vacina', p: 'admin-vaccines' }, { i: '▤', t: 'Entrada de lote', p: 'admin-stock' }, { i: '◇', t: 'Gerar relatório', p: 'admin-reports' }] as item}<button
          onclick={() => onNavigate(item.p)}><span>{item.i}</span><strong>{item.t}</strong></button
        >{/each}
    </div>
  {:else}<PageHeader eyebrow={title![0]} title={title![1]} description={title![2]}
      >{#snippet actions()}{#if mode === 'users'}<Button onclick={() => openCreate('user')}>Novo acesso</Button
          >{:else if mode === 'vaccines'}<Button onclick={() => openCreate('vaccine')}>Nova vacina</Button
          >{:else if mode === 'stock'}<Button onclick={() => openCreate('batch')}>Entrada de lote</Button
          >{:else if mode === 'insurance'}<Button onclick={() => openCreate('insurance')}>Novo convênio</Button
          >{:else if mode === 'reports'}<Button onclick={exportReport}>Exportar relatório</Button
          >{/if}{/snippet}</PageHeader
    >
    {#if mode === 'reports'}<div class="report-filters">
        <label>Período<select><option>Últimos 30 dias</option><option>Este trimestre</option></select></label><label
          >Unidade<select><option>Todas as unidades</option><option>Unidade Centro</option></select></label
        >
      </div>
      <div class="stats reports">
        {#each [{ n: '46', l: 'Aplicações', d: '38 particulares · 8 convênios' }, { n: 'R$ 18.420', l: 'Receita estimada', d: '+9% sobre o período anterior' }, { n: '6,2%', l: 'Taxa de faltas', d: '3 ausências em 48 agendas' }, { n: '4', l: 'Doses perdidas', d: '2 ajustes · 2 vencimentos' }] as item}<Card
            ><div class="stat"><span>{item.l}</span><strong>{item.n}</strong><small>{item.d}</small></div></Card
          >{/each}
      </div>
      <div class="report-grid">
        <Card
          ><h2>Vacinas mais aplicadas</h2>
          {#each [{ n: 'Influenza', v: 18, p: 100 }, { n: 'Hepatite B', v: 11, p: 61 }, { n: 'HPV', v: 9, p: 50 }, { n: 'Febre amarela', v: 8, p: 44 }] as row}<div
              class="metric"
            >
              <span><b>{row.n}</b><small>{row.v} aplicações</small></span><i><em style={`width:${row.p}%`}></em></i>
            </div>{/each}</Card
        ><Card
          ><h2>Atendimentos por situação</h2>
          <div class="donut"><div>48<small>Total</small></div></div>
          <div class="legend">
            <span><i class="green"></i>Concluídos <b>42</b></span><span><i class="yellow"></i>Faltas <b>3</b></span
            ><span><i class="gray"></i>Cancelados <b>3</b></span>
          </div></Card
        >
      </div>
    {:else if mode === 'stock'}<div class="tabs">
        <button class:active={stockTab === 'batches'} onclick={() => (stockTab = 'batches')}>Lotes</button><button
          class:active={stockTab === 'movements'}
          onclick={() => (stockTab = 'movements')}>Movimentações</button
        >
      </div>
      {#if stockTab === 'batches'}{@render DataTable(
          ['Lote', 'Vacina', 'Validade', 'Quantidade', 'Situação', ''],
          batchesData.map((b) => [
            b.number,
            `${b.vaccine}|${b.manufacturer}`,
            b.expires,
            b.quantity,
            b.status,
            'Editar',
          ]),
          true,
        )}{:else}{@render DataTable(
          ['Data', 'Lote', 'Movimentação', 'Quantidade', 'Responsável'],
          movements.map((m) => [m.date, m.batch, m.type, m.quantity, m.user]),
        )}{/if}
    {:else if mode === 'users'}{@render Toolbar()}{@render DataTable(
        ['Nome', 'E-mail', 'Perfil', 'Último acesso', 'Situação', ''],
        usersData
          .filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))
          .map((u) => [u.name, u.email, u.role, u.lastAccess ?? 'Ainda não acessou', u.status, 'Editar']),
        true,
      )}
    {:else if mode === 'vaccines'}{@render Toolbar()}{@render DataTable(
        ['Vacina', 'Fabricante', 'Indicação', 'Valor-base', 'Situação', ''],
        vaccinesData
          .filter((v) => v.name.toLowerCase().includes(query.toLowerCase()))
          .slice((page - 1) * pageSize, page * pageSize)
          .map((v) => [
            v.name,
            v.manufacturer,
            v.age,
            Number(v.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            v.status,
            'Editar',
          ]),
        true,
      )}{@render Pagination(Math.ceil(vaccinesData.length / pageSize))}
    {:else if mode === 'insurance'}{@render Toolbar()}{@render DataTable(
        ['Convênio', 'Plano', 'Código', 'Validade', 'Situação', ''],
        insuranceData.map((i) => [i.company, i.plan, i.code, i.validUntil, i.status, 'Editar']),
        true,
      )}
    {:else if mode === 'audit'}<div class="audit-filter">
        {@render Toolbar()}<button onclick={() => (advancedFilters = !advancedFilters)}
          >{advancedFilters ? 'Ocultar filtros' : 'Filtros avançados'}</button
        >
      </div>
      {#if advancedFilters}<div class="report-filters">
          <label
            >Usuário<select><option>Todos</option><option>Ana Ribeiro</option><option>Roberto Mendes</option></select
            ></label
          ><label
            >Ação<select
              ><option>Todas</option><option>Aplicações</option><option>Estoque</option><option>Usuários</option
              ></select
            ></label
          ><label>Período<select><option>Últimos 7 dias</option><option>Últimos 30 dias</option></select></label>
        </div>{/if}
      {@render DataTable(
        ['Data e hora', 'Usuário', 'Ação', 'Recurso', 'Endereço IP'],
        auditData.map((e) => [e.date, e.user, e.action, e.resource, e.ip]),
      )}{/if}
  {/if}
</div>
{#if modalEntity}<AdminCrudDialog
    entity={modalEntity}
    initial={editIndex >= 0 ? currentRows(modalEntity)[editIndex] : {}}
    onSave={saveEntity}
    onCancel={() => {
      modalEntity = null;
      editIndex = -1;
    }}
  />{/if}
{#if toast}<Toast message={toast} onClose={() => (toast = '')} />{/if}

{#snippet Toolbar()}<div class="toolbar">
    <input placeholder="Buscar registros" value={query} oninput={(e) => (query = e.currentTarget.value)} /><select
      ><option>Todos os status</option><option>Ativos</option><option>Inativos</option></select
    >
  </div>{/snippet}
{#snippet DataTable(headers: string[], rows: string[][], editable = false)}
  <div class="admin-collection">
    <CollectionPanel title="Registros" description={`${rows.length} itens exibidos`}>
      {#snippet actions()}<ViewModeToggle bind:value={adminView} />{/snippet}
      {#if adminView === 'list'}<div class="table-wrap">
          <div class="table" style={`--columns:${headers.length}`}>
            {#each headers as header}<strong class="th">{header}</strong
              >{/each}{#each rows as row, rowIndex}{#each row as cell, index}{#if editable && index === row.length - 1 && cell === 'Editar'}<span
                    class="action"><button onclick={() => openEdit(rowIndex)}>Editar</button></span
                  >{:else}<span class:status={['Ativo', 'Inativo', 'Regular', 'Atenção', 'Crítico'].includes(cell)}
                    >{#each cell.split('|') as part, partIndex}{#if partIndex === 0}<b>{part}</b>{:else}<small
                          >{part}</small
                        >{/if}{/each}</span
                  >{/if}{/each}{/each}
          </div>
        </div>
      {:else}<div class="admin-card-grid">
          {#each rows as row, rowIndex}<article>
              {#each row as cell, index}
                {#if !(editable && index === row.length - 1 && cell === 'Editar') && headers[index]}
                  <div>
                    <small>{headers[index]}</small><strong>{cell.split('|')[0]}</strong>{#if cell.includes('|')}<span
                        >{cell.split('|')[1]}</span
                      >{/if}
                  </div>
                {/if}
              {/each}
              {#if editable}<button onclick={() => openEdit(rowIndex)}>Editar registro</button>{/if}
            </article>{/each}
        </div>{/if}
    </CollectionPanel>
  </div>
{/snippet}
{#snippet Pagination(total: number)}<div class="pagination">
    <span>Página {page} de {total}</span><button disabled={page === 1} onclick={() => (page -= 1)}>←</button><button
      disabled={page === total}
      onclick={() => (page += 1)}>→</button
    >
  </div>{/snippet}

<style>
  .page {
    width: min(100%, var(--content-max));
    height: 100vh;
    margin: 0 auto;
    overflow: hidden;
    padding: var(--space-6) var(--space-8);
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
    margin-top: var(--space-6);
  }
  .stat {
    display: grid;
    gap: 0.3rem;
  }
  .stat span {
    color: var(--text-secondary);
    font-size: var(--text-xs);
  }
  .stat strong {
    font-size: var(--text-2xl);
  }
  .stat small {
    color: var(--text-tertiary);
  }
  .dashboard {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: var(--space-3);
    height: 19rem;
    margin-top: var(--space-4);
  }
  .dashboard :global(.card) {
    overflow: hidden;
  }
  .card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .inline-title {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .card-head h2,
  .report-grid h2 {
    font-size: var(--text-md);
  }
  .card-head button {
    border: 0;
    background: transparent;
    color: var(--color-brand-500);
    font-size: var(--text-xs);
    font-weight: 750;
    cursor: pointer;
  }
  .chart {
    display: flex;
    height: 12.5rem;
    align-items: flex-end;
    justify-content: space-around;
    gap: var(--space-3);
    padding-top: var(--space-4);
  }
  .chart > div {
    display: flex;
    height: 100%;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.4rem;
    text-align: center;
  }
  .chart span {
    display: block;
    width: 70%;
    max-width: 3rem;
    margin: auto auto 0;
    border-radius: 0.35rem 0.35rem 0 0;
    background: var(--color-brand-500);
  }
  .chart small {
    color: var(--text-tertiary);
  }
  .alerts {
    margin-top: var(--space-3);
  }
  .alerts button {
    display: grid;
    width: 100%;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-3);
    border: 0;
    border-top: 1px solid var(--border-subtle);
    background: transparent;
    padding: var(--space-3) 0;
    color: var(--text-primary);
    text-align: left;
    cursor: pointer;
  }
  .alerts i {
    display: grid;
    width: 1.8rem;
    height: 1.8rem;
    place-items: center;
    border-radius: 50%;
    font-style: normal;
    font-weight: 800;
  }
  .alerts i.danger {
    background: var(--status-danger-bg);
    color: var(--status-danger);
  }
  .alerts i.warning {
    background: var(--status-warning-bg);
    color: var(--status-warning);
  }
  .alerts i.success {
    background: var(--status-success-bg);
    color: var(--status-success);
  }
  .alerts span {
    display: grid;
    gap: 0.15rem;
  }
  .alerts strong {
    font-size: var(--text-xs);
  }
  .alerts small {
    color: var(--text-tertiary);
  }
  .quick {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
    margin-top: var(--space-4);
  }
  .quick button {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    background: var(--surface-card);
    padding: var(--space-4);
    color: var(--text-primary);
    cursor: pointer;
  }
  .quick span {
    color: var(--color-brand-500);
    font-size: 1.2rem;
  }
  .quick strong {
    font-size: var(--text-xs);
  }
  .toolbar,
  .report-filters {
    display: flex;
    gap: var(--space-3);
    margin: var(--space-6) 0 var(--space-3);
  }
  input,
  select {
    min-height: 2.55rem;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    background: var(--surface-card);
    padding: 0 var(--space-3);
    color: var(--text-primary);
    font-size: var(--text-sm);
  }
  .toolbar input {
    width: min(100%, 23rem);
  }
  .table-wrap {
    max-height: calc(100vh - 13rem);
    overflow: auto;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    background: var(--surface-card);
  }
  .admin-collection {
    margin-top: var(--space-3);
  }
  .admin-card-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-4);
  }
  .admin-card-grid article {
    display: grid;
    gap: var(--space-3);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    padding: var(--space-4);
  }
  .admin-card-grid article > div {
    display: grid;
    gap: 0.2rem;
  }
  .admin-card-grid small {
    color: var(--text-tertiary);
    font-size: var(--text-xs);
  }
  .admin-card-grid strong {
    font-size: var(--text-sm);
  }
  .admin-card-grid span {
    color: var(--text-secondary);
    font-size: var(--text-xs);
  }
  .admin-card-grid button {
    justify-self: start;
    border: 0;
    background: transparent;
    padding: 0;
    color: var(--color-brand-500);
    font-weight: 700;
    cursor: pointer;
  }
  .table {
    display: grid;
    min-width: 55rem;
    grid-template-columns: repeat(var(--columns), minmax(7rem, 1fr));
    align-items: center;
  }
  .table > * {
    min-height: 3.65rem;
    border-bottom: 1px solid var(--border-subtle);
    padding: var(--space-3);
    font-size: var(--text-xs);
  }
  .th {
    position: sticky;
    z-index: 1;
    top: 0;
    min-height: 2.6rem;
    background: var(--surface-subtle);
    color: var(--text-secondary);
    font-size: 0.68rem;
  }
  .table span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.15rem;
  }
  .table span > b {
    font-weight: 650;
  }
  .table span small {
    color: var(--text-secondary);
  }
  .table .status b {
    align-self: flex-start;
    border-radius: var(--radius-pill);
    background: var(--surface-subtle);
    padding: 0.25rem 0.5rem;
  }
  .table .action {
    color: var(--color-brand-500);
    font-weight: 750;
  }
  .tabs {
    display: flex;
    gap: var(--space-5);
    margin: var(--space-6) 0 var(--space-3);
    border-bottom: 1px solid var(--border-subtle);
  }
  .tabs button {
    border: 0;
    border-bottom: 2px solid transparent;
    background: transparent;
    padding: 0 0 var(--space-3);
    color: var(--text-secondary);
    font-weight: 700;
    cursor: pointer;
  }
  .tabs button.active {
    border-color: var(--color-brand-500);
    color: var(--color-brand-500);
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-2);
    margin-top: var(--space-3);
    font-size: var(--text-xs);
  }
  .pagination span {
    margin-right: var(--space-2);
    color: var(--text-secondary);
  }
  .pagination button {
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    background: var(--surface-card);
    color: var(--text-primary);
  }
  .report-filters label {
    display: grid;
    gap: 0.25rem;
    color: var(--text-secondary);
    font-size: var(--text-xs);
  }
  .stats.reports {
    margin-top: var(--space-4);
  }
  .report-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-3);
    height: 20rem;
    margin-top: var(--space-4);
  }
  .metric {
    display: grid;
    grid-template-columns: 9rem 1fr;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-5);
  }
  .metric span {
    display: grid;
    gap: 0.15rem;
  }
  .metric b {
    font-size: var(--text-xs);
  }
  .metric small {
    color: var(--text-tertiary);
  }
  .metric > i {
    height: 0.5rem;
    overflow: hidden;
    border-radius: var(--radius-pill);
    background: var(--surface-subtle);
  }
  .metric em {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--color-brand-500);
  }
  .donut {
    display: grid;
    width: 9rem;
    height: 9rem;
    margin: var(--space-5) auto;
    place-items: center;
    border-radius: 50%;
    background: conic-gradient(
      var(--color-brand-500) 0 87.5%,
      var(--status-warning) 87.5% 93.75%,
      var(--border-strong) 93.75%
    );
  }
  .donut > div {
    display: grid;
    width: 6rem;
    height: 6rem;
    place-items: center;
    border-radius: 50%;
    background: var(--surface-card);
    font-size: var(--text-xl);
    font-weight: 800;
  }
  .donut small {
    display: block;
    color: var(--text-tertiary);
    font-size: var(--text-xs);
  }
  .legend {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    font-size: var(--text-xs);
  }
  .legend span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .legend i {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--border-strong);
  }
  .legend i.green {
    background: var(--color-brand-500);
  }
  .legend i.yellow {
    background: var(--status-warning);
  }
  .audit-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .audit-filter button {
    border: 0;
    background: transparent;
    color: var(--color-brand-500);
    font-weight: 700;
  }
  @media (max-width: 1050px) {
    .admin-card-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .page {
      height: auto;
      min-height: 100vh;
      overflow: visible;
    }
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }
    .dashboard,
    .report-grid {
      height: auto;
      grid-template-columns: 1fr;
    }
    .quick {
      grid-template-columns: repeat(2, 1fr);
    }
    .table-wrap {
      max-height: 60vh;
    }
  }
  @media (max-width: 680px) {
    .admin-card-grid {
      grid-template-columns: 1fr;
    }
    .page {
      padding: var(--space-5);
    }
    .stats,
    .quick {
      grid-template-columns: 1fr;
    }
    .toolbar,
    .report-filters {
      align-items: stretch;
      flex-direction: column;
    }
    .toolbar input {
      width: 100%;
    }
  }
</style>
