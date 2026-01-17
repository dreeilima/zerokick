"use client";

import {
  Collapsible, 
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  RiArrowRightSLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

type NavItem = {
  title: string;
  url: string;
  icon: RemixiconComponentType;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    avatarUrl?: string | null;
    isShared?: boolean;
    key?: string;
  }[];
};

type NavSection = {
  title: string;
  items: NavItem[];
};

export function NavMain({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();

  const isLinkActive = React.useCallback(
    (url: string) => {
      const normalizedPathname =
        pathname.endsWith("/") && pathname !== "/"
          ? pathname.slice(0, -1)
          : pathname;
      const normalizedUrl =
        url.endsWith("/") && url !== "/" ? url.slice(0, -1) : url;

      return (
        normalizedPathname === normalizedUrl ||
        normalizedPathname.startsWith(normalizedUrl + "/")
      );
    },
    [pathname]
  );

  const activeLinkClasses =
    "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground";

  return (
    <>
      {sections.map((section) => (
        <SidebarGroup key={section.title}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => {
                const itemIsActive = isLinkActive(item.url);
                return (
                  <Collapsible key={item.title} asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={itemIsActive}
                        className={itemIsActive ? activeLinkClasses : ""}
                      >
                        <Link prefetch href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.items?.length ? (
                        <>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                              <RiArrowRightSLine />
                              <span className="sr-only">Toggle</span>
                            </SidebarMenuAction>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => {
                                const subItemIsActive = isLinkActive(
                                  subItem.url
                                );
                                return (
                                  <SidebarMenuSubItem
                                    key={subItem.key ?? subItem.title}
                                  >
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={subItemIsActive}
                                      className={
                                        subItemIsActive ? activeLinkClasses : ""
                                      }
                                    >
                                      <Link
                                        prefetch
                                        href={subItem.url}
                                      >
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </>
                      ) : null}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
