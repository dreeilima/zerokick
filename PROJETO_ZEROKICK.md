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
- [x] Logo criado (Conceito 3 - mira com "ZEROKICK")
- [x] Plano de implementação completo

### Fase 2: Limpeza do Projeto ✅

- [x] Removidos componentes financeiros (Opensheets)
- [x] Limpeza de dependências e banco de dados

### Fase 3: Landing Page ✅

- [x] **i18n:** Sistema de tradução (PT-BR/EN) implementado.
- [x] **Design:** Paleta de cores Gaming (Cyan/Purple/Dark).
- [x] **Seções:** Hero, Features, Footer atualizados.
- [x] **Placeholder de Jogos:** Adicionados SVGs temporários para jogos.

### Fase 4: Database Schema ✅

- [x] Tabelas criadas: `games`, `products` (antigo scripts), `productVariants` (planos), `licenses`, `downloads`.
- [x] Campo `role` adicionado à tabela `user` para controle de Admin.
- [x] Seed inicial de dados (`db/seed.ts`).

### Fase 5: Dashboard & Loja ✅

- [x] **Dashboard:** Visão geral do usuário.
- [x] **Loja Integrada (`/dashboard/shop`):**
  - Listagem de jogos e produtos.
  - Filtros por jogo (CS2, Valorant, etc.).
  - Página de detalhes do produto.
- [x] **Carrinho (`CartSheet`):**
  - Drawer lateral para gestão de itens.
  - Adicionar/Remover itens.
  - Cálculo de total.

### Fase 5.5: Painel Administrativo ✅

- [x] **Acesso:** Protegido por Role (`admin`).
- [x] **Gestão de Produtos:** Criar, Editar, Deletar produtos.
- [x] **Gestão de Variantes:** Criar planos (Semanal, Mensal, Vitalício) para cada produto.
- [x] **Dashboard Admin:** Visão geral de vendas e usuários.

---

## 🚀 Próximos Passos (Fase Atual)

### Fase 6: Integração com Stripe (EM ANDAMENTO) 🔄

**Objetivo:** Processar pagamentos reais e liberar licenças automaticamente.

1. **Configuração:**
   - [ ] Instalar `stripe`.
   - [ ] Configurar variáveis de ambiente (`STRIPE_SECRET_KEY`, etc.).
2. **Checkout Híbrido:**
   - [ ] Criar API `/api/checkout`.
   - [ ] Suporte a **Assinaturas** (Recorrentes) e **Pagamentos Únicos** (Vitalício) no mesmo carrinho.
3. **Webhooks:**
   - [ ] Criar handler para `checkout.session.completed`.
   - [ ] Liberar licença no banco de dados após sucesso.
   - [ ] Gerenciar renovação e cancelamento (`invoice.succeeded`, `subscription.deleted`).

### Fase 7: Sistema de Injeção (Loader) ⏳

**Objetivo:** Entregar o produto final (software desktop).

- [ ] Implementar comunicação Client <-> Server.
- [ ] Validar HWID no download/login do loader.
- [ ] Ofuscação e segurança básica.

---

## 📁 Estrutura do Projeto (Atualizada)

```
c:\www\zerokick\
├── app/
│   ├── (landing-page)/       # Landing page pública
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   ├── admin/        # Painel Administrativo (Protegido)
│   │   │   ├── shop/         # Loja de Macros
│   │   │   ├── cart/         # (Legado/Backend)
│   │   │   └── ...
│   ├── api/
│   │   ├── cart/             # API do Carrinho
│   │   ├── checkout/         # API do Stripe (A fazer)
│   │   └── webhooks/         # Webhooks Stripe (A fazer)
├── components/
│   ├── shop/                 # Componentes da Loja (CartSheet, ProductCard)
│   ├── admin/                # Componentes Admin
│   ├── sidebar/              # Navegação
├── db/
│   └── schema.ts             # Schema do Drizzle
├── lib/
│   ├── auth/                 # Autenticação
│   ├── stripe.ts             # Cliente Stripe (A fazer)
└── ...
```

---

## 💻 Como Continuar Trabalhando

### Comandos Úteis

```bash
# Iniciar Dev Server
pnpm dev

# Atualizar Banco de Dados (Schema)
pnpm db:push

# Prisma Studio (Visualizar dados)
pnpm db:studio
```

---

**Última atualização:** 17/01/2026
**Status:** Fase 6 (Stripe) Iniciada.
