import { RouterPaths } from "@/lib/router_paths";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  redirect(RouterPaths.Notes);
}
