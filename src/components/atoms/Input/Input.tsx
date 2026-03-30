import type { InputHTMLAttributes } from 'react';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
    />
  );
};