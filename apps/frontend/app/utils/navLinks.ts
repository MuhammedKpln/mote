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
          href: "/dashboard",
        },
        {
          label: "Orders",
          icon: FiArchive,
          href: "/dashboard/orders",
        },
        {
          label: "Clients",
          icon: FiUsers,
          href: "/dashboard",
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
