import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  variant:  "inputBig" | "inputSmall" | "searchBar";
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const variantStyles = {
  "inputBig": styles.inputBig,
  "inputSmall": styles.inputSmall,
  "searchBar": styles.searchBar, 
};

const Input = ({ variant, type, placeholder, value, onChange, icon }: InputProps) => {
  const style = `${styles.input} ${variantStyles[variant]}`;

  return (
    <div className={style}>
      <input className={style} type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {icon && <div className={styles.icon}>{icon}</div>}
    </div>
  );
};

export default Input;