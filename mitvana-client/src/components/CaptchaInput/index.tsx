import { env } from '@/lib/config/env'
import { forwardRef, type LegacyRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { ClientOnly } from '@tanstack/react-router'

type PropType = {
  onChange: (token: string) => void
}

const CaptchaInput = forwardRef(
  (props: PropType, ref: LegacyRef<ReCAPTCHA> | undefined) => {
    const { onChange } = props
    return (
      <ClientOnly>
        <ReCAPTCHA
          ref={ref}
          sitekey={env.CAPTCHA_KEY}
          onChange={(val) => onChange(val ? val : '')}
          onExpired={() => onChange('')}
          onErrored={() => onChange('')}
        />
      </ClientOnly>
    )
  },
)

export default CaptchaInput
