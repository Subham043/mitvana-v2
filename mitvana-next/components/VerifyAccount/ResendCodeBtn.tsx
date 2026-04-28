import { useResendVerificationCodeMutation } from "@/lib/data/mutations/profile";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { Spinner } from "../ui/spinner";

function ResendCodeBtn() {
  const resendMutation = useResendVerificationCodeMutation();

  const resendCode = useCallback(async () => {
    await resendMutation.mutateAsync(undefined);
  }, [resendMutation]);

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full cursor-pointer"
      onClick={resendCode}
      disabled={resendMutation.isPending}
    >
      {resendMutation.isPending ? <Spinner /> : "Resend Code"}
    </Button>
  );
}

export default ResendCodeBtn;
