import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn("rounded-sm px-4 py-2 bg-background min-w-[300px] max-w-[700px] hover:bg-header cursor-pointer hover:text-white transition-colors", className)}
      {...props}
    >
      {children}
    </button>
  );
};