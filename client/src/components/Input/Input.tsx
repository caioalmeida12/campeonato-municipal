import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  variant:  "inputBig" | "inputSmall";
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const variantStyles = {
  "inputBig": styles.inputBig,
  "inputSmall": styles.inputSmall,
};

const Input = ({ variant, type, placeholder, value, onChange }: InputProps) => {
  const style = `${styles.inputBig} ${variantStyles[variant]}`;

  return (
    <input className={style} type={type} placeholder={placeholder} value={value} onChange={onChange} />
  );
};

export default Input;
