import { toast } from "react-hot-toast";

export const SuccessToast = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    icon: "🚀",
  });
};

export const ErrorToast = (error) => {
  toast.error(error, {
    position: "top-center",
    autoClose: 3000,
    theme: "error",
    icon: "❌",
  });
};
