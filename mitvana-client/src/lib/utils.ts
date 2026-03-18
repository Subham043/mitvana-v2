import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ApiResponse } from "./type";
import { toastError } from "@/hooks/useToast";
import type { AnyFormApi } from "@tanstack/react-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isApiResponse(data: unknown): data is ApiResponse<unknown> {
  return (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    "status" in data
  );
}

export async function apiResolver<T>(promise: Promise<T>) {
  const data = await promise;

  if (isApiResponse(data) && data.error) {
    const err = new Error(data.message ?? "API Error") as Error & {
      status?: number;
    };

    err.status = data.status;

    throw { ...err, ...data };
  }

  return data;
}

type BackendError = {
  field: string;
  rule?: string;
  message: string;
};

export function handleFormServerErrors(
  error: any,
  form: AnyFormApi
) {

  const message = error?.message;
  if (message) {
    toastError(message);
  }

  const backendErrors = error?.errors;
  if (!backendErrors) return;

  if (Array.isArray(backendErrors)) {
    const fields: Record<string, { message: string }[]> = {}

    backendErrors.forEach((itm: BackendError) => {
      fields[itm.field] = [{ message: itm.message }]
    })

    form.setErrorMap({
      onSubmit: {
        fields,
      },
    })

    return;
  }

  toastError(backendErrors);
}