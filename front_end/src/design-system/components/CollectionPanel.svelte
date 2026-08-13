<script lang="ts">
  import type { Snippet } from 'svelte';
  import Tooltip from './Tooltip.svelte';
  let {
    title,
    description = '',
    actions,
    children,
    footer,
  }: {
    title: string;
    description?: string;
    actions?: Snippet;
    children: Snippet;
    footer?: Snippet;
  } = $props();
</script>

<section class="panel">
  <header>
    <div class="heading">
      <h2>{title}</h2>
      {#if description}<Tooltip text={description} />{/if}
    </div>
    {#if actions}<div class="actions">{@render actions()}</div>{/if}
  </header>
  <div class="content">{@render children()}</div>
  {#if footer}<footer>{@render footer()}</footer>{/if}
</section>

<style>
  .panel {
    overflow: hidden;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    background: var(--surface-card);
    box-shadow: var(--shadow-sm);
  }
  header {
    display: flex;
    min-height: 3.25rem;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5);
    border-bottom: 1px solid var(--border-subtle);
    background: color-mix(in srgb, var(--color-auth-panel) 18%, var(--surface-card));
    padding: var(--space-3) var(--space-4);
  }
  h2 {
    font-size: var(--text-lg);
    letter-spacing: -0.015em;
  }
  .heading {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .content {
    padding: var(--space-4);
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    border-top: 1px solid var(--border-subtle);
    padding: var(--space-2) var(--space-4);
  }
  :global([data-theme='dark']) header {
    background: color-mix(in srgb, var(--color-brand-500) 14%, var(--surface-card));
  }
  @media (max-width: 680px) {
    header {
      align-items: flex-start;
      flex-direction: column;
    }
    .actions {
      width: 100%;
      justify-content: space-between;
    }
    .content {
      padding: var(--space-4);
    }
  }
</style>
