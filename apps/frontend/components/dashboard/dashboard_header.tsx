"use client";

import { FiMenu } from "react-icons/fi";
import NextBreadcrumbs from "../breadcrumb";
import { DashboardHeaderSearch } from "./dashboard_header_search";
import { DashboardHeaderUser } from "./dashboard_header_user";

interface IProps {
  showMenuIcon?: boolean;
  onMenuClick?: () => void;
}

export function DashboardHeader(props: IProps) {
  return (
    <header className="flex justify-between p-5">
      <div id="headerInfo">
        <div className="flex">
          {props.showMenuIcon && (
            <button onClick={props.onMenuClick} className="mr-5">
              <FiMenu />
            </button>
          )}
          <NextBreadcrumbs />
        </div>
      </div>

      <div id="user-actions" className="flex w-20 justify-around my-auto">
        <DashboardHeaderSearch />

        <DashboardHeaderUser />
      </div>
    </header>
  );
}
