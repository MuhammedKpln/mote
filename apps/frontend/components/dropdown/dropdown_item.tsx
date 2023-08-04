import React from "react";
import styles from "./dropdown_menu.module.scss";

interface IProps {
  children: React.ReactNode;
}

export function DropdownItem(props: IProps) {
  return <li className={styles.dropdownItem}>{props.children}</li>;
}
