"use client";

import { env } from "@/config/env";
import { forwardRef, type LegacyRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type PropType = {
  onChange: (token: string) => void;
};

const CaptchaInput = forwardRef(
  (props: PropType, ref: LegacyRef<ReCAPTCHA> | undefined) => {
    const { onChange } = props;
    return (
      <ReCAPTCHA
        ref={ref}
        sitekey={env.CAPTCHA_KEY}
        onChange={(val) => onChange(val ? val : "")}
        onExpired={() => onChange("")}
        onErrored={() => onChange("")}
      />
    );
  },
);

export default CaptchaInput;
