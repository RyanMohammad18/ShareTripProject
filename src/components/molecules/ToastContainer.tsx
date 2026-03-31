import type { ToastData } from "../atoms/Toast/Toast";
import Toast from "../atoms/Toast/Toast";
import FlexContainer from "../atoms/containers/FlexContainer";


interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <FlexContainer direction="col" gap={8} className="fixed top-4 right-4 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </FlexContainer>
  );
};

export default ToastContainer;