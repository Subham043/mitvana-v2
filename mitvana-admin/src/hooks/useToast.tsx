import { notifications, type NotificationData } from "@mantine/notifications";
import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react";
import { useCallback } from "react";

/*
 * Toast Hook Type
 */
type ToastHookType = () => {
  toastDismiss: () => void;
  toastSuccess: (msg: string) => void;
  toastError: (msg: string) => void;
  toastInfo: (msg: string) => void;
};

/*
 * Toast Configuration
 */
export const toastConfig: NotificationData = {
  position: "top-center",
  withCloseButton: true,
  autoClose: 5000,
  title: "Success",
  message: "",
  color: "green",
  icon: <IconX />,
  loading: false,
};

export const toastDismiss = () => {
  notifications.clean();
};

export const toastSuccess = (msg: string) => {
  notifications.clean();
  notifications.show({
    ...toastConfig,
    message: msg,
    icon: <IconCheck />,
  });
};

export const toastError = (msg: string) => {
  notifications.clean();
  notifications.show({
    ...toastConfig,
    message: msg,
    title: "Error",
    icon: <IconX />,
    color: "red",
  });
};

export const toastInfo = (msg: string) => {
  notifications.clean();
  notifications.show({
    ...toastConfig,
    message: msg,
    title: "Info",
    icon: <IconInfoCircle />,
    color: "blue",
  });
};

/*
  Toast Hook Function: This hook is used to have common toast configs at one place
*/
export const useToast: ToastHookType = () => {
  const tDismiss = useCallback(toastDismiss, []);
  const tSuccess = useCallback(toastSuccess, []);
  const tError = useCallback(toastError, []);
  const tInfo = useCallback(toastInfo, []);
  return {
    toastDismiss: tDismiss,
    toastSuccess: tSuccess,
    toastError: tError,
    toastInfo: tInfo,
  };
};
