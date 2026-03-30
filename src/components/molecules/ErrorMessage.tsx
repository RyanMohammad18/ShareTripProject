import { AlertCircle } from "lucide-react";
import { Button } from "../atoms/Button/Button";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="rounded-[28px] border border-rose-200 bg-rose-50/80 p-6 shadow-[0_18px_45px_rgba(244,63,94,0.08)] backdrop-blur-md">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-rose-100 p-2">
          <AlertCircle className="h-5 w-5 text-rose-500" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-rose-700">
            Something went wrong
          </h2>
          <p className="mt-1 text-sm leading-6 text-rose-600">{message}</p>

          <Button
            onClick={onRetry}
            className="mt-4 border-rose-500 bg-rose-500 text-white hover:border-rose-400 hover:bg-rose-400 hover:text-white"
          >
            Retry Request
          </Button>
        </div>
      </div>
    </div>
  );
};
