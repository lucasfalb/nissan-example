# SvelteKit Migration Checklist

## Objetivo

Migrar o frontend atual em Vite SPA para um novo frontend SvelteKit em `project-sv`, com foco em SSR/prerender, SEO por rota e manutenção mais simples.

## Decisão de arquitetura

- Escolher SvelteKit como framework base do novo frontend.
- Usar `src/routes` do SvelteKit para substituir o roteador manual atual.
- Preferir `prerender` nas páginas públicas de campanha/modelos/usados, salvo necessidade real de SSR por request.
- Manter SSR habilitado no projeto para gerar HTML inicial e metadados corretos por rota.
- Isolar código browser-only com guardas client-side (`onMount`, `browser`, `if (typeof window !== "undefined")` quando necessário).

## Inventário atual a migrar

### Estrutura e bootstrap

- Migrar o bootstrap global hoje concentrado em `src/main.js`.
- Remover dependência de montagem manual via `document.querySelector("#app")`.
- Substituir navegação baseada em `history.pushState` por roteamento nativo do SvelteKit.
- Substituir redirects legados manuais por rotas/redirects apropriados no SvelteKit.

### Rotas públicas

- `/`
- `/modelos/`
- `/popup/`
- `/happiniss-days/`
- `/modelos/nissan-leaf/`
- `/modelos/nissan-ariya/`
- `/modelos/nissan-qashqai/`
- `/modelos/nissan-x-trail/`
- `/modelos/novo-nissan-juke/`
- `/modelos/novo-micra/`
- `/usados-juke/`
- `/usados-qashqai/`
- `/nissan-juke/`

### Redirects legados

- `/usadosjuke/` -> `/usados-juke/`
- `/usadosqashqai/` -> `/usados-qashqai/`

### Dados e conteúdo

- Migrar `src/lib/page-definitions.js` como fonte única de conteúdo de páginas.
- Migrar `src/model-banners.js`.
- Validar se `pageDefinitions` deve continuar em um único arquivo ou ser dividido por domínio:
- campanhas
- modelos novos
- usados
- shared labels/options

### Componentes visuais

- Migrar `src/components/banner.js`
- Migrar `src/components/cards.js`
- Migrar `src/components/form.js`
- Migrar `src/components/header.js`
- Migrar `src/components/hero.js`
- Migrar `src/components/home-marketing.js`
- Migrar `src/components/home-slideshow.js`
- Migrar `src/components/section-header.js`

### Layout global

- Criar `+layout.svelte` com header/footer globais.
- Decidir quais páginas compartilham o mesmo layout.
- Levar estilos globais de `src/styles/nissan.css` para:
- `src/app.css`
- ou layout/componentes Svelte separados quando fizer sentido

### SEO

- Migrar `src/lib/seo.js` para a abordagem nativa do SvelteKit.
- Substituir atualização imperativa de `document.title` por `load` + `<svelte:head>` ou metadados por rota.
- Gerar `title`, `description`, `canonical`, `og:title`, `og:description`, `twitter:title`, `twitter:description` por rota.
- Manter uso de `VITE_PUBLIC_URL_FRONTEND` ou equivalente para canonical absoluto.
- Garantir que o HTML inicial do servidor já venha com metadados corretos.

### GTM e tracking

- Migrar `src/dataLayer.js`.
- Migrar `src/lib/gtm.js`.
- Preservar `page_view`, `header_click`, `model_card_click`, `cta_click`, `footer_click`, `form_*`, `lead_submit`.
- Revisar onde os eventos devem ser disparados no ciclo do SvelteKit.
- Garantir que GTM só rode no client.
- Decidir se o `noscript` do GTM será recolocado no template do app.

### Formulário e webhook

- Migrar `src/components/form.js`.
- Migrar `src/webhook.js`.
- Decidir se o submit continua client-side direto para `VITE_WEBHOOK_URL` ou se passa por endpoint do SvelteKit.
- Preservar:
- validações
- estados de loading
- mensagens de sucesso/erro
- eventos de tracking

### Navegação e transições

