import { DashboardHeader } from "@/components/dashboard/dashboard_header";
import { DashboardSidebar } from "@/components/dashboard/dashboard_sidebar";
import { Suspense } from "react";
import styles from "./dashboard.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="container" className={styles.container}>
      <div id="sidebar" className={styles.sidebar}>
        <DashboardSidebar />
      </div>
      <div id="content" className={styles.content}>
        <Suspense fallback="Loading..">
          <DashboardHeader />
        </Suspense>

        <Suspense fallback="Loading..">{children}</Suspense>
      </div>
    </div>
  );
}
