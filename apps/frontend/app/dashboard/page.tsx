import { RouterPaths } from "@/lib/router_paths";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authHandler } from "../api/auth/[...nextauth]/route";

export default async function Dashboard() {
  const session = await getServerSession(authHandler);

  if (!session) {
    return redirect("/login");
  }

  redirect(RouterPaths.Notes);
}
