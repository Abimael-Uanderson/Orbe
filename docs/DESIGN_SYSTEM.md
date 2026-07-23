# Design system Orbe

## Princípios

- Clareza antes de decoração.
- Componentes e tokens são a fonte única da identidade visual.
- Tema claro e escuro têm a mesma prioridade.
- Interfaces administrativas usam densidade compacta e paginação.
- Rolagem da página é evitada em desktop; tabelas extensas usam rolagem interna.
- Em dispositivos móveis, a rolagem natural é preservada por acessibilidade.

## Identidade

- Cor principal: `#117C6F` (`--color-brand-500`).
- Painel de autenticação: `#75BFAA` (`--color-auth-panel`).
- Cor de destaque: `#DFFF00` (`--color-accent-400`).
- Cores de texto, superfícies, bordas e estados são sempre semânticas.

Não use valores de marca diretamente nas telas. Consuma os tokens de `src/design-system/styles/tokens.css`.

## Tipografia

A família padrão é definida por `--font-sans`. A escala vai de `--text-xs` a `--text-3xl`.

- `text-3xl`: títulos de página.
- `text-xl`: títulos de seção.
- `text-lg`: títulos de cards.
- `text-md`: corpo principal.
- `text-sm`: formulários, tabelas e textos auxiliares.
- `text-xs`: labels, legendas e metadados.

## Espaçamento e forma

- Espaçamento: escala `--space-1` a `--space-12`.
- Raios: `--radius-sm`, `md`, `lg`, `xl` e `pill`.
- Sombras: `--shadow-sm` e `--shadow-md`.
- Não crie medidas locais quando um token existente resolver o caso.

## Temas

Componentes devem usar tokens como:

- `--surface-page`
- `--surface-card`
- `--surface-subtle`
- `--text-primary`
- `--text-secondary`
- `--border-subtle`
- `--focus-ring`

O tema é aplicado em `data-theme` no elemento raiz. A preferência aceita `light`, `dark` e `system` e é persistida em `localStorage`.

## Componentes disponíveis

- `Button`: ações primárias, secundárias e discretas.
- `FormField`: campo com label, ajuda, erro e acessibilidade.
- `Card`: superfície de agrupamento.
- `PageHeader`: título, descrição e ações da página.
- `Alert`: mensagens persistentes.
- `Toast`: feedback temporário.
- `ConfirmDialog`: confirmação de ações críticas.
- `StatusBadge`: status operacionais.

## Regras de UX

- Toda ação assíncrona deve indicar carregamento.
- Toda mutação deve produzir feedback.
- Ações destrutivas ou clínicas exigem confirmação.
- Exclusão física não faz parte da interface; use inativação.
- Campos inválidos devem explicar como corrigir o problema.
- Controles precisam funcionar com teclado e apresentar foco visível.

## Dados mockados

Mocks iniciais ficam em `src/mocks`. Operações persistentes usam chaves prefixadas por `orbe-` no `localStorage`. A restauração da demonstração remove apenas essas chaves, preservando tema e sessão.
