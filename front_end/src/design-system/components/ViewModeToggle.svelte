<script lang="ts">
  let {
    value = $bindable('grid'),
    label = 'Modo de visualização',
  }: {
    value?: 'grid' | 'list';
    label?: string;
  } = $props();
</script>

<div class="toggle" role="group" aria-label={label}>
  <button
    class:active={value === 'grid'}
    aria-label="Visualizar em grade"
    aria-pressed={value === 'grid'}
    onclick={() => (value = 'grid')}
  >
    <span aria-hidden="true">⊞</span>
  </button>
  <button
    class:active={value === 'list'}
    aria-label="Visualizar em lista"
    aria-pressed={value === 'list'}
    onclick={() => (value = 'list')}
  >
    <span aria-hidden="true">☷</span>
  </button>
</div>

<style>
  .toggle {
    display: inline-flex;
    gap: var(--space-1);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    background: var(--surface-card);
    padding: var(--space-1);
    box-shadow: var(--shadow-sm);
  }
  button {
    display: grid;
    width: 2.25rem;
    height: 2.25rem;
    place-items: center;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    font-size: 1.1rem;
    cursor: pointer;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
  }
  button:hover {
    background: var(--surface-hover);
    color: var(--text-primary);
  }
  button.active {
    background: var(--color-brand-50);
    color: var(--color-brand-600);
    box-shadow: inset 0 0 0 1px var(--color-brand-100);
  }
  :global([data-theme='dark']) button.active {
    background: rgb(17 124 111/0.22);
    color: #8bd8ce;
    box-shadow: inset 0 0 0 1px rgb(117 191 170/0.25);
  }
</style>
