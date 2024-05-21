import { toast, ToastOptions } from "react-toastify";

export function useToast() {
  const success = (message: string) => showToast(message, { type: "success" });

  const error = (message: string) => showToast(message, { type: "error" });

  const info = (message: string) => showToast(message, { type: "info" });

  const showToast = (message: string, options: ToastOptions) => {
    return toast(message, options);
  };

  return { success, error, info };
}
