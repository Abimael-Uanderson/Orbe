<script lang="ts">
  import type { Snippet } from 'svelte';
  import { applyTheme, getThemePreference } from '../../design-system/theme/theme';
  let { children }: { children: Snippet } = $props();
  let dark = $state(false);
  $effect(() => {
    dark = document.documentElement.dataset.theme === 'dark';
  });
  function toggleTheme() {
    dark = !dark;
    applyTheme(dark ? 'dark' : 'light');
  }
</script>

<div class="auth-layout">
  <aside>
    <div class="brand"><span>or</span>be<i></i></div>
    <div class="message">
      <p>Vacinação simples e segura</p>
      <h1>Cuidado que acompanha você e sua família.</h1>
      <span>Agende vacinas, acompanhe aplicações e mantenha sua carteira sempre atualizada.</span>
    </div>
    <div class="visual" aria-hidden="true">
      <div class="orbit one"></div>
      <div class="orbit two"></div>
      <div class="center">✦</div>
      <div class="dot a"></div>
      <div class="dot b"></div>
      <div class="dot c"></div>
    </div>
    <p class="legal">© 2026 Orbe Saúde. Todos os direitos reservados.</p>
  </aside>
  <main>
    <button class="theme" aria-label="Alternar tema" onclick={toggleTheme}>{dark ? '☀' : '☾'}</button>
    <div class="form-container">{@render children()}</div>
  </main>
</div>

<style>
  .auth-layout {
    display: grid;
    min-height: 100vh;
    grid-template-columns: minmax(25rem, 45%) 1fr;
    background: var(--surface-page);
  }
  aside {
    position: relative;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    overflow: hidden;
    background: var(--color-auth-panel);
    padding: var(--space-8);
    color: #092d28;
  }
  .brand {
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -0.09em;
  }
  .brand span {
    font-weight: 500;
  }
  .brand i {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.18rem;
    border-radius: 50%;
    background: var(--color-accent-400);
    vertical-align: top;
  }
  .message {
    position: relative;
    z-index: 2;
    margin: auto 0;
    max-width: 31rem;
  }
  .message > p {
    margin-bottom: var(--space-4);
    color: #09564d;
    font-size: var(--text-xs);
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
  .message h1 {
    font-size: clamp(2.3rem, 4.5vw, 4.4rem);
    line-height: 1.02;
    letter-spacing: -0.055em;
  }
  .message > span {
    display: block;
    max-width: 27rem;
    margin-top: var(--space-6);
    color: #174d45;
    font-size: var(--text-md);
    line-height: 1.65;
  }
  .legal {
    position: relative;
    z-index: 2;
    color: #245e55;
    font-size: var(--text-xs);
  }
  .visual {
    position: absolute;
    right: -8rem;
    bottom: 4rem;
    width: 28rem;
    height: 28rem;
    opacity: 0.65;
  }
  .orbit {
    position: absolute;
    inset: 15%;
    border: 1px solid rgb(9 45 40/0.25);
    border-radius: 50%;
  }
  .orbit.two {
    inset: 28%;
    border-color: rgb(9 86 77/0.45);
  }
  .center {
    position: absolute;
    inset: 40%;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--color-brand-500);
    color: white;
    font-size: 2rem;
    box-shadow: 0 0 80px rgb(17 124 111/0.55);
  }
  .dot {
    position: absolute;
    border-radius: 50%;
    background: var(--color-accent-400);
  }
  .dot.a {
    top: 12%;
    left: 45%;
    width: 1rem;
    height: 1rem;
  }
  .dot.b {
    right: 16%;
    bottom: 28%;
    width: 0.55rem;
    height: 0.55rem;
  }
  .dot.c {
    bottom: 14%;
    left: 24%;
    width: 0.75rem;
    height: 0.75rem;
  }
  main {
    position: relative;
    display: grid;
    min-width: 0;
    place-items: center;
    padding: var(--space-8);
  }
  .form-container {
    width: min(100%, 29rem);
  }
  .theme {
    position: absolute;
    top: var(--space-6);
    right: var(--space-6);
    display: grid;
    width: 2.75rem;
    height: 2.75rem;
    place-items: center;
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-pill);
    background: var(--surface-card);
    color: var(--text-primary);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
  }
  @media (max-width: 850px) {
    .auth-layout {
      grid-template-columns: 1fr;
    }
    aside {
      display: none;
    }
    main {
      min-height: 100vh;
      padding: var(--space-6);
    }
  }
</style>
