import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function CAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }
  return children;
}
