import { DashboardRootLayout } from "./root_layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardRootLayout>{children}</DashboardRootLayout>;
}
