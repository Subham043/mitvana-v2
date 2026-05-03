"use client";

import { ExtendedModalProps } from "@/lib/types";
import { useAddressForm } from "../_lib/useAddressForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Controller } from "react-hook-form";

type Props = {
  modal: ExtendedModalProps<{ id: string }>;
  closeModal: () => void;
};

function AddressForm({ modal, closeModal }: Props) {
  const { form, onSubmit, isLoading } = useAddressForm({
    modal,
    closeModal,
  });

  return (
    <Drawer direction="right" onClose={closeModal} open={modal.show}>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>
            {modal.type === "update" ? "Update" : "Create"} Address
          </DrawerTitle>
          <DrawerDescription>
            The following address can be used on the checkout page.
          </DrawerDescription>
        </DrawerHeader>
        {isLoading ? (
          <div className="text-center w-full flex items-center justify-center">
            <Spinner className="size-4" />
          </div>
        ) : (
          <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-4">
            <Controller
              name="first_name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
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
              name="last_name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Last Name"
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
              name="phone_number"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      type="number"
                      placeholder="Phone Number"
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
              name="company_name"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>
                      Company Name (optional)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Company Name"
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
              name="address"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="House No and Street Name"
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
              name="address_2"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Apartment, suite, building, etc. (optional)"
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
              name="city"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="City"
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
              name="state"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>State</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="State"
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
              name="country"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(e.target.value)}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      placeholder="Country"
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
              name="postal_code"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Postal Code</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      aria-invalid={fieldState.invalid}
                      type="number"
                      placeholder="Postal Code"
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
              name="address_type"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="grid gap-2"
                  >
                    <FieldLabel htmlFor={field.name}>Address Type</FieldLabel>
                    <RadioGroup
                      value={field.value}
                      name={field.name}
                      onBlur={field.onBlur}
                      onValueChange={(val) =>
                        field.onChange(val as "Home" | "Work")
                      }
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="Home" id="Home" />
                        <Label htmlFor="Home">Home</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="Work" id="Work" />
                        <Label htmlFor="Work">Work</Label>
                      </div>
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[{ message: fieldState.error?.message }]}
                      />
                    )}
                  </Field>
                );
              }}
            />
          </div>
        )}
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

export default AddressForm;
