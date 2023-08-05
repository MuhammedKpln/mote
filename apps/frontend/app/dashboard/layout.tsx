"use client";
import { DashboardHeader } from "@/components/dashboard/dashboard_header";
import { DashboardSidebar } from "@/components/dashboard/dashboard_sidebar";
import { Suspense, useState } from "react";
import styles from "./dashboard.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <div id="container" className={styles.container}>
      <div
        id="sidebar"
        className={collapsed ? styles.sidebarHidden : styles.sidebar}
      >
        <DashboardSidebar />
      </div>
      <div id="content" className={styles.content}>
        <Suspense fallback="Loading..">
          <DashboardHeader />
        </Suspense>
        <button onClick={() => setCollapsed(!collapsed)}>collapse</button>

        <Suspense fallback="Loading..">{children}</Suspense>
      </div>
    </div>
  );
}
