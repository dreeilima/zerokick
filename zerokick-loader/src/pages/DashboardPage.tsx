import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  RiLogoutBoxLine,
  RiDashboardLine,
  RiSettings4Line,
  RiShieldCheckLine,
  RiAlertLine,
  RiUser3Line,
} from "@remixicon/react";
import { apiClient, type License } from "../lib/api-client";
import { useAuthStore } from "../lib/store";
import { useLicenseValidation } from "../lib/use-license-validation";
import { useGameDetection } from "../lib/use-game-detection";
import { Logo } from "../components/logo";
import { cn } from "../lib/utils";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, licenses, setLicenses, logout } = useAuthStore();
  const { isValid, isLoading: validating, hwid } = useLicenseValidation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    loadLicenses();
  }, []);

  const loadLicenses = async () => {
    try {
      const response = await apiClient.getMyLicenses();
      setLicenses(response.licenses);
    } catch (err: any) {
      console.error("Failed to load licenses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    apiClient.logout();
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded bg-primary/20 animate-pulse" />
          <p className="text-muted-foreground animate-pulse">Carregando...</p>
        </div>
      </div>
    );
  }

  // Helper to resolve image path
  const getGameImage = (license: License) => {
    const slug = license.gameSlug || "cs2";
    return `/games/${slug}.png`;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-zinc-950/50 backdrop-blur-xl flex flex-col hidden md:flex z-50">
        <div className="p-6">
          <Logo variant="full" className="w-32" />
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem
            icon={RiDashboardLine}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <SidebarItem
            icon={RiUser3Line}
            label="Minha Conta"
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          />
          <SidebarItem
            icon={RiSettings4Line}
            label="Configurações"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>

        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-black font-bold text-xs ring-2 ring-white/10">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate opacity-70">
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2 h-9 text-xs uppercase tracking-wider font-semibold"
            onClick={handleLogout}
          >
            <RiLogoutBoxLine className="h-3.5 w-3.5" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-background">
        {/* Background Decoration */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div className="max-w-6xl mx-auto p-8 space-y-10 relative z-10">
          {activeTab === "dashboard" && (
            <DashboardView
              user={user}
              licenses={licenses}
              isValid={isValid}
              validating={validating}
              getGameImage={getGameImage}
            />
          )}
          {activeTab === "account" && <AccountView user={user} />}
          {activeTab === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

// ==================== SUB-VIEWS ====================

function DashboardView({
  user,
  licenses,
  isValid,
  validating,
  getGameImage,
}: any) {
  const { games } = useGameDetection();

  const isGameRunning = (slug: string) => {
    return games.find((g) => g.slug === slug)?.running || false;
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Status */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-950 px-6 py-8 md:px-8 mb-8">
        {/* Grid Background */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('/bg-grid-white.svg')",
            backgroundSize: "30px 30px",
            maskImage:
              "linear-gradient(to bottom, transparent, black, transparent)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              {(() => {
                const hour = new Date().getHours();
                if (hour < 12) return "Bom dia";
                if (hour < 18) return "Boa tarde";
                return "Boa noite";
              })()}
              , {user?.name?.split(" ")[0]}!{" "}
              <span className="animate-wave inline-block origin-[70%_70%]">
                👋
              </span>
            </h1>
            <p className="text-zinc-400 capitalize">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* HWID Status Card Compact */}
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg border backdrop-blur-md transition-all",
              isValid
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
            )}
          >
            {isValid ? (
              <RiShieldCheckLine className="h-5 w-5" />
            ) : (
              <RiAlertLine className="h-5 w-5 animate-pulse" />
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                Status HWID
              </span>
              <span className="text-sm font-bold">
                {isValid ? "Seguro & Verificado" : "Verificando..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            Seus Produtos
            <Badge
              variant="secondary"
              className="ml-2 bg-white/10 hover:bg-white/20 text-white border-0"
            >
              {licenses.length}
            </Badge>
          </h2>
        </div>

        {licenses.length === 0 ? (
          <Card className="border-dashed py-16 bg-white/[0.01] border-white/10">
            <CardContent className="flex flex-col items-center justify-center text-center space-y-6">
              <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-2 animate-float">
                <RiDashboardLine className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-white">
                  Nenhuma licença ativa
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Sua conta não possui licenças ativas. Adquira acesso em nossa
                  loja para começar.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-primary text-black hover:bg-primary/90 font-bold"
                onClick={() => window.open("http://localhost:3000", "_blank")}
              >
                Ir para Loja
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {licenses.map((license: any) => (
              <LicenseCard
                key={license.id}
                license={license}
                imageUrl={getGameImage(license)}
                isRunning={isGameRunning(license.gameSlug || "cs2")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AccountView({ user }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Minha Conta
        </h1>
        <p className="text-muted-foreground mt-2">
          Visualize os detalhes da sua conta ZeroKick.
        </p>
      </div>

      <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-black font-bold text-4xl ring-4 ring-white/5 shadow-2xl">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="space-y-6 flex-1 w-full">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Nome de Usuário
                  </label>
                  <div className="p-3 rounded-md bg-white/5 border border-white/5 text-white font-medium">
                    {user?.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <div className="p-3 rounded-md bg-white/5 border border-white/5 text-white font-medium">
                    {user?.email}
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    ID do Usuário
                  </label>
                  <div
                    className="p-3 rounded-md bg-white/5 border border-white/5 text-muted-foreground font-mono text-sm flex items-center justify-between group cursor-copy hover:border-white/10 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(user?.id || "");
                    }}
                  >
                    {user?.id}
                    <Badge
                      variant="secondary"
                      className="bg-transparent border-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Copiar
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button
                  onClick={() =>
                    window.open(
                      "http://localhost:3000/dashboard/settings",
                      "_blank",
                    )
                  }
                  variant="outline"
                  className="border-white/10 hover:bg-white/5"
                >
                  Gerenciar no Site
                </Button>
                <Button
                  onClick={() =>
                    window.open(
                      "http://localhost:3000/dashboard/billing",
                      "_blank",
                    )
                  }
                  className="bg-primary text-black hover:bg-primary/90"
                >
                  Gerenciar Assinatura
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Configurações
        </h1>
        <p className="text-muted-foreground mt-2">
          Preferências do Loader e do Sistema.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Geral</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                <div>
                  <p className="text-sm font-medium text-white">
                    Inicialização Automática
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Iniciar o ZeroKick com o Windows
                  </p>
                </div>
                <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer opacity-50">
                  <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                <div>
                  <p className="text-sm font-medium text-white">
                    Modo Streamer
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ocultar overlays em capturas de tela
                  </p>
                </div>
                <div className="h-6 w-11 bg-zinc-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sobre</h3>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Versão do Loader
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  v1.0.0-beta
                </p>
              </div>
              <Button size="sm" variant="secondary" className="h-8 text-xs">
                Verificar Atualizações
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function LicenseCard({
  license,
  imageUrl,
  isRunning,
}: {
  license: License;
  imageUrl: string;
  isRunning?: boolean;
}) {
  const isActive =
    license.active &&
    (!license.expiresAt || new Date(license.expiresAt) > new Date());

  return (
    <div className="group relative h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={imageUrl}
          alt={license.gameName}
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.4]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.classList.add("bg-zinc-800");
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
        <div
          className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10 shadow-lg",
            isActive
              ? "bg-green-500/20 text-green-400 border-green-500/20"
              : "bg-red-500/20 text-red-400",
          )}
        >
          {isActive ? "Ativo" : "Expirado"}
        </div>
        {isRunning && (
          <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-cyan-500/20 bg-cyan-500/20 text-cyan-400 shadow-lg animate-pulse">
            Detectado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-3xl font-black text-white italic tracking-tighter mb-1 drop-shadow-lg">
            {license.gameName}
          </h3>
          <p className="text-sm text-primary font-bold uppercase tracking-wider mb-6 opacity-90">
            {license.subscriptionTier
              .replace(/_/g, " ")
              .replace("logitech", "")
              .trim()}{" "}
            Edition
          </p>

          <div className="space-y-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform scale-95 group-hover:scale-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Dispositivo</span>
              <span className="text-white font-medium capitalize">
                {license.deviceType}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Expira em</span>
              <span className="text-white font-medium">
                {license.expiresAt
                  ? new Date(license.expiresAt).toLocaleDateString("pt-BR")
                  : "Vitalício"}
              </span>
            </div>
          </div>

          <Button
            className={cn(
              "w-full gap-2 font-bold transition-all duration-300",
              isRunning
                ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_-5px_rgba(6,182,212,0.6)] animate-pulse"
                : isActive
                  ? "bg-primary text-black hover:bg-white shadow-[0_0_20px_-5px_rgba(var(--color-primary),0.4)]"
                  : "bg-white/10 hover:bg-white/20 text-white",
            )}
            size="lg"
            disabled={!isActive}
          >
            {isRunning ? "INJECT" : isActive ? "LAUNCH" : "RENEW LICENSE"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
        active
          ? "text-white"
          : "text-zinc-400 hover:text-white hover:bg-white/5",
      )}
    >
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full" />
      )}
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
      )}
      <Icon
        className={cn(
          "h-5 w-5 transition-colors",
          active ? "text-primary" : "group-hover:text-white",
        )}
      />
      <span className="relative">{label}</span>
    </button>
  );
}
