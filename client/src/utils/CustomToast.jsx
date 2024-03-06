import { toast } from "react-hot-toast";

export const SuccessToast = (message) => {
  toast.success(message, {
    position: "top-center",
    duration: 2000,
    icon: "🚀",
  });
};

export const ErrorToast = (error) => {
  toast.error(error, {
    position: "top-center",
    duration: 2000,
    theme: "error",
    icon: "❌",
  });
};
