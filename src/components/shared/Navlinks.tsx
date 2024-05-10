"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "@/components/shared/Icons";
import { Separator } from "@/components/ui/separator";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

const dashLinks = [{ name: "Houses", href: "/houses", icon: Icons.house }];

type PropsType = {
  isNavbarOpen: boolean;
};

type LinkType = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export default function Navlinks({ isNavbarOpen }: PropsType) {
  const pathname = usePathname();

  function generateNavLinks(links: LinkType[]) {
    return links.map((link) => {
      const LinkIcon = link.icon;
      return (
        <NavigationMenuItem key={link.name}>
          <Link href={link.href} legacyBehavior passHref>
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} flex justify-center md:justify-between gap-4 !w-full`}
              active={pathname === link.href}
            >
              <LinkIcon className="w-6" />
              <p
                className={clsx(
                  { "md:hidden": !isNavbarOpen },
                  { block: isNavbarOpen }
                )}
              >
                {link.name}
              </p>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      );
    });
  }

  return (
    <NavigationMenu>
      <>
        <NavigationMenuList>{generateNavLinks(dashLinks)}</NavigationMenuList>
      </>
    </NavigationMenu>
  );
}
