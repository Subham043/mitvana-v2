import { getSession } from "@/lib/get-session";
import AuthLayoutClient from "./_components/AuthLayoutClient";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    redirect("/account/profile");
  }
  return (
    <>
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </>
  );
}
