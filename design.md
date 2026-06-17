# DESIGN — Site Glide Esquadrias e Fachadas

---

## REFERÊNCIAS VISUAIS

- **Inspiração principal:** projettaaluminio.com
- **Pasta de logos:** `/logos`
- **Pasta de prints de inspiração:** `/inspo`
- **Estilo geral:** Luxury minimalism — sofisticado, limpo, com muito espaço em branco e hierarquia tipográfica forte.

---

## PALETA DE CORES

```
--color-background:     #FFFFFF        /* fundo principal */
--color-surface:        #F5F5F3        /* fundo de seções alternadas (off-white quente) */
--color-dark:           #1A1A1A        /* textos principais, hero, títulos */
--color-mid:            #4A4A4A        /* textos secundários, subtítulos */
--color-light:          #8A8A8A        /* textos de apoio, labels, rodapé */
--color-accent:         #1A1A1A        /* cor de destaque (preto) — botões CTA principais */
--color-accent-hover:   #333333        /* hover dos botões */
--color-border:         #E0E0E0        /* bordas, linhas divisórias */
--color-whatsapp:       #25D366        /* ícone flutuante do WhatsApp */
```

> **Nota:** O site da Glide usa uma paleta neutra e elegante — preto, branco e tons de cinza. Isso reforça o posicionamento premium. Evitar cores vibrantes fora do ícone do WhatsApp.

---

## TIPOGRAFIA

```
--font-heading:   'Cormorant Garamond', serif      /* títulos e headings principais */
--font-body:      'Inter', sans-serif               /* corpo de texto, labels, botões */
--font-accent:    'Inter', sans-serif               /* subtítulos, destaques em caps */
```

**Escala tipográfica:**
```
--text-hero:      clamp(3rem, 6vw, 5.5rem)         /* headline do hero */
--text-h1:        clamp(2.2rem, 4vw, 3.5rem)       /* títulos de seção */
--text-h2:        clamp(1.6rem, 3vw, 2.5rem)       /* subtítulos de seção */
--text-h3:        1.25rem                           /* títulos de cards */
--text-body:      1rem                              /* corpo */
--text-small:     0.875rem                          /* labels, rodapé */
--text-caps:      0.75rem / letter-spacing: 0.15em /* labels em caixa alta */
```

**Uso:**
- Títulos principais → `Cormorant Garamond`, peso 300–400, tracking normal
- Subtítulos e corpo → `Inter`, peso 300–400
- CTAs e labels → `Inter`, peso 500, uppercase, letter-spacing generoso
- Números de destaque (stats) → `Cormorant Garamond`, peso 300, tamanho grande

---

## ESPAÇAMENTO E GRID

```
--spacing-section:   120px 0       /* padding vertical entre seções (desktop) */
--spacing-section-m: 72px 0        /* padding vertical entre seções (mobile) */
--container-max:     1280px        /* largura máxima do container */
--container-padding: 0 80px        /* padding lateral desktop */
--container-padding-m: 0 24px      /* padding lateral mobile */
--grid-gap:          32px          /* gap padrão entre colunas/cards */
```

---

## COMPONENTES

### NAVBAR

- **Posição:** Fixed, topo da página
- **Fundo:** Transparente sobre o hero; ao rolar → `#FFFFFF` com `box-shadow: 0 1px 0 var(--color-border)`
- **Logo:** Centralizado (igual à referência Projetta)
- **Menu:** Hamburguer à esquerda no desktop (estilo minimalista) → abre sidebar ou dropdown limpo
- **Idioma:** Não necessário (apenas PT)
- **Altura:** 72px desktop / 60px mobile
- **Transição:** `transition: background 0.3s ease`

### HERO

- **Layout:** Imagem de fundo fullscreen (foto de uma porta de alto impacto) com overlay dark `rgba(0,0,0,0.45)`
- **Conteúdo:** Alinhado à esquerda, no terço inferior-esquerdo da tela
- **Headline:** `Cormorant Garamond`, grande, branco, peso 300
- **Subheadline:** `Inter`, pequeno, branco 80% opacidade
- **CTA:** Botão outline branco com hover para preenchido branco + texto preto
- **Altura:** `100vh`
- **Variação mobile:** Texto centralizado, imagem com `object-position: center`

### BOTÕES

```
/* Primário (fundo escuro) */
.btn-primary {
  background: var(--color-dark);
  color: #FFFFFF;
  padding: 14px 32px;
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}
.btn-primary:hover { background: var(--color-accent-hover); }

/* Secundário (outline) */
.btn-outline {
  background: transparent;
  color: var(--color-dark);
  border: 1px solid var(--color-dark);
  padding: 13px 31px;
  /* mesma tipografia do primário */
}
.btn-outline:hover {
  background: var(--color-dark);
  color: #FFFFFF;
}

/* Outline branco (sobre fundo escuro/hero) */
.btn-outline-white {
  border-color: #FFFFFF;
  color: #FFFFFF;
}
.btn-outline-white:hover {
  background: #FFFFFF;
  color: var(--color-dark);
}
```

