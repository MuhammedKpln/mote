import { DashboardSidebarNew } from "@/components/dashboard/sidebar";
import { DashboardRootLayout } from "../root_layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardRootLayout>
      <DashboardSidebarNew />
      {children}
    </DashboardRootLayout>
  );
}
