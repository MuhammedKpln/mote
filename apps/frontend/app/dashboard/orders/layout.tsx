import React from "react";
import { DashboardRootLayout } from "../root_layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardRootLayout>{children}</DashboardRootLayout>;
}
