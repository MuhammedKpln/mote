import React from "react";
import styles from "./dropdown_menu.module.scss";

interface IProps {
  isOpen: boolean;
  children: React.ReactNode;
  onExitHover: () => void;
}

export function DropdownMenu(props: IProps) {
  return (
    <div
      onMouseLeave={props.onExitHover}
      className={`${styles.dropdownMenu} ${
        props.isOpen ? styles.active : styles.inactive
      }`}
    >
      <ul>{props.children}</ul>
    </div>
  );
}
