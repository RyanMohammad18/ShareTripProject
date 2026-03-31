// components/atoms/Toast/Toast.tsx
import { useEffect } from "react";
import { colors, type ColorKey } from "../../../constants/colors";
import FlexContainer from "../containers/FlexContainer";
import Text from "../Typography/Text";

export interface ToastData {
  id: string;
  type: "error" | "warning" | "success";
  message: string;
  hint?: string;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  duration?: number;
}

const toastConfig: Record<
  ToastData["type"],
  { text: ColorKey; bg: ColorKey; border: ColorKey }
> = {
  error: { text: "error-dark", bg: "error-light", border: "error-border" },
  warning: {
    text: "warning-dark",
    bg: "warning-light",
    border: "warning-border",
  },
  success: {
    text: "success-dark",
    bg: "success-light",
    border: "success-border",
  },
};

const Toast = ({ toast, onDismiss, duration = 5000 }: ToastProps) => {
  const { text, bg, border } = toastConfig[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  return (
    <FlexContainer
      align="start"
      gap={10}
      className="w-[360px] p-3 rounded-xl shadow-lg animate-slide-in cursor-pointer"
      style={{
        backgroundColor: colors[bg],
        borderWidth: 1,
        borderColor: colors[border],
      }}
      onClick={() => onDismiss(toast.id)}
    >
      <FlexContainer direction="col" gap={2} className="flex-1">
        <Text size={14} weight={500} color={text}>
          {toast.message}
        </Text>
        {toast.hint && (
          <Text size={12} weight={400} color={text} className="opacity-75">
            {toast.hint}
          </Text>
        )}
      </FlexContainer>

      <Text size={14} color={text} className="opacity-50 hover:opacity-100">
        ✕
      </Text>
    </FlexContainer>
  );
};

export default Toast;
