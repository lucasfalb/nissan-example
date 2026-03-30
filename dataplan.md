# Data Plan

## Objetivo

Definir um plano de eventos direto, focado em comportamento comercial e navegação real da plataforma.

A prioridade aqui não é tracking genérico. É medir:
- clique em CTA
- clique em header
- clique em footer
- clique em card de modelo
- interação com slideshow
- funil completo do formulário

## Estrutura Base Recomendada

Todo evento deve carregar, sempre que possível:
- `event`
- `page_path`
- `page_type`
- `page_category`
- `page_model`
- `source_component`
- `source_label`
- `destination_path`

## Eventos Principais

### 1. `page_view`

Quando dispara:
- entrada em qualquer rota

Propriedades:
- `page_path`
- `page_type`
- `page_category`
- `page_model`

Status:
- já implementado

### 2. `header_click`

Quando dispara:
- clique em qualquer link do header
- clique em item de submenu

Propriedades:
- `source_component: "header"`
- `source_label`
- `nav_group`
- `destination_path`
- `page_path`
- `page_type`
- `page_model`

Exemplos:
- clique em `Modelos`
- clique em `Usados`
- clique em `Juke Usado`
- clique na logo

### 3. `footer_click`

Quando dispara:
- clique em qualquer link do footer

Propriedades:
- `source_component: "footer"`
- `source_label`
- `destination_path`
- `page_path`
- `page_type`
- `page_model`

### 4. `cta_click`

Quando dispara:
- clique em CTA principal ou secundário

Propriedades:
- `source_component`
- `cta_type`
- `cta_label`
- `destination_path`
- `page_path`
- `page_type`
- `page_model`

Exemplos de `cta_type`:
- `test_drive`
- `catalog`
- `models_hub`
- `campaign`

Status:
- parcialmente implementado

### 5. `model_card_click`

Quando dispara:
- clique em card de modelo
- clique em card de usados
- clique em card de campanha, se seguir mesma lógica visual

Propriedades:
- `source_component: "model_card"`
- `card_title`
- `card_category`
- `card_position`
- `banner_key`
- `destination_path`
- `page_path`

### 6. `slideshow_click`

Quando dispara:
- clique no slide ativo para navegar

Propriedades:
- `source_component: "slideshow"`
- `slide_index`
- `slide_title`
- `banner_key`
- `destination_path`
- `page_path`

### 7. `slideshow_dot_click`

Quando dispara:
- clique em um dot do slideshow

Propriedades:
- `source_component: "slideshow"`
- `slide_index`
- `slide_title`
- `interaction_type: "dot"`
- `page_path`

### 8. `slideshow_swipe`

Quando dispara:
- swipe manual no slideshow

Propriedades:
- `source_component: "slideshow"`
- `slide_index_from`
- `slide_index_to`
- `slide_title_to`
- `interaction_type: "swipe"`
- `direction`
- `page_path`

### 9. `slideshow_auto_change`

Quando dispara:
- troca automática de slide

Propriedades:
- `source_component: "slideshow"`
- `slide_index_from`
- `slide_index_to`
- `slide_title_to`
- `interaction_type: "auto"`
- `page_path`

## Funil Completo Do Formulário

### 10. `form_view`

Quando dispara:
- formulário entrou em viewport

Propriedades:
- `form_id`
- `page_path`
- `page_type`
- `page_model`

### 11. `form_start`

Quando dispara:
- primeiro foco em qualquer campo

Propriedades:
- `form_id`
- `page_model`
- `page_path`

Status:
- já implementado

### 12. `form_field_interaction`

Quando dispara:
- primeiro preenchimento por campo

Propriedades:
- `form_id`
- `field_name`
- `page_model`
- `page_path`

Campos principais:
- `name`
- `email`
- `phone`
- `version`
- `interest_type`
- `model_interest`
- `message`

### 13. `form_error`

Quando dispara:
- submit inválido

Propriedades:
- `form_id`
- `page_model`
- `page_path`
- `error_field`
- `error_type`

Exemplos de `error_type`:
- `required`
- `invalid_email`
- `invalid_phone`

Status:
- parcialmente implementado

### 14. `form_submit_attempt`

Quando dispara:
- clique no botão de envio

Propriedades:
- `form_id`
- `page_model`
- `page_path`
- `interest_type`
- `version`

### 15. `lead_submit`

Quando dispara:
- formulário válido enviado

Propriedades:
- `form_id`
- `page_model`
- `form_model`
- `form_version`
- `form_model_interest`
- `form_interest_type`
- `form_has_message`

Status:
- já implementado

### 16. `form_submit_success`

Quando dispara:
- webhook respondeu com sucesso

Propriedades:
- `form_id`
- `page_model`
- `page_path`
- `interest_type`
- `version`

### 17. `form_submit_failure`

Quando dispara:
- webhook falhou

Propriedades:
- `form_id`
- `page_model`
- `page_path`
- `error_message`

## Prioridade Real De Implementação

### Prioridade 1

- `header_click`
- `footer_click`
- `model_card_click`
- `slideshow_click`
- `slideshow_dot_click`
- `form_submit_attempt`
- `form_submit_success`
- `form_submit_failure`

### Prioridade 2

- `form_view`
- `form_field_interaction`
- `slideshow_swipe`
- `slideshow_auto_change`

### Prioridade 3

- `header_menu_open`
- `header_menu_close`
- `submenu_open`
- `submenu_close`

## Mapeamento Por Área

### Header

Eventos:
- `header_click`

Origem provável:
- [src/components/header.js](/c:/Users/lucas/Documents/niw/project-test/src/components/header.js)

### Footer

Eventos:
- `footer_click`

Origem provável:
- [src/main.js](/c:/Users/lucas/Documents/niw/project-test/src/main.js)

### Cards

Eventos:
- `model_card_click`

Origem provável:
- [src/components/cards.js](/c:/Users/lucas/Documents/niw/project-test/src/components/cards.js)
- [src/main.js](/c:/Users/lucas/Documents/niw/project-test/src/main.js)

### Hero / CTAs

Eventos:
- `cta_click`

Origem provável:
- [src/main.js](/c:/Users/lucas/Documents/niw/project-test/src/main.js)
- [src/components/hero.js](/c:/Users/lucas/Documents/niw/project-test/src/components/hero.js)

### Slideshow

Eventos:
- `slideshow_click`
- `slideshow_dot_click`
- `slideshow_swipe`
- `slideshow_auto_change`

Origem provável:
- [src/components/home-slideshow.js](/c:/Users/lucas/Documents/niw/project-test/src/components/home-slideshow.js)

### Form

Eventos:
- `form_view`
- `form_start`
- `form_field_interaction`
- `form_error`
- `form_submit_attempt`
- `lead_submit`
- `form_submit_success`
- `form_submit_failure`

Origem provável:
- [src/components/form.js](/c:/Users/lucas/Documents/niw/project-test/src/components/form.js)
- [src/webhook.js](/c:/Users/lucas/Documents/niw/project-test/src/webhook.js)

## Plano Mínimo Ideal

Se for para sair com o conjunto mais útil possível, o mínimo ideal é:

1. `page_view`
2. `header_click`
3. `footer_click`
4. `cta_click`
5. `model_card_click`
6. `slideshow_click`
7. `slideshow_dot_click`
8. `form_start`
9. `form_error`
10. `form_submit_attempt`
11. `lead_submit`
12. `form_submit_success`
13. `form_submit_failure`
