# Diferenças do projeto antigo para `project-sv`

## Objetivo deste documento

Listar o que ainda está diferente entre o projeto antigo em `src/` e o novo em `project-sv/`.

O foco aqui não é "melhorias" nem "adaptações aceitáveis".
O foco é: **o que ainda não está igual ao comportamento/estrutura anterior**.

---

## 1. View Transition API e transição compartilhada card -> hero

### Como era no projeto antigo

- O card clicado era "preparado" antes da navegação.
- O `view-transition-name` não ficava preso em todos os cards o tempo todo.
- A preparação acontecia via:
  - `data-transition-part="card-banner"`
  - `data-transition-part="card-title"`
- O clique definia um contexto de navegação com:
  - `from`
  - `to`
  - `source`
  - `transitionKey`
- No destino, o hero consumia esse contexto e aplicava a transição no:
  - `data-hero-banner`
  - `data-hero-title`
- Quando a origem era card, a transição de página (`page-main`) era desligada para priorizar a shared transition.

### Onde isso existia no antigo

- [`src/main.js`](/c:/Users/lucas/Documents/project-test/src/main.js)
- [`src/components/cards.js`](/c:/Users/lucas/Documents/project-test/src/components/cards.js)
- [`src/components/hero.js`](/c:/Users/lucas/Documents/project-test/src/components/hero.js)
- [`src/lib/navigation-context.js`](/c:/Users/lucas/Documents/project-test/src/lib/navigation-context.js)
- [`src/lib/view-transitions.js`](/c:/Users/lucas/Documents/project-test/src/lib/view-transitions.js)

### O que ainda difere no `project-sv`

- A implementação atual ainda está mais acoplada ao fluxo do SvelteKit do que ao fluxo exato do antigo.
- A transição foi adaptada para o `onNavigate`, mas o projeto antigo era orientado por clique + contexto consumido manualmente.
- O comportamento visual percebido ainda não bate com o antigo no fluxo card -> hero.
- Ainda falta validar se:
  - só o card clicado recebe `view-transition-name`
  - o hero de destino recebe exatamente os mesmos nomes e no mesmo momento
  - a animação de página não interfere no shared transition

### Estado esperado para ficar igual ao antigo

- O movimento do título deve sair do lugar exato do card e pousar no hero.
- O banner do card deve fazer a mesma continuidade visual até o hero.
- O restante da página não deve introduzir uma animação nova por cima desse efeito.

---

## 2. Estrutura e comportamento do Hero

### Como era no projeto antigo

O hero antigo possuía estrutura e hooks específicos:

- `data-hero-banner`
- `data-hero-title`
- `data-hero-stage="eyebrow"`
- `data-hero-stage="subtitle"`
- `data-hero-stage="ctas"`

Além disso:

- o subtitle tinha fundo translúcido específico
- os CTAs tinham comportamento e ordem visual bem definidos
- o hero era preparado para shared transition e para animações de entrada

### Onde isso existia no antigo

- [`src/components/hero.js`](/c:/Users/lucas/Documents/project-test/src/components/hero.js)

### O que ainda difere no `project-sv`

- Apesar dos hooks terem sido reintroduzidos, o fluxo visual ainda não está reproduzindo o mesmo resultado do antigo.
- O destino da transição ainda não aparenta estar "casando" visualmente com a origem do card do mesmo jeito.
- O acoplamento entre `transitionKey`, hero e navegação ainda precisa ser igualado 1:1 ao antigo.

---

## 3. Animações de entrada da página

### Como era no projeto antigo

O antigo tinha animações de entrada baseadas em `.page-wrapper.is-ready`.

Elementos afetados:

- `[data-hero-title]`
- `[data-hero-stage]`
- `[data-form-stage]`

Com delays específicos por etapa:

- title
- eyebrow
- subtitle
- ctas
- highlights
- form panel
- form card

### Onde isso existia no antigo

- [`src/styles/nissan.css`](/c:/Users/lucas/Documents/project-test/src/styles/nissan.css)

### O que ainda difere no `project-sv`

- Essas animações foram recolocadas no CSS, mas ainda precisam ser validadas no comportamento real da navegação.
- No antigo, elas coexistiam com a lógica manual do render e `flushPageEntrance`.
- No `project-sv`, isso foi adaptado com `onMount` + `afterNavigate`, o que pode não reproduzir exatamente o mesmo timing visual.

---

## 4. Menu mobile

### Como era no projeto antigo

O menu mobile anterior tinha uma identidade visual mais definida:

