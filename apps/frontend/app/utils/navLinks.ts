import { RouterPaths } from "@/lib/router_paths";
import { IMenuRoot } from "@/models/nav_link.model";
import {
  FiArchive,
  FiHome,
  FiPhoneIncoming,
  FiServer,
  FiUsers,
} from "react-icons/fi";

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
          label: "Orders",
          icon: FiArchive,
          href: "/dashboard/orders",
        },
        {
          label: "Notes",
          icon: FiUsers,
          href: RouterPaths.Notes,
        },
        {
          label: "Files",
          icon: FiServer,
          href: "/dashboard",
        },
        {
          label: "Tickets",
          icon: FiPhoneIncoming,
          href: "/dashboard",
        },
      ],
    },
  ],
};
