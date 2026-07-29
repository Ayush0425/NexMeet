import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-xl bg-violet-600 px-6 py-3 font-medium transition-all duration-300 hover:bg-violet-500 hover:scale-105",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;