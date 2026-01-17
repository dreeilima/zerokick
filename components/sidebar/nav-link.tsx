import {
  RiDashboardLine,
  RiDownloadCloudLine,
  RiBookOpenLine,
  RiBankCardLine,
  RiSettingsLine,
  type RemixiconComponentType,
  RiShoppingCart2Line,
} from "@remixicon/react";

export type SidebarSubItem = {
  title: string;
  url: string;
  avatarUrl?: string | null;
  isShared?: boolean;
  key?: string;
};

export type SidebarItem = {
  title: string;
  url: string;
  icon: RemixiconComponentType;
  isActive?: boolean;
  items?: SidebarSubItem[];
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export type SidebarNavData = {
  navMain: SidebarSection[];
  navSecondary: {
    title: string;
    url: string;
    icon: RemixiconComponentType;
  }[];
};

export function createSidebarNavData(role?: string): SidebarNavData {
  const navMain = [
    {
      title: "Plataforma",
      items: [
        {
          title: "Visão Geral",
          url: "/dashboard",
          icon: RiDashboardLine,
        },
        {
          title: "Loja",
          url: "/dashboard/shop",
          icon: RiShoppingCart2Line,
        },
        {
          title: "Downloads",
          url: "/dashboard/downloads",
          icon: RiDownloadCloudLine,
        },
        {
          title: "Tutoriais",
          url: "/dashboard/tutorials",
          icon: RiBookOpenLine,
        },
      ],
    },
    {
      title: "Conta",
      items: [
        {
          title: "Assinatura",
          url: "/dashboard/billing",
          icon: RiBankCardLine,
        },
      ],
    },
  ];

  // Admin Section
  if (role === "admin") {
    navMain.push({
      title: "Admin",
      items: [
        {
          title: "Painel Admin",
          url: "/dashboard/admin",
          icon: RiDashboardLine,
        },
        {
          title: "Produtos",
          url: "/dashboard/admin/products",
          icon: RiShoppingCart2Line,
        },
        {
          title: "Licenças",
          url: "/dashboard/admin/licenses",
          icon: RiBankCardLine,
        },
      ],
    });
  }

  return {
    navMain,
    navSecondary: [
      {
        title: "Configurações",
        url: "/dashboard/settings",
        icon: RiSettingsLine,
      },
    ],
  };
}
