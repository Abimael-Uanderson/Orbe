<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children, tone = 'info' }: { children: Snippet; tone?: 'info' | 'success' | 'danger' } = $props();
</script>
<div class="alert {tone}" role={tone === 'danger' ? 'alert' : 'status'}><span aria-hidden="true">{tone === 'success' ? '✓' : tone === 'danger' ? '!' : 'i'}</span><div>{@render children()}</div></div>
<style>
  .alert{display:flex;gap:var(--space-3);align-items:flex-start;border-radius:var(--radius-md);padding:var(--space-4);font-size:var(--text-sm);line-height:1.5}.alert>span{display:grid;flex:0 0 auto;width:1.35rem;height:1.35rem;place-items:center;border:1px solid currentColor;border-radius:50%;font-size:.7rem;font-weight:800}.info{background:var(--color-brand-50);color:var(--color-brand-700)}:global([data-theme='dark']) .info{background:rgb(17 124 111/.2);color:#8bd8ce}.success{background:var(--status-success-bg);color:var(--status-success)}.danger{background:var(--status-danger-bg);color:var(--status-danger)}
</style>
