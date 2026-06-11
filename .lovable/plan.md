# Portfólio Lucas Ferreira — Bento Dark Moderno

Landing page single-page, dark mode minimalista sofisticado, com grid bento, cantos arredondados e destaques em gradiente turquesa→roxo.

## Design System (src/styles.css)
- Background: preto/cinza muito escuro (`oklch(0.14 0 0)` base, cards `oklch(0.18 0.005 260)`).
- Foreground: branco suave.
- Accent 1 (turquesa neon): `oklch(0.85 0.18 190)`.
- Accent 2 (roxo elétrico): `oklch(0.65 0.27 295)`.
- `--gradient-accent: linear-gradient(135deg, turquesa, roxo)`.
- `--shadow-glow`: brilho suave usando a turquesa.
- Fonte: Inter (body) + Space Grotesk (display) via `<link>` no `__root.tsx`.
- Border radius generoso (1.25rem nos cards bento).
- Micro-interações: hover scale leve, glow no border, transição suave 300ms.

## Estrutura (src/routes/index.tsx)
Página única com âncoras (#projetos, #sobre, #contato) para nav simplificada.

### 1. Navbar fixa (top)
- Esquerda: logo `</ L>` minimalista com gradiente.
- Direita: links Projetos, Sobre mim, Contato.

### 2. Hero
- Bento grid 2 colunas: à esquerda título + subtítulo + CTA gradiente "Conheça meus Projetos"; à direita card com avatar circular (placeholder gerado, ilustração minimalista de dev).
- Título: "Lucas Ferreira, Desenvolvedor Full-Stack em Formação".
- Subtítulo: ADS, paixão por soluções, foco em React, Node.js, TypeScript, C++.

### 3. Sobre Mim (bento)
- Card grande: "Uma Breve Jornada" com texto sobre formação, motivação e busca pela primeira oportunidade.
- Card lateral: "Skills Principais" — grid de ícones (lucide + simple labels): C++, JavaScript, TypeScript, React, Node, SQL, Git.

### 4. Projetos — "O Que Estou Construindo"
3 cartões bento lado a lado (responsivo: stack mobile).

- **Projeto 1 — Plataforma de Serviços (ferreiraservice.vercel.app)** (Ativo): descrição de plataforma individual de serviços para Tibia; botão "Ver Projeto Online" → abre `https://ferreiraservice.vercel.app/` em nova aba; tag verde "Online".
- **Projeto 2 — Plataforma de Marketplace MMORPG (munera-landing-page-36)** (Em Construção): descrição marketplace e automação para comunidade de MMORPG; tag "Em Construção"; botão "Ver Código no GitHub" abre modal embutido com iframe de `https://github.com/Hoennkeys/munera-landing-page-36`.
- **Projeto 3 — CRM de Gestão de Vendas (VendaPro)** (Em Construção): tag "Em Construção"; botão "Ver Código no GitHub" abre modal embutido com `https://github.com/Hoennkeys/vendapro-crm`.

**Modal GitHub embutido**: Dialog do shadcn em tela cheia (max-w-6xl, h-[85vh]) com iframe carregando a URL do repo + botão "Abrir no GitHub" como fallback (GitHub envia `X-Frame-Options: deny`, então o iframe pode não renderizar — incluiremos mensagem fallback e link direto). Para entregar a experiência prometida, o modal mostrará: cabeçalho com nome do repo, iframe tentando carregar o repo, e abaixo um link grande "Abrir no GitHub →". Assim a janela aparece embutida sem sair do site, mesmo quando o iframe é bloqueado.

### 5. Contato (bento misto)
- Card grande: "Vamos Criar Algo Juntos?" + parágrafo.
- 3 cards menores clicáveis com ícone lucide:
  - GitHub → `https://github.com/Hoennkeys`
  - LinkedIn → `https://www.linkedin.com/in/ferreir4dev/`
  - Email → `mailto:ferreir4dev@gmail.com`

### 6. Footer
- "© 2024 Lucas Ferreira. Criado com IA e paixão."
- Links GitHub e LinkedIn.

## Assets
- Gerar 1 ilustração minimalista (avatar/abstrato dev) em `src/assets/hero-avatar.png` (transparente, estilo geométrico com gradiente turquesa→roxo).

## Arquivos
- `src/styles.css` — tokens dark + gradiente + glow.
- `src/routes/__root.tsx` — fontes Google via `<link>`, meta SEO.
- `src/routes/index.tsx` — head meta (title "Lucas Ferreira — Dev Full-Stack", description) + componente da página.
- `src/components/portfolio/` — Navbar, Hero, About, Projects, ProjectCard, GithubModal, Contact, Footer.
- `src/assets/hero-avatar.png` — gerado.

## Detalhes técnicos
- Sem backend; tudo client-side.
- Smooth scroll via CSS `scroll-behavior: smooth`.
- Acessibilidade: alt nas imagens, aria-labels nos links sociais, H1 único no hero.
- SEO: title <60 chars, meta description <160, og tags.
