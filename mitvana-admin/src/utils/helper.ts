import { type FieldValues, type UseFormReturn, type Path } from "react-hook-form";
import { isAxiosError } from "axios";
import { toastError } from "@/hooks/useToast";

export function handleFormServerErrors<T extends FieldValues>(
  error: unknown,
  form: UseFormReturn<T>
) {
  if (!isAxiosError(error)) return;

  if (error.response?.data?.message) {
    toastError(error.response.data.message);
  }

  const backendErrors = error.response?.data?.errors;
  if (!backendErrors) return;

  if (Array.isArray(backendErrors)) {
    backendErrors.forEach((itm) => {
      form.setError(itm.field as Path<T>, {
        type: itm.rule,
        message: itm.message,
      });
    });
    return;
  }

  toastError(backendErrors);
}

export function formDataFromObject(obj: any) {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // File
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Select option { value, label }
    if (
      typeof value === "object" &&
      "value" in value &&
      typeof value.value === "string"
    ) {
      if (value.value.length > 0) {
        formData.append(key, value.value);
      }
      return;
    }

    // Select option { value, label }[]
    if (
      Array.isArray(value) &&
      value.every(
        (item) =>
          typeof item === "object" &&
          "value" in item &&
          typeof item.value === "string"
      )
    ) {
      value.forEach((item, index) => {
        if (item.value.length > 0) {
          formData.append(`${key}[${index}]`, item.value);
        }
      });
      return;
    }

    // Array of {question, answer}[]
    if (
      Array.isArray(value) &&
      value.every(
        (item) =>
          typeof item === "object" &&
          "question" in item &&
          "answer" in item
      )
    ) {
      value.forEach((item, index) => {
        if (item.question.length > 0 && item.answer.length > 0) {
          formData.append(`${key}[${index}][question]`, item.question);
          formData.append(`${key}[${index}][answer]`, item.answer);
        }
      });
      return;
    }

    // Boolean
    if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false"); // safer for backend
      return;
    }

    // Number
    if (typeof value === "number") {
      formData.append(key, value.toString());
      return;
    }

    // String
    if (typeof value === "string" && value.length > 0) {
      formData.append(key, value);
      return;
    }
  });
  return formData;
}
