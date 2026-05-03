import CaptchaInput from "@/components/CaptchaInput";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useProductNotifyCreateMutation } from "@/lib/data/mutations/product_notify";
import {
  ProductNotifyFormValuesType,
  productNotifySchema,
} from "@/lib/data/schemas/product_notify";
import { handleFormServerErrors } from "@/lib/helper";
import { useAuthStore } from "@/lib/store/auth.store";
import { ProductType } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, Resolver, useForm } from "react-hook-form";

function ProductItemInfoNotifyBtn({ id }: { id: ProductType["id"] }) {
  const [open, setOpen] = useState(false);
  const authUser = useAuthStore((state) => state.authUser);
  const notifyCreateMutation = useProductNotifyCreateMutation();
  const captchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<ProductNotifyFormValuesType>({
    resolver: yupResolver(
      productNotifySchema,
    ) as Resolver<ProductNotifyFormValuesType>,
    values: {
      email: authUser ? authUser.email : "",
      captcha: "",
    },
    mode: "onSubmit",
  });

  const handleDrawerOpen = useCallback(() => {
    form.reset({
      email: authUser ? authUser.email : "",
      captcha: "",
    });
    setOpen(true);
  }, [authUser]);

  const handleDrawerClose = useCallback(() => {
    form.reset({
      email: "",
      captcha: "",
    });
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      await notifyCreateMutation.mutateAsync(
        { ...values, productId: id },
        {
          onError: (error) => {
            handleFormServerErrors(error, form);
          },
          onSuccess: () => {
            handleDrawerClose();
          },
          onSettled: () => {
            captchaRef.current?.reset();
          },
        },
      );
    }),
    [form.handleSubmit, notifyCreateMutation.mutateAsync, handleDrawerClose],
  );
  return (
    <Drawer
      direction="right"
      open={open}
      onClose={handleDrawerClose}
      modal={false}
    >
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="bg-[#56cfe1] text-white border border-[#56cfe1] w-[170px] uppercase p-4 py-5 rounded-full cursor-pointer"
          type="button"
          onClick={handleDrawerOpen}
        >
          Notify Me
        </Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>Notify Me</DrawerTitle>
          <DrawerDescription>
            We will notify you when this product is back in stock
          </DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-4">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-invalid={fieldState.invalid}
                    type="email"
                    placeholder="Email"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[{ message: fieldState.error?.message }]}
                    />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            name="captcha"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel htmlFor={field.name}>Captcha</FieldLabel>
                <CaptchaInput
                  onChange={(val) => {
                    field.onChange(val);
                    field.onBlur();
                  }}
                  ref={captchaRef}
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[{ message: fieldState.error?.message }]}
                  />
                )}
              </Field>
            )}
          />
        </div>
        <DrawerFooter>
          <Button
            type="button"
            onClick={onSubmit}
            className="cursor-pointer bg-[#194455]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : "Submit"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ProductItemInfoNotifyBtn;
