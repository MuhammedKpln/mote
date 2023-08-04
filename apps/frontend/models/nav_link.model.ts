import { IconType } from "react-icons";

export interface IMenuCategory {
  label: string;
  menus: IMenu[];
}

export interface IMenu {
  label: string;
  icon: IconType;
  href: string;
}

export interface IMenuRoot {
  menus: IMenuCategory[];
}