- backdrop próprio
- sheet visual separado
- header do sheet
- botão de fechar customizado
- utilitários de rodapé
- hierarquia visual mais forte entre grupo, subitem e ação

### Onde isso existia no antigo

- [`src/components/header.js`](/c:/Users/lucas/Documents/project-test/src/components/header.js)
- [`src/styles/nissan.css`](/c:/Users/lucas/Documents/project-test/src/styles/nissan.css)

### O que ainda difere no `project-sv`

- O menu mobile do novo foi refeito algumas vezes e ainda não está visualmente equivalente ao antigo.
- A versão atual usa estrutura simplificada de drawer lateral.
- O antigo parecia mais um sheet/painel próprio; o novo está com outra linguagem.
- Espaçamentos, close button, densidade e hierarquia ainda não batem com o original.

### Conclusão desta área

Hoje o menu mobile do `project-sv` não pode ser considerado equivalente ao antigo.

---

## 5. CSS global e fidelidade visual

### Como era no projeto antigo

O CSS global em [`src/styles/nissan.css`](/c:/Users/lucas/Documents/project-test/src/styles/nissan.css) carregava:

- View Transition styling
- animações de entrada
- menu mobile
- hover/focus de cards
- detalhes de footer
- detalhes de componentes com timing e contain

### O que ainda difere no `project-sv`

- O `layout.css` ainda não é um espelho fiel do `nissan.css`.
- Houve remoções, adaptações e migrações parciais.
- Parte do comportamento foi movida para Tailwind inline, o que muda a forma de composição e pode mudar o resultado visual.
- Ainda falta garantir que o CSS final do novo seja funcionalmente e visualmente equivalente ao original.

---

## 6. Home slideshow

### Como era no projeto antigo

- O slideshow era integrado à navegação do app antigo.
- O clique no slide participava do fluxo de navegação/transição.
- A camada de conteúdo e indicadores tinha comportamento visual específico.

### Onde isso existia no antigo

- [`src/components/home-slideshow.js`](/c:/Users/lucas/Documents/project-test/src/components/home-slideshow.js)

### O que ainda difere no `project-sv`

- O slideshow foi refeito em Svelte e não é uma porta exata do comportamento antigo.
- Já houve divergências visuais recentes:
  - legenda sumindo
  - camada de texto em z-index incorreto
- Ainda precisa ser validado se a navegação do slide participa da View Transition exatamente como antes.

---

## 7. Header/Navigation flow

### Como era no projeto antigo

- Navegação controlada manualmente
- contexto de navegação explícito
- `app:navigate`
- `history.pushState`
- transição iniciada junto com a navegação

### O que ainda difere no `project-sv`

- O novo usa navegação nativa do SvelteKit.
- Isso simplifica a arquitetura, mas altera o timing do fluxo comparado ao antigo.
- Sempre que o efeito visual depender do exato momento do clique, o `project-sv` precisa replicar isso explicitamente.

---

## 8. Estado atual: o que já existe, mas ainda não pode ser considerado fiel

Itens que já foram implementados no `project-sv`, mas ainda não podem ser dados como "iguais ao antigo":

- View Transition API conectada ao navegador
- contexto de navegação para card -> hero
- hooks do hero (`data-hero-title`, `data-hero-banner`, `data-hero-stage`)
- animações de entrada via `.page-wrapper.is-ready`
- formulário e etapas visuais principais

O problema não é ausência total desses blocos.
O problema é: **o resultado final ainda não está reproduzindo o comportamento anterior**.

---

## 9. Diferenças que não são só técnicas, mas perceptíveis

Do ponto de vista visual/comportamental, ainda há pelo menos estas divergências perceptíveis:

- transição card -> hero não está igual
- hero de destino não "recebe" o título/banner como no antigo
- menu mobile não está com a mesma linguagem visual
- timing geral das animações ainda não parece o mesmo

---

## 10. Resumo objetivo

Hoje o `project-sv` está:

- funcional em boa parte
- com várias peças migradas
- com estrutura moderna de SvelteKit

Mas **ainda não está exatamente como o projeto antigo**, principalmente em:

- View Transition API / shared transitions
- hero card -> destino
- menu mobile
- fidelidade do CSS global e timing visual

---

## 11. Critério de aceite real para considerar "igual ao antigo"

Só deve ser considerado equivalente quando:

1. clicar num card na home/modelos reproduzir o mesmo movimento visual do antigo
2. título e banner fizerem a mesma shared transition até o hero
3. animações de entrada tiverem o mesmo timing percebido
4. menu mobile tiver a mesma estrutura visual e interação do original
5. o CSS final não produzir diferenças perceptíveis nesses fluxos
