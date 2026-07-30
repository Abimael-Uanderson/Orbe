<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children, padding = 'md' }: { children: Snippet; padding?: 'none' | 'sm' | 'md' | 'lg' } = $props();
</script>

<div class="card {padding}">{@render children()}</div>

<style>
  .card {
    background: var(--surface-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }
  .sm {
    padding: var(--space-4);
  }
  .md {
    padding: var(--space-5);
  }
  .lg {
    padding: var(--space-6);
  }
  .none {
    padding: 0;
  }
</style>
