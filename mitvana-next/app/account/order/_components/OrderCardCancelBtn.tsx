import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import { useOrderCancelForm } from "../_lib/useOrderCancelForm";

const OrderCardCancelBtn = ({ id, status }: { id: string; status: string }) => {
  const { form, onSubmit, onOpenChange, modal } = useOrderCancelForm({
    id,
  });

  if (
    status === "Payment Failed" ||
    status === "Cancelled by Admin" ||
    status === "Cancelled By user" ||
    status === "Refunded" ||
    status === "Failed" ||
    status === "Dispatched" ||
    status === "Delivered"
  ) {
    return null;
  }

  return (
    <Dialog open={modal} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          type="button"
          className="cursor-pointer"
        >
          Cancel Order
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
          <DialogDescription>
            Can you give the reason to cancel the order? This will help us to
            improve our service.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Controller
            name="cancellation_reason"
            control={form.control}
            render={({ field, fieldState }) => {
              return (
                <Field data-invalid={fieldState.invalid} className="grid gap-1">
                  <FieldLabel htmlFor={field.name}>
                    Reason for cancellation
                  </FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(e) => field.onChange(e.target.value)}
                    aria-invalid={fieldState.invalid}
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
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={form.formState.isSubmitting}
            className="cursor-pointer"
          >
            {form.formState.isSubmitting ? <Spinner /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderCardCancelBtn;
