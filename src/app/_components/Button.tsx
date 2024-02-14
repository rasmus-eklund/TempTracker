import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { BarLoader } from "react-spinners";

type ButtonProps = {
  callToAction?: boolean;
  className?: string;
  disabled?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  className: style = "",
  callToAction = false,
  disabled,
  ...props
}: ButtonProps) {
  const className = callToAction
    ? "bg-c3 md:hover:bg-c4 text-black md:hover:text-gray border-c1 active:bg-c4"
    : "bg-c2 md:hover:bg-c4 text-black border-c1 active:bg-c4";
  if (disabled) {
    return <BarLoader className="p-2" />;
  }
  return (
    <button
      className={`${className} ${style} rounded-md border-2 px-2 transition-colors duration-200 disabled:cursor-not-allowed`}
      {...props}
    ></button>
  );
}

export default Button;
