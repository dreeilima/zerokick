// lib/i18n/translations.ts
export const translations = {
  "pt-BR": {
    // Hero Section
    hero: {
      badge: "Seguro & Indetectável",
      title: "Zero Recuo,",
      titleHighlight: " Precisão Máxima",
      description:
        "Macros profissionais de no-recoil para jogos FPS competitivos. Funciona com dispositivos Logitech e Razer. Seguro, indetectável e atualizado a cada patch do jogo.",
      safetyTitle: "✅ 100% Seguro:",
      safetyDescription:
        "Nossos macros rodam através do software oficial Logitech G Hub e Razer Synapse - completamente indetectável por sistemas anti-cheat.",
      ctaPrimary: "Começar Teste Grátis",
      ctaSecondary: "Ver Preços",
      trustBadge1: "100% Indetectável",
      trustBadge2: "Logitech & Razer",
      trustBadge3: "Atualizações Instantâneas",
    },

    // Features Section
    features: {
      badge: "Recursos",
      title: "Tudo que você precisa para dominar",
      description:
        "Macros de nível profissional com recursos que importam para jogos competitivos",
      multiGame: {
        title: "Suporte Multi-Jogos",
        description:
          "CS2, Valorant, Apex Legends, PUBG, Rust, Rainbow Six Siege e mais. Todos os seus jogos FPS favoritos em um só lugar.",
      },
      instantUpdates: {
        title: "Atualizações Instantâneas",
        description:
          "Scripts atualizados automaticamente a cada patch do jogo. Sem espera, sem atualizações manuais. Sempre pronto para jogar.",
      },
      safeUndetectable: {
        title: "Seguro & Indetectável",
        description:
          "Roda através do Logitech G Hub e Razer Synapse oficiais. 100% indetectável por sistemas anti-cheat.",
      },
      easyInstall: {
        title: "Instalação Fácil",
        description:
          "Download e configuração com um clique. Configuração simples com tutoriais passo a passo. Comece a jogar em minutos.",
      },
      lifetimeAccess: {
        title: "Acesso Vitalício",
        description:
          "Compra única, seu para sempre. Sem taxas recorrentes, sem assinaturas. Pague uma vez, use para sempre.",
      },
      premiumSupport: {
        title: "Suporte Premium",
        description:
          "Comunidade ativa no Discord e sistema de tickets. Obtenha ajuda quando precisar de usuários experientes.",
      },
    },

    // Navigation
    nav: {
      features: "Recursos",
      pricing: "Preços",
      login: "Entrar",
      signup: "Começar",
      dashboard: "Dashboard",
    },
  },

  en: {
    // Hero Section
    hero: {
      badge: "Safe & Undetectable",
      title: "Zero Recoil,",
      titleHighlight: " Maximum Precision",
      description:
        "Professional no-recoil macros for competitive FPS games. Works with Logitech and Razer devices. Safe, undetectable, and updated with every game patch.",
      safetyTitle: "✅ 100% Safe:",
      safetyDescription:
        "Our macros run through official Logitech G Hub and Razer Synapse software - completely undetectable by anti-cheat systems.",
      ctaPrimary: "Start Free Trial",
      ctaSecondary: "View Pricing",
      trustBadge1: "100% Undetectable",
      trustBadge2: "Logitech & Razer",
      trustBadge3: "Instant Updates",
    },

    // Features Section
    features: {
      badge: "Features",
      title: "Everything you need to dominate",
      description:
        "Professional-grade macros with features that matter for competitive gaming",
      multiGame: {
        title: "Multi-Game Support",
        description:
          "CS2, Valorant, Apex Legends, PUBG, Rust, Rainbow Six Siege, and more. All your favorite FPS games in one place.",
      },
      instantUpdates: {
        title: "Instant Updates",
        description:
          "Scripts automatically updated with every game patch. No waiting, no manual updates. Always ready to play.",
      },
      safeUndetectable: {
        title: "Safe & Undetectable",
        description:
          "Runs through official Logitech G Hub and Razer Synapse. 100% undetectable by anti-cheat systems.",
      },
      easyInstall: {
        title: "Easy Installation",
        description:
          "One-click download and setup. Simple configuration with step-by-step tutorials. Start playing in minutes.",
      },
      lifetimeAccess: {
        title: "Lifetime Access",
        description:
          "One-time purchase, forever yours. No recurring fees, no subscriptions. Pay once, use forever.",
      },
      premiumSupport: {
        title: "Premium Support",
        description:
          "Active Discord community and ticket system. Get help when you need it from experienced users.",
      },
    },

    // Navigation
    nav: {
      features: "Features",
      pricing: "Pricing",
      login: "Login",
      signup: "Get Started",
      dashboard: "Dashboard",
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = (typeof translations)["en"];
