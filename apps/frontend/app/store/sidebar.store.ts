import { IconType } from "react-icons";
import {
  FiArchive,
  FiHome,
  FiPhoneIncoming,
  FiServer,
  FiUsers,
} from "react-icons/fi";
import { create } from "zustand";

interface IMenuCategory {
  label: string;
  menus: IMenu[];
}

interface IMenu {
  label: string;
  icon: IconType;
}

interface IMenuStore {
  menus: IMenuCategory[];
}

export const useSidebarStore = create<IMenuStore>()((set) => ({
  menus: [
    {
      label: "Activity",
      menus: [
        {
          label: "Dashboard",
          icon: FiHome,
        },
        {
          label: "Orders",
          icon: FiArchive,
        },
        {
          label: "Clients",
          icon: FiUsers,
        },
        {
          label: "Files",
          icon: FiServer,
        },
        {
          label: "Tickets",
          icon: FiPhoneIncoming,
        },
      ],
    },
  ],
}));
