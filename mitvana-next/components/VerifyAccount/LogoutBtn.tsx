import { useLogoutMutation } from "@/lib/data/mutations/profile";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Spinner } from "../ui/spinner";

function LogoutBtn() {
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await logoutMutation.mutateAsync(undefined, {
      onSuccess: () => {
        router.replace("/auth/login");
        router.refresh();
      },
    });
  }, [logoutMutation]);
  return (
    <Button
      variant="destructive"
      type="button"
      className="w-full cursor-pointer"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? <Spinner /> : "Logout"}
    </Button>
  );
}

export default LogoutBtn;
