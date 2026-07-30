<script lang="ts">
  import Button from '../../design-system/components/Button.svelte';
  import Card from '../../design-system/components/Card.svelte';
  import PageHeader from '../../design-system/components/PageHeader.svelte';
  let {
    title,
    description = 'Esta funcionalidade ainda não possui conteúdo disponível.',
    onBack,
  }: { title: string; description?: string; onBack?: () => void } = $props();
</script>

<div class="page">
  <PageHeader eyebrow="Orbe" {title} {description} />
  <div class="empty-card">
    <Card padding="lg"
      ><div class="empty">
        <span>✦</span>
        <h2>{title}</h2>
        <p>{description}</p>
        <Button variant="secondary" onclick={onBack}>Voltar ao início</Button>
      </div></Card
    >
  </div>
</div>

<style>
  .page {
    width: min(100%, var(--content-max));
    margin: 0 auto;
    padding: var(--space-8);
  }
  .empty-card {
    margin-top: var(--space-6);
  }
  .empty {
    display: grid;
    min-height: 14rem;
    place-items: center;
    place-content: center;
    gap: var(--space-3);
    text-align: center;
  }
  .empty > span {
    color: var(--color-brand-500);
    font-size: 2rem;
  }
  .empty p {
    max-width: 28rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-3);
  }
  @media (max-width: 680px) {
    .page {
      padding: var(--space-5);
    }
  }
</style>
