import { DashboardSidebar } from "@/components/dashboard_sidebar";
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
        <Suspense fallback={<h1>Loading...</h1>}>
          <DashboardSidebar />
        </Suspense>
      </div>
      <div id="content" className={styles.content}>
        {children}
      </div>
    </div>
  );
}
