import React from "react";
import styles from "./Label.module.css";

interface LabelProps {
  children: React.ReactNode;
  variant: "labelBig" | "labelSmall";
}

const variantStyles = {
    "labelBig": styles.labelBig,
    "labelSmall": styles.labelSmall,
};

const Label = ({ children, variant }: LabelProps) => {
  const style = `${styles.labelBig} ${variantStyles[variant]}`;

  return (
    <label className={style}>{children}</label>
  );
};

export default Label;
