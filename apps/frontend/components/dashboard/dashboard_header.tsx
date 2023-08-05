"use client";

import { navLinks } from "@/app/utils/navLinks";
import { IMenu } from "@/models/nav_link.model";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { DashboardHeaderSearch } from "./dashboard_header_search";
import { DashboardHeaderUser } from "./dashboard_header_user";

export function DashboardHeader() {
  const pathName = usePathname();

  const headerTitleInfo = useMemo<IMenu | undefined>(() => {
    for (const menu of navLinks.menus) {
      const find = menu.menus.filter((e) => e.href == pathName);

      if (find.length > 0) {
        return find[0];
      }

      return undefined;
    }
  }, [pathName]);

  return (
    <header className="flex justify-between p-5">
      <div id="headerInfo">
        {headerTitleInfo ? (
          <div className="flex w-full align-center leading-none p-2 rounded-lg text-lg font-semibold">
            <headerTitleInfo.icon />

            <span className="ml-2">{headerTitleInfo.label}</span>
          </div>
        ) : null}
      </div>

      <div id="user-actions" className="flex w-20 justify-around my-auto">
        <DashboardHeaderSearch />

        <DashboardHeaderUser />
      </div>
    </header>
  );
}
