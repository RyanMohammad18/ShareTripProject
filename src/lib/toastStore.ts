import { useSyncExternalStore, useCallback } from 'react';

export interface ToastData {
  id: string;
  type: 'error' | 'warning' | 'success';
  message: string;
  hint?: string;
}

let toasts: ToastData[] = [];
let toastId = 0;
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export const toastStore = {
  getSnapshot: () => toasts,

  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  add: (toast: Omit<ToastData, 'id'>) => {
    const id = String(++toastId);
    toasts = [...toasts, { ...toast, id }];
    notify();
    return id;
  },

  dismiss: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
};

export function useToast() {
  const current = useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot);

  const dismiss = useCallback((id: string) => toastStore.dismiss(id), []);

  return { toasts: current, dismiss };
}