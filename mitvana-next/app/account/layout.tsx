import { getSession } from "@/lib/get-session";
import AccountLayoutClient from "./_components/AccountLayoutClient";
import { redirect } from "next/navigation";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }
  return (
    <>
      <AccountLayoutClient>{children}</AccountLayoutClient>
    </>
  );
}
