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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { useProductReviewCreateMutation } from "@/lib/data/mutations/product_review";
import {
  productReviewSchema,
  ProductReviewFormValuesType,
} from "@/lib/data/schemas/product_review";
import { handleFormServerErrors } from "@/lib/helper";
import { useAuthStore } from "@/lib/store/auth.store";
import { ProductType } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, Resolver, useForm } from "react-hook-form";

function ReviewForm({ id }: { id: ProductType["id"] }) {
  const [open, setOpen] = useState(false);
  const { toastError } = useToast();
  const authToken = useAuthStore((state) => state.authToken);
  const reviewCreateMutation = useProductReviewCreateMutation();
  const router = useRouter();
  const captchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<ProductReviewFormValuesType>({
    resolver: yupResolver(
      productReviewSchema,
    ) as Resolver<ProductReviewFormValuesType>,
    values: {
      rating: 5,
      title: "",
      description: undefined,
      captcha: "",
    },
    mode: "onChange",
  });

  const handleDrawerOpen = useCallback(() => {
    if (!authToken) {
      toastError("Please login to write a review");
      router.push("/auth/login");
      return;
    }
    form.reset({
      rating: 5,
      title: "",
      description: undefined,
      captcha: "",
    });
    setOpen(true);
  }, [authToken, toastError]);

  const handleDrawerClose = useCallback(() => {
    form.reset({
      rating: 5,
      title: "",
      description: undefined,
      captcha: "",
    });
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    form.handleSubmit(async (values) => {
      reviewCreateMutation.mutateAsync(
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
    [form.handleSubmit, reviewCreateMutation.mutateAsync, handleDrawerClose],
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
          type="button"
          size="sm"
          className="mt-2 cursor-pointer"
          onClick={handleDrawerOpen}
        >
          Write a review
        </Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>Review</DrawerTitle>
          <DrawerDescription>
            Share your experience with others
          </DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-4">
          <Controller
            name="rating"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor={field.name}>Rating</FieldLabel>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        size="sm"
                        variant="link"
                        className="cursor-pointer group"
                        onClick={() => field.onChange(star)}
                      >
                        <Star
                          className={`${field.value >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-500"} group-hover:text-yellow-500 group-hover:fill-yellow-500`}
                        />
                      </Button>
                    ))}
                  </div>
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
            name="title"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="First Name"
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
            name="description"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid} className="grid gap-2">
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-invalid={fieldState.invalid}
                    placeholder="Description"
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
            disabled={reviewCreateMutation.isPending}
          >
            {reviewCreateMutation.isPending ? <Spinner /> : "Submit"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ReviewForm;
