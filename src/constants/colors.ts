
export const colors = {
    primary: '#4F46E5',
    secondary: '#5A6573',
    dark: '#1A2B3D',
    black: '#111827',
    sky: '#0EA5E9',
    muted: '#9CA3AF',
    white: '#FFFFFF',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
  
    'error-dark': '#991B1B',
    'warning-dark': '#92400E',
    'success-dark': '#065F46',
  
    'error-light': '#FEF2F2',
    'warning-light': '#FFFBEB',
    'success-light': '#F0FDF4',
  
    'error-border': '#FECACA',
    'warning-border': '#FDE68A',
    'success-border': '#BBF7D0',
  } as const;
  
  export type ColorKey = keyof typeof colors;