### CARDS DE PRODUTO (Home)

- **Layout:** Grid 2×2 desktop / 1 coluna mobile
- **Estilo:** Fundo `--color-surface`, sem sombra, borda sutil `1px solid var(--color-border)`
- **Estrutura interna:**
  - Número do card (`01`, `02`...) → `Inter`, 0.75rem, `--color-light`
  - Título → `Inter`, 1.1rem, peso 600
  - Texto → `Inter`, 0.95rem, peso 300, `--color-mid`
  - CTA → botão outline pequeno
- **Hover:** `border-color: var(--color-dark)` + leve `transform: translateY(-2px)`
- **Padding interno:** 40px

### SEÇÕES ALTERNADAS (texto + imagem)

- **Layout:** 50/50 desktop (imagem | texto), alternando lado a cada seção
- **Imagem:** `object-fit: cover`, altura mínima 480px
- **Texto:** padding 60px, `max-width: 480px`
- **Fundo:** Alternar entre `#FFFFFF` e `--color-surface`
- **Mobile:** Empilhado, imagem acima do texto

### BLOCO DE STATS (Números)

- **Layout:** 3 colunas desktop / 1 coluna mobile
- **Número:** `Cormorant Garamond`, 4rem, `--color-dark`
- **Label:** `Inter`, 0.8rem, uppercase, `--color-light`
- **Fundo:** `--color-surface`
- **Separador:** linha sutil entre colunas `1px solid var(--color-border)`

### ETAPAS / PROCESSO (Do Projeto à Instalação)

- **Layout:** 4 colunas horizontais com número circulado
- **Número:** Círculo `48px`, borda `1px solid --color-dark`, texto centralizado
- **Título:** `Inter`, 0.9rem, peso 500
- **Descrição:** `Inter`, 0.85rem, `--color-mid`
- **Conector:** linha horizontal fina entre os círculos (apenas desktop)

### GALERIA / GRID DE PROJETOS

- **Layout:** Masonry ou grid irregular (mistura de 1, 2 e 3 colunas)
- **Hover:** overlay dark sutil com nenhum texto (só efeito visual limpo)
- **Imagens:** `object-fit: cover`, proporção variada para dinamismo visual
- **Gap:** 8px entre fotos (estilo editorial)

### PÁGINAS DE PRODUTO

- **Hero da página:** Imagem fullwidth com título sobreposto (overlay suave)
- **Corpo:**
  - Título + subtítulo → à esquerda
  - Texto descritivo → coluna esquerda
  - Lista de destaques técnicos → coluna direita, com `•` ou linha fina como marcador
- **CTA:** Dois botões lado a lado — primário (Solicitar Estudo) + outline (WhatsApp)
- **Galeria inferior:** Grid 3 colunas de fotos do produto

---

## WHATSAPP FLUTUANTE

```css
.whatsapp-float {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 999;
  width: 56px;
  height: 56px;
  background-color: var(--color-whatsapp); /* #25D366 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.whatsapp-float:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
}

/* Tooltip ao hover */
.whatsapp-float::before {
  content: "Fale com um especialista";
  position: absolute;
  right: 68px;
  background: var(--color-dark);
  color: #fff;
  font-size: 0.75rem;
  font-family: Inter;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}
.whatsapp-float:hover::before { opacity: 1; }
```

- **Ícone:** SVG do WhatsApp, branco, 28px
- **Mobile:** `bottom: 20px; right: 20px;` / sem tooltip, apenas ícone

---

## RODAPÉ

- **Fundo:** `#FFFFFF`
- **Separador topo:** `1px solid var(--color-border)`
- **Layout:** 3–4 colunas desktop / 2 colunas mobile / 1 coluna muito pequeno
- **Colunas sugeridas:**
  - Logo + redes sociais
  - Links de navegação
  - Contato / endereço
- **Tipografia:** `Inter`, 0.85rem, `--color-light`
- **Links hover:** `color: var(--color-dark)`
- **Ícones sociais:** 20px, `--color-mid`, hover `--color-dark`

---

## ANIMAÇÕES E MICRO-INTERAÇÕES

- **Entrada de seções:** `opacity: 0 → 1` + `translateY(20px → 0)` ao entrar no viewport (`IntersectionObserver`)
- **Duração:** 0.6s, `ease-out`
- **Stagger em cards:** delay de 0.1s entre cada card
- **Imagens:** leve `scale(1.03)` no hover em galerias
- **Botões:** `transition: all 0.2s ease` — sem animações bruscas
- **Scroll suave:** `scroll-behavior: smooth` no `<html>`

---

## RESPONSIVIDADE

| Breakpoint | Largura       | Comportamento principal                          |
|------------|---------------|--------------------------------------------------|
| Desktop    | > 1024px      | Layout completo, grid lado a lado                |
| Tablet     | 768px–1024px  | Colunas reduzidas, hero com texto menor          |
| Mobile     | < 768px       | Empilhado, navbar hamburguer, hero fullscreen    |

---