- Reavaliar toda a lógica de navegação de `src/lib/navigation-context.js`.
- Reavaliar `src/lib/view-transitions.js`.
- Decidir se View Transitions continuam no novo app.
- Decidir se animações de entrada continuam.
- Validar comportamento entre:
- home -> modelo
- modelos -> modelo
- redirects legados
- navegação por histórico

### Assets e fontes

- Migrar fontes e assets usados por `src/styles/nissan.css`.
- Verificar se os arquivos em `public/assets` continuam válidos.
- Ajustar caminhos para a convenção do SvelteKit (`static/`).

### Variáveis de ambiente

- Preservar e revisar:
- `VITE_PUBLIC_URL_FRONTEND`
- `VITE_GTM_ID`
- `VITE_WEBHOOK_URL`
- Criar `.env.example` equivalente no novo projeto.
- Confirmar leitura correta das envs no SvelteKit.

### CSS e comportamento visual

- Migrar o visual atual sem regressão de layout.
- Revisar se o CSS global atual deve ser:
- importado integralmente no início
- ou quebrado em blocos por componente
- Validar responsividade desktop/mobile.
- Validar sticky header, formulário, cards, footer e slideshow.

### Conteúdo dependente de browser

- Identificar e isolar trechos que usam:
- `window`
- `document`
- `history`
- `IntersectionObserver`
- `requestAnimationFrame`
- `HTMLElement`
- `HTMLAnchorElement`
- `HTMLSelectElement`
- `RadioNodeList`
- Garantir que nada disso execute no SSR.

## Estrutura sugerida do novo projeto

- `project-sv/src/routes/+layout.svelte`
- `project-sv/src/routes/+page.svelte`
- `project-sv/src/routes/modelos/+page.svelte`
- `project-sv/src/routes/popup/+page.svelte`
- `project-sv/src/routes/happiniss-days/+page.svelte`
- `project-sv/src/routes/modelos/nissan-leaf/+page.svelte`
- `project-sv/src/routes/modelos/nissan-ariya/+page.svelte`
- `project-sv/src/routes/modelos/nissan-qashqai/+page.svelte`
- `project-sv/src/routes/modelos/nissan-x-trail/+page.svelte`
- `project-sv/src/routes/modelos/novo-nissan-juke/+page.svelte`
- `project-sv/src/routes/modelos/novo-micra/+page.svelte`
- `project-sv/src/routes/usados-juke/+page.svelte`
- `project-sv/src/routes/usados-qashqai/+page.svelte`
- `project-sv/src/routes/nissan-juke/+page.svelte`
- `project-sv/src/routes/usadosjuke/+page.server.js` ou redirect equivalente
- `project-sv/src/routes/usadosqashqai/+page.server.js` ou redirect equivalente
- `project-sv/src/lib/components/*`
- `project-sv/src/lib/page-definitions.js`
- `project-sv/src/lib/model-banners.js`
- `project-sv/src/lib/gtm.js`
- `project-sv/src/lib/tracking.js`

## Ordem recomendada de migração

1. Scaffold do SvelteKit em `project-sv`.
2. Configurar envs, CSS global e assets.
3. Migrar `page-definitions` e `model-banners`.
4. Criar layout global com header/footer.
5. Migrar home e `/modelos/`.
6. Migrar páginas de detalhe de modelo/campanha/usados.
7. Migrar formulário.
8. Migrar SEO por rota.
9. Migrar GTM e tracking.
10. Reintroduzir transições só depois de a navegação base estar estável.

## Riscos principais

- Código atual depende fortemente de DOM imperativo, então não existe conversão automática para Svelte.
- SSR exige blindagem de todo acesso a APIs de browser.
- View Transitions podem conflitar com navegação do SvelteKit se portadas cedo demais.
- O formulário pode ficar melhor como endpoint interno do SvelteKit, mas isso altera a arquitetura atual.

## Definição de pronto mínima

- Todas as rotas públicas renderizando HTML no servidor.
- Metadados corretos por rota no HTML inicial.
- Header, footer, cards, hero e formulário funcionando.
- Redirects legados funcionando.
- GTM e eventos principais funcionando no client.
- Sem regressão visual grave em desktop e mobile.
