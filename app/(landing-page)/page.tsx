import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";
import { GameCard } from "@/components/games/game-card";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PricingCard } from "@/components/pricing/pricing-card";
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
  RiCheckLine,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiDeviceLine,
  RiGithubFill,
  RiLineChartLine,
  RiLockLine,
  RiMoneyDollarCircleLine,
  RiPieChartLine,
  RiShieldCheckLine,
  RiStarFill,
  RiTimeLine,
  RiWalletLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <LanguageSwitcher />
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

      {/* Product Showcase Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                {t.showcase.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t.showcase.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.showcase.description}
              </p>
            </div>

            <div className="space-y-12">
              {/* Dashboard Preview */}
              <div className="relative rounded-xl overflow-hidden border shadow-2xl">
                <Image
                  src="/dashboard-preview.png"
                  alt="ZeroKick Dashboard"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Features Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {t.showcase.features.map((feature, index) => (
                  <Card key={index} className="border">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <RiCheckLine size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Macro Config Preview */}
              <div className="relative rounded-xl overflow-hidden border shadow-2xl">
                <Image
                  src="/macro-config.png"
                  alt="Macro Configuration"
                  width={1920}
                  height={1080}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Games Section */}
      <section id="games" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                {t.games.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t.games.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.games.description}
              </p>
            </div>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <GameCard name="CS2" slug="cs2" icon="/games/cs2.png" />
              <GameCard
                name="Valorant"
                slug="valorant"
                icon="/games/valorant.png"
              />
              <GameCard
                name="Apex Legends"
                slug="apex"
                icon="/games/apex.png"
              />
              <GameCard
                name="Rainbow Six Siege"
                slug="r6s"
                icon="/games/r6s.png"
              />
              <GameCard name="Rust" slug="rust" icon="/games/rust.png" />
              <GameCard name="PUBG" slug="pubg" icon="/games/pubg.png" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA After Games */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t.cta.afterGames.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.cta.afterGames.description}
            </p>
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                {t.cta.afterGames.button}
                <RiArrowRightSLine size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                {t.testimonials.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t.testimonials.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.testimonials.description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {t.testimonials.reviews.map((review, index) => (
                <Card key={index} className="border h-full">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <RiStarFill
                          key={star}
                          size={16}
                          className="text-yellow-500"
                        />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground mb-6 flex-1">
                      "{review.content}"
                    </p>

                    <div className="flex items-center gap-3 mt-auto border-t pt-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{review.name}</p>
                        <p className="text-xs text-primary font-medium">
                          {review.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                {t.pricing.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t.pricing.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.pricing.description}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mt-12">
              {/* Basic Plan */}
              <PricingCard
                name={t.pricing.basic.name}
                price={t.pricing.basic.price}
                description={t.pricing.basic.description}
                features={t.pricing.basic.features}
                cta={t.pricing.cta}
                priceLabel={t.pricing.lifetimeLabel}
              />

              {/* Pro Plan */}
              <PricingCard
                name={t.pricing.pro.name}
                price={t.pricing.pro.price}
                description={t.pricing.pro.description}
                features={t.pricing.pro.features}
                cta={t.pricing.cta}
                popular={true}
                priceLabel={t.pricing.monthlyLabel}
              />

              {/* Lifetime Plan */}
              <PricingCard
                name={t.pricing.lifetime.name}
                price={t.pricing.lifetime.price}
                description={t.pricing.lifetime.description}
                features={t.pricing.lifetime.features}
                cta={t.pricing.cta}
                priceLabel={t.pricing.lifetimeLabel}
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                {t.howItWorks.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t.howItWorks.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.howItWorks.description}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {t.howItWorks.step1.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.howItWorks.step1.description}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {t.howItWorks.step2.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.howItWorks.step2.description}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {t.howItWorks.step3.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.howItWorks.step3.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                {t.faq.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t.faq.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.faq.description}
              </p>
            </div>

            <div className="space-y-4">
              {t.faq.questions.map((item, index) => (
                <Card key={index} className="border">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-8 md:p-12">
              <div className="relative z-10 text-center">
                <Badge variant="secondary" className="mb-4">
                  {t.cta.final.badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {t.cta.final.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {t.cta.final.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                      {t.cta.final.button}
                      <RiArrowRightSLine size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
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
                <Logo variant="split" />
                <p className="text-sm text-muted-foreground mt-4">
                  {t.footer.description}
                </p>
              </div>

              <div className="md:col-span-2 flex justify-end gap-12">
                <div>
                  <h3 className="font-semibold mb-4">Produto</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>
                      <Link
                        href="#features"
                        className="hover:text-foreground transition-colors"
                      >
                        Funcionalidades
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#pricing"
                        className="hover:text-foreground transition-colors"
                      >
                        Planos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#faq"
                        className="hover:text-foreground transition-colors"
                      >
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Suporte</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>
                      <Link
                        href="#"
                        className="hover:text-foreground transition-colors"
                      >
                        Documentação
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-foreground transition-colors"
                      >
                        Termos de Uso
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="hover:text-foreground transition-colors"
                      >
                        Privacidade
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} ZeroKick. {t.footer.copyright}
              </p>
              <div className="flex items-center gap-2">
                <RiShieldCheckLine size={16} className="text-primary" />
                <span>{t.footer.trustBadge}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