## ESTRUTURA DE ARQUIVOS SUGERIDA

```
/
├── index.html                  → Home
├── quem-somos.html             → Quem Somos
├── portas-premium-correr.html  → Produto 1
├── porta-imperial.html         → Produto 2
├── portas-premium.html         → Produto 3
├── portas-elegance.html        → Produto 4
├── projetos.html               → Galeria
├── contato.html                → Contato
├── /css
│   ├── reset.css
│   ├── tokens.css              → variáveis CSS (cores, tipografia, espaçamento)
│   └── main.css
├── /js
│   └── main.js                 → scroll animations, navbar, whatsapp float
├── /images
│   ├── /hero                   → imagens de fundo do hero (home e páginas internas)
│   └── /projetos               → fotos de projetos entregues para galeria
├── /fotosportas                → fotos das portas por linha/modelo
│   ├── /premium-correr         → fotos da linha Premium de Correr
│   ├── /imperial               → fotos da linha Porta Imperial
│   ├── /premium                → fotos da linha Portas Premium
│   └── /elegance               → fotos da linha Portas Elegance
└── /logos
```

---

## USO DAS IMAGENS — DIRETRIZES

O site Glide é **rico em imagens**. As fotos são o principal argumento de venda — devem ocupar espaço generoso, ter boa resolução e nunca parecer apertadas ou decorativas demais.

### `/fotosportas` — Páginas de Produto

Cada página de linha de porta deve usar as imagens da sua subpasta correspondente da seguinte forma:

- **Hero da página:** imagem fullwidth (100vw × 70vh) da porta mais impactante da linha
- **Bloco de destaque:** foto grande lado a lado com o texto descritivo (layout 60% imagem / 40% texto)
- **Galeria inferior:** grid de 3 colunas com todas as fotos restantes da subpasta — sem limite de quantidade, quanto mais fotos melhor
- **Zoom no hover:** leve `scale(1.04)` com `overflow: hidden` no container para efeito editorial
- **Lightbox:** ao clicar em qualquer foto da galeria, abrir em overlay fullscreen com navegação por setas

### `/images/projetos` — Página de Galeria e Seção Home

- **Home:** grid irregular (masonry) com 6–9 fotos em destaque + botão "Ver todos os projetos"
- **Página Galeria:** grid completo com todas as fotos disponíveis, layout masonry ou irregular para dinamismo visual
- **Gap entre fotos:** 6–8px (estilo editorial, sem cards com borda)
- **Lightbox:** mesmo comportamento da galeria de produto

### `/images/hero` — Backgrounds de Hero

- Usar `object-fit: cover` sempre
- Overlay: `rgba(0,0,0,0.42)` para garantir legibilidade do texto branco
- Em páginas internas (produto, quem somos): hero menor, `50–60vh`
- Na home: `100vh` obrigatório

### Princípios gerais de uso de imagem

1. **Imagens grandes vendem mais** — nunca reduzir demais o tamanho das fotos para "caber" no layout; adaptar o layout para valorizar a foto
2. **Sem imagens genéricas de stock** — usar apenas as fotos reais das pastas do projeto
3. **Proporção livre na galeria** — misturar retratos e paisagens no grid para variedade visual
4. **Lazy loading** em todas as imagens (`loading="lazy"`) para performance
5. **Alt text descritivo** em todas as imagens para SEO (ex: `alt="Porta Imperial Glide em residência de alto padrão"`)
6. **Sem bordas ou sombras nas fotos** — deixar as imagens "sangrar" no layout, sem molduras

---

## INSTRUÇÕES PARA O CLAUDE (ao gerar o código)

1. **Usar as variáveis CSS** definidas em `tokens.css` para cores, fontes e espaçamentos — nunca valores hardcoded.
2. **Importar as fontes** via Google Fonts: `Cormorant Garamond` (weights 300, 400) e `Inter` (weights 300, 400, 500).
3. **Imagens de porta:** referenciar sempre a partir de `/fotosportas/[nome-da-linha]/` — usar todas as fotos disponíveis na subpasta correspondente.
4. **Imagens de projetos e hero:** referenciar de `/images/projetos/` e `/images/hero/`.
5. **Logo:** referenciar de `/logos/` — verificar extensão real do arquivo na pasta.
6. **WhatsApp flutuante:** presente em TODAS as páginas, número a ser preenchido pelo cliente.
7. **Navbar:** mesmo componente reutilizado em todas as páginas, com link ativo destacado.
8. **Não usar frameworks CSS** (Bootstrap, Tailwind) — CSS puro com variáveis para máximo controle visual.
9. **Sem JavaScript pesado** — animações em CSS quando possível, JS apenas para IntersectionObserver, lightbox e interações simples.
10. **Prioridade mobile-first** no CSS.
11. **Inspiração visual:** `/inspo` contém prints do site Projetta como referência de composição e espaçamento.
12. **O site deve ser visualmente generoso** — seções amplas, imagens grandes, muito respiro entre os elementos. Nunca comprimir o layout para economizar espaço.
