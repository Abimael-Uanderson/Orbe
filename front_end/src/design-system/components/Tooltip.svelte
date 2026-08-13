<script lang="ts">
  let { text, label = 'Mais informações' }: { text: string; label?: string } = $props();
</script>

<span class="tooltip">
  <button type="button" aria-label={label}>i</button>
  <span role="tooltip">{text}</span>
</span>

<style>
  .tooltip {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
  }
  .tooltip > button {
    display: grid;
    width: 1.15rem;
    height: 1.15rem;
    place-items: center;
    border: 1px solid var(--color-brand-500);
    border-radius: 50%;
    background: transparent;
    padding: 0;
    color: var(--color-brand-600);
    font-size: 0.68rem;
    font-weight: 800;
    cursor: help;
  }
  .tooltip > span {
    position: absolute;
    z-index: 80;
    top: calc(100% + 0.55rem);
    left: 50%;
    width: max-content;
    max-width: min(20rem, 70vw);
    transform: translate(-50%, -0.2rem);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    background: var(--surface-card);
    padding: var(--space-3);
    color: var(--text-secondary);
    box-shadow: var(--shadow-md);
    font-size: var(--text-xs);
    font-weight: 500;
    line-height: 1.5;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity var(--transition-fast),
      transform var(--transition-fast),
      visibility var(--transition-fast);
  }
  .tooltip > span::before {
    position: absolute;
    bottom: 100%;
    left: 50%;
    border: 0.35rem solid transparent;
    border-bottom-color: var(--border-subtle);
    content: '';
    transform: translateX(-50%);
  }
  .tooltip:hover > span,
  .tooltip:focus-within > span {
    transform: translate(-50%, 0);
    opacity: 1;
    visibility: visible;
  }
</style>
