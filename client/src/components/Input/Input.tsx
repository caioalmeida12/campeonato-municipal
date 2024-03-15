import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  variant: "cinza";
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const variantStyles = {
  "cinza": styles.cinza,
};

const Input = ({ variant, type, placeholder, value, onChange }: InputProps) => {
  const style = `${styles.input} ${variantStyles[variant]}`;

  return (
    <input className={style} type={type} placeholder={placeholder} value={value} onChange={onChange} />
  );
};

export default Input;
