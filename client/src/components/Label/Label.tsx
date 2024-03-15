import React from "react";
import styles from "./Label.module.css";

interface LabelProps {
  children: React.ReactNode;
  variant: "simples";
}

const variantStyles = {
  "simples": styles.simple,
};

const Label = ({ children, variant }: LabelProps) => {
  const style = `${styles.label} ${variantStyles[variant]}`;

  return (
    <label className={style}>{children}</label>
  );
};

export default Label;
