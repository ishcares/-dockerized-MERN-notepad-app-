import { Toaster, toast } from "react-hot-toast";

export const notify = (msg, type = "success") => {
  if (type === "error") toast.error(msg);
  else toast.success(msg);
};

export const ToastContainer = () => <Toaster position="top-center" />;
