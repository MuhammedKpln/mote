import { DashboardHeader } from "@/components/dashboard/dashboard_header";
import { DashboardSidebarNew } from "@/components/dashboard/sidebar";
import styles from "@/styles/dashboard.module.scss";
import { Suspense } from "react";

export function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="container" className={styles.container}>
      <DashboardSidebarNew />

      <div id="content" className={styles.content}>
        {/* <Suspense fallback="Loading..">
          <DashboardHeader />
        </Suspense> */}
        <Suspense fallback="Loading..">{children}</Suspense>
      </div>
    </div>
  );
}
