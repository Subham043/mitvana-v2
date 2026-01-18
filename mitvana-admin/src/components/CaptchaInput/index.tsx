import ReCAPTCHA from "react-google-recaptcha";
import { Controller, type Control } from "react-hook-form";
import { type LegacyRef, forwardRef } from "react";
import { Input } from "@mantine/core";
import { env } from "@/config/env";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  error: string | undefined;
};

const CaptchaInput = forwardRef(
  (props: PropType, ref: LegacyRef<ReCAPTCHA> | undefined) => {
    const { control, error } = props;
    return (
      <Controller
        name="captcha"
        control={control}
        render={({ field }) => (
          <Input.Wrapper error={error} mt="md">
            <ReCAPTCHA
              ref={ref}
              sitekey={env.CAPTCHA_KEY}
              onChange={field.onChange}
              onExpired={() => field.onChange("")}
              onErrored={() => field.onChange("")}
            />
          </Input.Wrapper>
        )}
      />
    );
  },
);

export default CaptchaInput;
