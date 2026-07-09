import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "back" | "position";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  type?: ButtonVariant;
}

function Button({
  children,
  type = "primary",
  className = "",
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button className={`${styles.btn} ${styles[type]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
