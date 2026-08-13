<script lang="ts">
  import type { Snippet } from 'svelte';
  let {
    children,
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    fullWidth = false,
    onclick
  }: {
    children: Snippet;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md';
    type?: 'button' | 'submit';
    disabled?: boolean;
    fullWidth?: boolean;
    onclick?: (event: MouseEvent) => void;
  } = $props();
</script>

<button class:full={fullWidth} class="button {variant} {size}" {type} {disabled} {onclick}>
  {@render children()}
</button>

<style>
  .button { display:inline-flex; align-items:center; justify-content:center; gap:var(--space-2); border:1px solid transparent; border-radius:var(--radius-md); font-weight:650; cursor:pointer; transition:background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast); }
  .button:hover:not(:disabled) { transform:translateY(-1px); }
  .button:disabled { opacity:.5; cursor:not-allowed; }
  .sm { min-height:2.25rem; padding:0 var(--space-4); font-size:var(--text-xs); }
  .md { min-height:2.75rem; padding:0 var(--space-5); font-size:var(--text-sm); }
  .primary { background:var(--color-brand-500); color:var(--text-on-brand); }
  .primary:hover:not(:disabled) { background:var(--color-brand-600); }
  .secondary { background:var(--surface-card); border-color:var(--border-strong); color:var(--text-primary); }
  .secondary:hover:not(:disabled), .ghost:hover:not(:disabled) { background:var(--surface-hover); }
  .ghost { background:transparent; color:var(--color-brand-500); }
  .full { width:100%; }
</style>
