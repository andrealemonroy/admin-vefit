import { useDispatch } from "react-redux";
import { ToastVariants } from "../constants/variants";
import { show } from "../redux/reducers/toast";
const useToast = () => {
  const dispatch = useDispatch();
  const toastMessage = (variant) => (message) =>
    dispatch(show({ message, variant, withIcon: true }));
  return {
    success: toastMessage(ToastVariants.SUCCESS),
    warn: toastMessage(ToastVariants.WARNING),
    error: toastMessage(ToastVariants.DANGER),
  };
};

export default useToast;
