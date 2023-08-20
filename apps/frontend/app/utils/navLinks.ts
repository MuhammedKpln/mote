import { RouterPaths } from "@/lib/router_paths";
import { IMenuRoot } from "@/models/nav_link.model";
import { FiHome, FiUsers } from "react-icons/fi";

export const navLinks: IMenuRoot = {
  menus: [
    {
      label: "Activity",
      menus: [
        {
          label: "Dashboard",
          icon: FiHome,
          href: RouterPaths.Dashboard,
        },

        {
          label: "Notes",
          icon: FiUsers,
          href: RouterPaths.Notes,
        },
      ],
    },
  ],
};
