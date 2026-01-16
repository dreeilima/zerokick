# 🎮 ZeroKick - Guia Completo do Projeto

## 📋 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [O Que Foi Feito Até Agora](#o-que-foi-feito-até-agora)
3. [Próximos Passos](#próximos-passos)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Como Continuar Trabalhando](#como-continuar-trabalhando)

---

## 🎯 Visão Geral do Projeto

### Objetivo Principal

Transformar o projeto **Opensheets** (aplicativo de gestão financeira) em **ZeroKick** - uma plataforma SaaS para venda de macros de no-recoil para jogos FPS competitivos.

### O Que é o ZeroKick?

- **Produto:** Macros/scripts de no-recoil para jogos FPS (CS2, Valorant, Apex Legends, etc.)
- **Dispositivos:** Compatível com Logitech G Hub e Razer Synapse
- **Diferencial:** 100% indetectável por anti-cheat (roda através de software oficial)
- **Modelo de Negócio:** SaaS com assinaturas (Basic, Pro, Lifetime)

### Público-Alvo

Jogadores competitivos de FPS que buscam vantagem através de macros legítimos e indetectáveis.

---

## ✅ O Que Foi Feito Até Agora

### Fase 1: Planejamento e Branding ✅

- [x] Nome definido: **ZeroKick**
- [x] Logo criado (Conceito 3 aprovado - mira com "ZEROKICK")
- [x] Plano de implementação completo
- [x] Aprovação do usuário

### Fase 2: Limpeza do Projeto ✅

**Páginas Removidas (10):**

- Contas, Cartões, Lançamentos, Orçamentos, Calendário
- Categorias, Pagadores, Insights, Anotações, Ajustes

**Componentes Removidos (13):**

- Todos os componentes financeiros (contas, cartões, lançamentos, etc.)

**Dependências Limpas:**

- Removidos: AI SDKs, recharts, react-day-picker, date-fns
- Adicionado: @stripe/stripe-js

**package.json:**

- Nome alterado de "opensheets" para "zerokick"

### Fase 3: Landing Page Adaptada ✅

#### Sistema de Internacionalização (i18n)

**Arquivos Criados:**

- `lib/i18n/translations.ts` - Traduções PT-BR e EN
- `lib/i18n/get-locale.ts` - Detecção automática de idioma
- `lib/i18n/use-translations.ts` - Hook de traduções
- `lib/i18n/index.ts` - Exports

**Como Funciona:**

- Detecta localização pelo header `Accept-Language`
- **Brasil:** Mostra conteúdo em PT-BR
- **Resto do mundo:** Mostra conteúdo em EN
- Traduz automaticamente: Hero, Features, Navegação

#### Paleta de Cores Gaming

**Light Mode:**

- Primary: `oklch(65% 0.19 210)` - Cyan vibrante
- Secondary: `oklch(45% 0.15 290)` - Purple
- Accent: `oklch(60% 0.18 300)` - Neon Purple

**Dark Mode:**

- Primary: `oklch(70% 0.20 210)` - Cyan brilhante
- Background: `oklch(12% 0.01 240)` - Escuro profundo
- Accent: `oklch(65% 0.19 300)` - Purple neon

**Arquivo:** `app/globals.css`

#### Hero Section

**Conteúdo Atualizado:**

- Título: "Zero Recuo, Precisão Máxima" (PT-BR) / "Zero Recoil, Maximum Precision" (EN)
- Badge: "Seguro & Indetectável"
- CTAs: "Começar Teste Grátis" + "Ver Preços"
- Trust badges: 100% Indetectável, Logitech & Razer, Atualizações Instantâneas

#### Features Section

**6 Features Gaming:**

1. **Multi-Game Support** - CS2, Valorant, Apex, PUBG, Rust, R6
2. **Instant Updates** - Scripts atualizados a cada patch
3. **Safe & Undetectable** - Roda via software oficial
4. **Easy Installation** - Setup com um clique
5. **Lifetime Access** - Compra única, sem mensalidades
6. **Premium Support** - Discord + sistema de tickets

#### Logo Component

**Arquivo:** `components/logo.tsx`

**3 Variantes:**

```tsx
// Logo completo (imagem inteira)
<Logo variant="full" />

// Apenas ícone da mira
<Logo variant="icon" />

// Ícone + texto separados (footer)
<Logo variant="split" />
```

**Arquivos de Logo:**

- `public/logo-full.png` - Logo completo
- `public/logo-menor.png` - Ícone da mira

### Fase 4: Database Schema ✅

**Tabelas Removidas (11):**

- contas, categorias, pagadores, cartoes, faturas
- orcamentos, anotacoes, saved_insights
- installment_anticipations, lancamentos

**Tabelas Criadas (5):**

#### 1. `games`

```typescript
{
  id: serial(PK);
  name: text;
  slug: text(unique);
  icon: text;
  active: boolean;
  createdAt: timestamp;
}
```

#### 2. `scripts`

```typescript
{
  id: serial (PK)
  gameId: integer (FK → games)
  weaponName: text
  description: text
  version: text
  fileUrl: text
  deviceType: text // "logitech" | "razer" | "both"
  active: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 3. `licenses`

```typescript
{
  id: serial (PK)
  userId: text (FK → user)
  hwid: text
  subscriptionTier: text // "basic" | "pro" | "lifetime"
  stripeSubscriptionId: text
  expiresAt: timestamp
  active: boolean
  createdAt: timestamp
}
```

#### 4. `downloads`

```typescript
{
  id: serial (PK)
  userId: text (FK → user)
  scriptId: integer (FK → scripts)
  ipAddress: text
  downloadedAt: timestamp
}
```

#### 5. `transactions`

```typescript
{
  id: serial (PK)
  userId: text (FK → user)
  stripePaymentId: text
  amount: integer // em centavos
  currency: text
  status: text // "succeeded" | "failed" | "pending"
  createdAt: timestamp
}
```

**Tabelas Mantidas (Better Auth):**

- user, account, session, verification

**Arquivo:** `db/schema.ts`

---

## 🚀 Próximos Passos

### Fase 3: Finalizar Landing Page

#### 1. Seção de Jogos Suportados

**Objetivo:** Mostrar todos os jogos FPS compatíveis

**Conteúdo:**

- Grid de cards com logos dos jogos
- Jogos: CS2, Valorant, Apex Legends, PUBG, Rust, Rainbow Six Siege
- Badge "Mais jogos em breve"

**Arquivo a criar:** Adicionar seção em `app/(landing-page)/page.tsx`

**Exemplo de código:**

```tsx
<section id="games" className="py-16">
  <div className="container">
    <h2>{t.games.title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  </div>
</section>
```

#### 2. Seção de Pricing

**Objetivo:** Mostrar planos e preços

**Planos Sugeridos:**

- **Basic:** $9.99/mês - 1 jogo, atualizações básicas
- **Pro:** $19.99/mês - Todos os jogos, atualizações instantâneas, suporte prioritário
- **Lifetime:** $99.99 único - Acesso vitalício, todos os jogos, todas as features

**Arquivo a criar:** Adicionar seção em `app/(landing-page)/page.tsx`

**Componente a criar:** `components/pricing-table.tsx`

#### 3. Atualizar Footer

**Tarefas:**

- Trocar "© 2026 opensheets" por "© 2026 ZeroKick"
- Adicionar links: Termos de Uso, Política de Privacidade, Contato
- Usar `<Logo variant="split" />` no footer
- Adicionar links de redes sociais (Discord, Twitter/X)

**Arquivo:** `app/(landing-page)/page.tsx` (seção footer)

#### 4. Remover Seções Legacy

**Seções a remover/adaptar:**

- "Stack técnica" (ainda menciona projeto financeiro)
- "Como usar" (instruções do Opensheets)
- Imagens de dashboard financeiro

### Fase 5: Páginas do Dashboard

#### 1. Dashboard Principal (`/dashboard`)

**Objetivo:** Overview das licenças do usuário

**Conteúdo:**

- Status da licença (ativa/expirada)
- Jogos disponíveis
- Últimos downloads
- Quick actions (Download, Ver jogos, Billing)

**Arquivo a criar:** `app/(dashboard)/page.tsx`

#### 2. Página de Scripts (`/scripts`)

**Objetivo:** Listar e baixar scripts disponíveis

**Features:**

- Filtro por jogo
- Filtro por arma
- Botão de download (verifica licença)
- Informações de versão
- Changelog

**Arquivo a criar:** `app/(dashboard)/scripts/page.tsx`

#### 3. Página de Jogos (`/games`)

**Objetivo:** Mostrar jogos suportados e seus scripts

**Features:**

- Grid de jogos
- Ao clicar: lista de armas/scripts disponíveis
- Status de compatibilidade
- Última atualização

**Arquivo a criar:** `app/(dashboard)/games/page.tsx`

#### 4. Página de Billing (`/billing`)

**Objetivo:** Gerenciar assinatura e pagamentos

**Features:**

- Plano atual
- Histórico de pagamentos
- Upgrade/Downgrade de plano
- Cancelar assinatura
- Integração com Stripe

**Arquivo a criar:** `app/(dashboard)/billing/page.tsx`

#### 5. Página de Downloads (`/downloads`)

**Objetivo:** Histórico de downloads

**Features:**

- Lista de scripts baixados
- Data/hora do download
- Versão baixada
- Re-download

**Arquivo a criar:** `app/(dashboard)/downloads/page.tsx`

### Fase 6: Componentes Necessários

#### 1. ScriptCard

**Arquivo:** `components/scripts/script-card.tsx`

**Props:**

```typescript
{
  id: number
  weaponName: string
  gameId: number
  version: string
  deviceType: "logitech" | "razer" | "both"
  onDownload: () => void
}
```

#### 2. GameCard

**Arquivo:** `components/games/game-card.tsx`

**Props:**

```typescript
{
  id: number;
  name: string;
  slug: string;
  icon: string;
  scriptsCount: number;
}
```

#### 3. DownloadButton

**Arquivo:** `components/scripts/download-button.tsx`

**Features:**

- Verifica licença antes de baixar
- Loading state
- Tracking de download

#### 4. SubscriptionCard

**Arquivo:** `components/billing/subscription-card.tsx`

**Props:**

```typescript
{
  tier: "basic" | "pro" | "lifetime"
  expiresAt?: Date
  active: boolean
}
```

#### 5. PricingTable

**Arquivo:** `components/pricing-table.tsx`

**Features:**

- 3 planos lado a lado
- Highlight do plano recomendado
- Botão de ação (Subscribe/Current Plan)

### Fase 7: Integrações

#### 1. Stripe Payment

**Objetivo:** Processar pagamentos e assinaturas

**Tarefas:**

- Configurar Stripe API keys no `.env`
- Criar produtos no Stripe Dashboard
- Implementar checkout flow
- Webhook para confirmação de pagamento

**Arquivos a criar:**

- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `lib/stripe/client.ts`

**Variáveis de ambiente:**

```env
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 2. Sistema de Licenças (HWID)

**Objetivo:** Validar licenças por hardware ID

**Tarefas:**

- Gerar HWID no cliente (app desktop)
- Validar HWID no servidor
- Limitar ativações por licença
- API de verificação

**Arquivos a criar:**

- `app/api/licenses/verify/route.ts`
- `app/api/licenses/activate/route.ts`
- `lib/licenses/hwid.ts`

#### 3. Sistema de Download

**Objetivo:** Controlar download de scripts

**Tarefas:**

- Verificar licença ativa
- Gerar link temporário de download
- Registrar download no banco
- Limitar downloads simultâneos

**Arquivos a criar:**

- `app/api/scripts/download/[id]/route.ts`
- `lib/scripts/download.ts`

#### 4. Email Notifications (Resend)

**Objetivo:** Enviar emails transacionais

**Emails:**

- Boas-vindas após cadastro
- Confirmação de compra
- Licença ativada
- Licença expirando
- Atualizações de scripts

**Arquivos a criar:**

- `lib/email/templates/welcome.tsx`
- `lib/email/templates/purchase-confirmation.tsx`
- `lib/email/send.ts`

**Variável de ambiente:**

```env
RESEND_API_KEY=re_...
```

### Fase 8: Verificação e Testes

#### Testes Funcionais

1. **Autenticação:**

   - Cadastro de novo usuário
   - Login/Logout
   - Recuperação de senha

2. **Compra e Licenciamento:**

   - Fluxo completo de compra (Stripe)
   - Ativação de licença com HWID
   - Verificação de licença expirada

3. **Download de Scripts:**

   - Download com licença válida
   - Bloqueio sem licença
   - Re-download de script

4. **Billing:**
   - Upgrade de plano
   - Cancelamento de assinatura
   - Histórico de pagamentos

#### Testes Visuais

1. **Landing Page:**

   - Responsividade (mobile, tablet, desktop)
   - Dark/Light mode
   - Traduções PT-BR/EN

2. **Dashboard:**
   - Navegação entre páginas
   - Loading states
   - Empty states

#### Testes de Integração

1. **Stripe:**

   - Webhook de pagamento
   - Renovação automática
   - Falha de pagamento

2. **Email:**
   - Envio de emails
   - Templates corretos
   - Links funcionando

---

## 📁 Estrutura do Projeto

```
c:\www\norecoil\
├── app/
│   ├── (landing-page)/
│   │   └── page.tsx              # Landing page principal
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Layout do dashboard
│   │   ├── page.tsx              # Dashboard home (a criar)
│   │   ├── scripts/
│   │   │   └── page.tsx          # Lista de scripts (a criar)
│   │   ├── games/
│   │   │   └── page.tsx          # Jogos suportados (a criar)
│   │   ├── billing/
│   │   │   └── page.tsx          # Gerenciar assinatura (a criar)
│   │   └── downloads/
│   │       └── page.tsx          # Histórico downloads (a criar)
│   ├── api/
│   │   ├── stripe/               # Endpoints Stripe (a criar)
│   │   ├── scripts/              # Endpoints scripts (a criar)
│   │   └── licenses/             # Endpoints licenças (a criar)
│   ├── globals.css               # Estilos globais + cores
│   └── layout.tsx                # Root layout
├── components/
│   ├── logo.tsx                  # Componente de logo ✅
│   ├── ui/                       # shadcn/ui components
│   ├── scripts/                  # Componentes de scripts (a criar)
│   ├── games/                    # Componentes de jogos (a criar)
│   ├── billing/                  # Componentes de billing (a criar)
│   └── pricing-table.tsx         # Tabela de preços (a criar)
├── lib/
│   ├── i18n/                     # Sistema de traduções ✅
│   │   ├── translations.ts
│   │   ├── get-locale.ts
│   │   ├── use-translations.ts
│   │   └── index.ts
│   ├── auth/
│   │   ├── config.ts             # Better Auth config ✅
│   │   └── server.ts
│   ├── stripe/                   # Integração Stripe (a criar)
│   ├── licenses/                 # Sistema de licenças (a criar)
│   └── email/                    # Sistema de email (a criar)
├── db/
│   └── schema.ts                 # Schema do banco ✅
├── public/
│   ├── logo-full.png             # Logo completo ✅
│   └── logo-menor.png            # Logo ícone ✅
└── package.json                  # Dependências ✅
```

---

## 💻 Como Continuar Trabalhando

### 1. Iniciar o Projeto

```bash
cd c:\www\norecoil
pnpm install
pnpm dev
```

O servidor estará em: `http://localhost:3000`

### 2. Banco de Dados

**Iniciar PostgreSQL (Docker):**

```bash
docker-compose up -d
```

**Aplicar migrations:**

```bash
pnpm db:push
```

**Visualizar banco:**

```bash
pnpm db:studio
```

### 3. Variáveis de Ambiente

**Arquivo:** `.env`

**Necessárias agora:**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/zerokick
BETTER_AUTH_SECRET=seu_secret_aqui
BETTER_AUTH_URL=http://localhost:3000
```

**Necessárias depois:**

```env
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
```

### 4. Comandos Úteis

**Desenvolvimento:**

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Build de produção
pnpm start        # Inicia servidor de produção
```

**Banco de Dados:**

```bash
pnpm db:generate  # Gera migrations
pnpm db:push      # Aplica mudanças no banco
pnpm db:studio    # Abre Drizzle Studio
```

**Docker:**

```bash
docker-compose up -d      # Inicia containers
docker-compose down       # Para containers
docker-compose logs -f    # Ver logs
```

### 5. Workflow Recomendado

#### Para Landing Page:

1. Abrir `app/(landing-page)/page.tsx`
2. Adicionar nova seção (games, pricing, etc)
3. Atualizar traduções em `lib/i18n/translations.ts`
4. Testar em PT-BR e EN
5. Verificar responsividade

#### Para Dashboard:

1. Criar página em `app/(dashboard)/[nome]/page.tsx`
2. Criar componentes necessários em `components/`
3. Criar API routes em `app/api/`
4. Testar fluxo completo

#### Para Integrações:

1. Adicionar variáveis no `.env`
2. Criar cliente/SDK em `lib/`
3. Criar API routes
4. Testar com dados reais

### 6. Recursos de Referência

**Documentação:**

- Next.js 16: https://nextjs.org/docs
- Drizzle ORM: https://orm.drizzle.team/docs
- Better Auth: https://www.better-auth.com/docs
- Stripe: https://stripe.com/docs
- shadcn/ui: https://ui.shadcn.com

**Comunidades:**

- Discord do Next.js
- Discord do Drizzle
- Stack Overflow

---

## 🎯 Prioridades

### Curto Prazo (Esta Semana)

1. ✅ Finalizar landing page (games, pricing)
2. ✅ Criar dashboard básico
3. ✅ Implementar página de scripts

### Médio Prazo (Próximas 2 Semanas)

1. Integração com Stripe
2. Sistema de licenças HWID
3. Sistema de download de scripts
4. Email notifications

### Longo Prazo (Próximo Mês)

1. App desktop para macros
2. Sistema de atualizações automáticas
3. Painel admin
4. Analytics e métricas

---

## 📝 Notas Importantes

### Segurança

- **NUNCA** commitar `.env` no Git
- Usar variáveis de ambiente para secrets
- Validar HWID no servidor, não no cliente
- Rate limiting nas APIs
- Sanitizar inputs do usuário

### Performance

- Otimizar imagens (usar Next.js Image)
- Lazy loading de componentes
- Cache de queries do banco
- CDN para assets estáticos

### SEO

- Meta tags em todas as páginas
- Sitemap.xml
- robots.txt
- Open Graph tags
- Schema.org markup

### Acessibilidade

- Usar semantic HTML
- ARIA labels
- Keyboard navigation
- Contrast ratio adequado
- Screen reader friendly

---

## 🆘 Troubleshooting

### Servidor não inicia

```bash
# Limpar cache
rm -rf .next
pnpm install
pnpm dev
```

### Erro de banco de dados

```bash
# Resetar banco
docker-compose down -v
docker-compose up -d
pnpm db:push
```

### Erro de TypeScript

```bash
# Limpar e reinstalar
rm -rf node_modules
pnpm install
```

### Erro de autenticação

- Verificar `BETTER_AUTH_SECRET` no `.env`
- Verificar `BETTER_AUTH_URL` está correto
- Limpar cookies do navegador

---

## ✅ Checklist de Continuação

### Hoje

- [ ] Adicionar seção de jogos na landing page
- [ ] Adicionar seção de pricing
- [ ] Atualizar footer com informações corretas

### Esta Semana

- [ ] Criar dashboard principal
- [ ] Criar página de scripts
- [ ] Criar componente ScriptCard
- [ ] Criar componente PricingTable

### Próxima Semana

- [ ] Configurar Stripe
- [ ] Implementar checkout flow
- [ ] Criar sistema de licenças
- [ ] Configurar emails (Resend)

---

**Última atualização:** 16/01/2026
**Versão do documento:** 1.0
**Status do projeto:** Em desenvolvimento ativo

Para dúvidas ou sugestões, consulte a documentação ou entre em contato com a equipe.
