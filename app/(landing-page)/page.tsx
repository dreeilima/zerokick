import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getOptionalUserSession } from "@/lib/auth/server";
import { getLocale, useTranslations } from "@/lib/i18n";
import {
  RiArrowRightSLine,
  RiBankCardLine,
  RiBarChartBoxLine,
  RiCalendarLine,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiDeviceLine,
  RiGithubFill,
  RiLineChartLine,
  RiLockLine,
  RiMoneyDollarCircleLine,
  RiPieChartLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiWalletLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const session = await getOptionalUserSession();
  const locale = await getLocale();
  const t = useTranslations(locale);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="#funcionalidades"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.features}
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.pricing}
            </a>
          </nav>

          <nav className="flex items-center gap-2 md:gap-4">
            <AnimatedThemeToggler />
            {session?.user ? (
              <Link prefetch href="/dashboard">
                <Button variant="outline" size="sm">
                  {t.nav.dashboard}
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="gap-2">
                    {t.nav.signup}
                    <RiArrowRightSLine size={16} />
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center gap-6">
            <Badge variant="primary" className="mb-2">
              <RiShieldCheckLine size={14} className="mr-1" />
              {t.hero.badge}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {t.hero.title}
              <span className="text-primary">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              {t.hero.description}
            </p>

            <div className="rounded-lg border bg-muted/30 p-4 max-w-2xl">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {t.hero.safetyTitle}
                </span>{" "}
                {t.hero.safetyDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  {t.hero.ctaPrimary}
                  <RiArrowRightSLine size={18} />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2"
                >
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <RiShieldCheckLine size={18} className="text-primary" />
                {t.hero.trustBadge1}
              </div>
              <div className="flex items-center gap-2">
                <RiDeviceLine size={18} className="text-primary" />
                {t.hero.trustBadge2}
              </div>
              <div className="flex items-center gap-2">
                <RiTimeLine size={18} className="text-primary" />
                {t.hero.trustBadge3}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-8 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <Image
              src="/dashboard-preview.png"
              alt="opensheets Dashboard Preview"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* What's Here Section */}
      <section id="funcionalidades" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Everything you need to dominate
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional-grade macros with features that matter for
                competitive gaming
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiDeviceLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Multi-Game Support
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        CS2, Valorant, Apex Legends, PUBG, Rust, Rainbow Six
                        Siege, and more. All your favorite FPS games in one
                        place.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiTimeLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Instant Updates
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Scripts automatically updated with every game patch. No
                        waiting, no manual updates. Always ready to play.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiShieldCheckLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Safe & Undetectable
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Runs through official Logitech G Hub and Razer Synapse.
                        100% undetectable by anti-cheat systems.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiCodeSSlashLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Easy Installation
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        One-click download and setup. Simple configuration with
                        step-by-step tutorials. Start playing in minutes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiLockLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Lifetime Access
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        One-time purchase, forever yours. No recurring fees, no
                        subscriptions. Pay once, use forever.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <RiBarChartBoxLine size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Premium Support
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Active Discord community and ticket system. Get help
                        when you need it from experienced users.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                Stack técnica
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Construído com tecnologias modernas
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Open source, self-hosted e fácil de customizar
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <RiCodeSSlashLine
                      size={32}
                      className="text-primary shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Next.js 16, TypeScript, Tailwind CSS, shadcn/ui
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Interface moderna e responsiva com React 19 e App Router
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <RiDatabase2Line
                      size={32}
                      className="text-primary shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Backend</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        PostgreSQL 18, Drizzle ORM, Better Auth
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Banco relacional robusto com type-safe ORM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <RiShieldCheckLine
                      size={32}
                      className="text-primary shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Segurança</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Better Auth com OAuth (Google) e autenticação por email
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Sessões seguras e proteção de rotas por middleware
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <RiDeviceLine size={32} className="text-primary shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Deploy</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Docker com multi-stage build, health checks e volumes
                        persistentes
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Fácil de rodar localmente ou em qualquer servidor
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Seus dados ficam no seu controle. Pode rodar localmente ou no
                seu próprio servidor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to run Section */}
      <section id="como-usar" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                Como usar
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Rode no seu computador
              </h2>
              <p className="text-lg text-muted-foreground">
                Não há versão hospedada online. Você precisa rodar localmente.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Clone o repositório
                      </h3>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        git clone
                        https://github.com/felipegcoutinho/opensheets-app.git
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Configure as variáveis de ambiente
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Copie o{" "}
                        <code className="bg-muted px-1 rounded">
                          .env.example
                        </code>{" "}
                        para <code className="bg-muted px-1 rounded">.env</code>{" "}
                        e configure o banco de dados
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Suba o banco via Docker
                      </h3>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        docker compose up db -d
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Rode a aplicação localmente
                      </h3>
                      <div className="space-y-2">
                        <code className="block text-sm bg-muted px-2 py-1 rounded">
                          pnpm install
                        </code>
                        <code className="block text-sm bg-muted px-2 py-1 rounded">
                          pnpm db:push
                        </code>
                        <code className="block text-sm bg-muted px-2 py-1 rounded">
                          pnpm dev
                        </code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="https://github.com/felipegcoutinho/opensheets-app#-início-rápido"
                target="_blank"
                className="text-sm text-primary hover:underline"
              >
                Ver documentação completa →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Para quem funciona?
              </h2>
              <p className="text-lg text-muted-foreground">
                O opensheets funciona melhor se você:
              </p>
            </div>

            <div className="space-y-4">
              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <RiTimeLine size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Tem disciplina de registrar gastos
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Não se importa em dedicar alguns minutos por dia ou
                        semana para manter tudo atualizado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <RiLockLine size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Quer controle total sobre seus dados
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Prefere hospedar seus próprios dados ao invés de
                        depender de serviços terceiros
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <RiLineChartLine size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Gosta de entender exatamente onde o dinheiro vai
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Quer visualizar padrões de gastos e tomar decisões
                        informadas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 rounded-lg border bg-background p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Se você não se encaixa nisso, provavelmente vai abandonar depois
                de uma semana. E tudo bem! Existem outras ferramentas com
                sincronização automática que podem funcionar melhor pra você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Pronto para testar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Clone o repositório, rode localmente e veja se faz sentido pra
              você. É open source e gratuito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/felipegcoutinho/opensheets-app"
                target="_blank"
              >
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <RiGithubFill size={18} />
                  Baixar Projeto
                </Button>
              </Link>
              <Link
                href="https://github.com/felipegcoutinho/opensheets-app#-início-rápido"
                target="_blank"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto gap-2"
                >
                  Como Instalar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <Logo />
                <p className="text-sm text-muted-foreground mt-4">
                  Projeto pessoal de gestão financeira. Open source e
                  self-hosted.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Projeto</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="https://github.com/felipegcoutinho/opensheets-app"
                      target="_blank"
                      className="hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      <RiGithubFill size={16} />
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/felipegcoutinho/opensheets-app#readme"
                      target="_blank"
                      className="hover:text-foreground transition-colors"
                    >
                      Documentação
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/felipegcoutinho/opensheets-app/issues"
                      target="_blank"
                      className="hover:text-foreground transition-colors"
                    >
                      Reportar Bug
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Stack</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Next.js 16 + TypeScript</li>
                  <li>PostgreSQL 18 + Drizzle ORM</li>
                  <li>Better Auth + shadcn/ui</li>
                  <li>Docker + Docker Compose</li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} opensheets. Projeto open source sob
                licença MIT.
              </p>
              <div className="flex items-center gap-2">
                <RiShieldCheckLine size={16} className="text-primary" />
                <span>Seus dados, seu servidor</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
