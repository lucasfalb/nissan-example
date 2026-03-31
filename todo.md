# TODO - Migracao antigo projeto -> project-sv

## Prioridade 0 - Destravar o `project-sv`

- [ ] Criar `project-sv/src/routes/usados/[slug]/+page.ts`
- [ ] Implementar `load` + `entries` para `juke` e `qashqai`
- [ ] Validar `data.page` e `data.seo` em `project-sv/src/routes/usados/[slug]/+page.svelte`
- [ ] Corrigir erro de tipagem de `group.align` em `project-sv/src/lib/components/layout/Header.svelte`
- [ ] Corrigir tipagem implícita de `slide` em `project-sv/src/lib/components/marketing/HomeSlideshow.svelte`
- [ ] Corrigir aviso de acessibilidade do container com `pointer` handlers em `project-sv/src/lib/components/marketing/HomeSlideshow.svelte`
- [ ] Rodar `npm run check` até zerar erros

## Prioridade 1 - Migrar o formulario de lead

- [ ] Portar `src/components/form.js` para um componente Svelte
- [ ] Preservar validações de nome, email, telefone, versão e tipo de interesse
- [ ] Preservar variantes do form para campanhas/standalone e modelos/usados
- [ ] Recolocar o alvo `#lead-form` usado pelos CTAs do hero
- [ ] Migrar estados de submit: loading, sucesso e erro
- [ ] Migrar tracking do funil do form:
- [ ] `form_view`
- [ ] `form_start`
- [ ] `form_field_interaction`
- [ ] `form_error`
- [ ] `form_submit_attempt`
- [ ] `lead_submit`
- [ ] `form_submit_success`
- [ ] `form_submit_failure`

## Prioridade 2 - Migrar envio para webhook

- [ ] Portar `src/webhook.js`
- [ ] Decidir arquitetura:
- [ ] client-side direto para `VITE_WEBHOOK_URL`
- [ ] ou endpoint interno do SvelteKit
- [ ] Preservar payload atual:
- [ ] `timestamp`
- [ ] `page_path`
- [ ] `page_type`
- [ ] `event_type`
- [ ] `form_data`
- [ ] `datalayer_snapshot`
- [ ] Definir estratégia de erro para ambientes sem webhook configurado

## Prioridade 3 - Migrar GTM e tracking global

- [ ] Portar `src/dataLayer.js`
- [ ] Portar `src/lib/gtm.js`
- [ ] Inicializar GTM apenas no client
- [ ] Decidir se o `noscript` do GTM volta para `app.html`
- [ ] Migrar eventos globais já usados no projeto antigo:
- [ ] `page_view`
- [ ] `header_click`
- [ ] `model_card_click`
- [ ] `cta_click`
- [ ] `footer_click`
- [ ] Garantir que home, header, footer, cards e hero disparem eventos equivalentes

## Prioridade 4 - Fechar as rotas e redirects da migracao

- [ ] Confirmar se a URL final canonica sera:
- [ ] `/campanhas/...` e `/usados/...`
- [ ] ou manter compatibilidade publica com `/popup/`, `/happiniss-days/`, `/usados-juke/`, `/usados-qashqai/`
- [ ] Criar redirects para rotas antigas com hifen, se a mudanca de URL for definitiva
- [ ] Validar redirects legados sem hifen ja existentes:
- [ ] `/usadosjuke/`
- [ ] `/usadosqashqai/`
- [ ] Revisar links internos da home, header e cards para nao deixar caminhos antigos sem cobertura

## Prioridade 5 - Completar SEO por rota

- [ ] Manter `title`, `description` e `canonical` em todas as paginas
- [ ] Adicionar metatags Open Graph por rota
- [ ] Adicionar metatags Twitter por rota
- [ ] Definir URL base canonica por env em vez de depender de fallback local
- [ ] Revisar metadados globais em `+layout.svelte`
- [ ] Validar HTML inicial gerado por SSR/prerender

## Prioridade 6 - Configurar envs do novo projeto

- [ ] Criar `.env.example` especifico para `project-sv`
- [ ] Mapear equivalentes de:
- [ ] `VITE_PUBLIC_URL_FRONTEND`
- [ ] `VITE_GTM_ID`
- [ ] `VITE_WEBHOOK_URL`
- [ ] Padronizar leitura das envs no SvelteKit

## Prioridade 7 - Revisar comportamento que existia no SPA antigo

- [ ] Decidir se `view transitions` serao migradas
- [ ] Decidir se a logica de `navigation-context` continua necessaria
- [ ] Se sim, reintroduzir isso apenas depois de rotas, form e tracking estarem estaveis
- [ ] Validar scroll/foco ao clicar nos CTAs do hero

## Prioridade 8 - Limpeza e validacao final

- [ ] Rodar `npm run check`
- [ ] Rodar `npm run build`
- [ ] Testar manualmente:
- [ ] home
- [ ] hub de modelos
- [ ] campanhas
- [ ] modelos
- [ ] usados
- [ ] landing `/nissan-juke/`
- [ ] redirects legados
- [ ] submit do formulario
- [ ] eventos principais no `dataLayer`
- [ ] Revisar encoding de textos com caracteres corrompidos
- [ ] Atualizar `project-sv/README.md` com setup real do projeto

## Ordem recomendada de execucao

1. Corrigir `usados/[slug]` e os erros atuais do `svelte-check`
2. Migrar formulario
3. Migrar webhook
4. Migrar GTM e tracking global
5. Fechar redirects e estrategia de URLs
6. Completar SEO e envs
7. Revisar transicoes e refinamentos finais
