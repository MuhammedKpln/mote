"use client";

import { navLinks } from "@/app/utils/navLinks";
import { IMenu } from "@/models/nav_link.model";
import userPic from "@/public/user.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { DropdownItem } from "../dropdown/dropdown_item";
import { DropdownMenu } from "../dropdown/dropdown_menu";

export function DashboardHeader() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

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
        <FiSearch />
        <div
          id="user"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Image
            alt="user"
            width={20}
            height={20}
            src={userPic}
            className="rounded-full cursor-pointer"
          />
        </div>

        <DropdownMenu isOpen={open} onExitHover={() => setOpen(false)}>
          <DropdownItem>
            <a> selam </a>
          </DropdownItem>
        </DropdownMenu>
      </div>
    </header>
  );
}
