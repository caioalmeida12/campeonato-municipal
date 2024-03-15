import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  variant: "verde";
  type?: "button" | "submit" | "reset";
  onClick?: (...args: any[]) => void
}

const variantStyles = {
  "verde": styles.green,
};

const Button = ({ children, variant, onClick, type }: ButtonProps) => {
  const style = `${styles.button} ${variantStyles[variant]}`;

  return (
    <button className={style} type={type} onClick={onClick}>{children}</button>
  );
};

export default Button;