<script lang="ts">
  import type { Snippet } from 'svelte';
  import Tooltip from './Tooltip.svelte';
  let {
    eyebrow,
    title,
    description,
    actions,
  }: { eyebrow: string; title: string; description: string; actions?: Snippet } = $props();
</script>

<header>
  <div>
    <p>{eyebrow}</p>
    <div class="title">
      <h1>{title}</h1>
      {#if description}<Tooltip text={description} />{/if}
    </div>
  </div>
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
</header>

<style>
  header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);
  }
  p {
    color: var(--color-brand-500);
    font-size: var(--text-xs);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .title {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }
  h1 {
    font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl));
    line-height: var(--leading-tight);
    letter-spacing: -0.04em;
  }
  .actions {
    display: flex;
    gap: var(--space-3);
  }
  @media (max-width: 680px) {
    header {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>
