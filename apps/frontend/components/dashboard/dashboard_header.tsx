"use client";

import NextBreadcrumbs from "../breadcrumb";
import { DashboardHeaderSearch } from "./dashboard_header_search";
import { DashboardHeaderUser } from "./dashboard_header_user";

export function DashboardHeader() {
  return (
    <header className="flex justify-between p-5">
      <div id="headerInfo">
        <div>
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
