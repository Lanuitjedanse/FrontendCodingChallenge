import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  variant: "contained" | "outlined" | "text";
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size: "small" | "medium" | "large";
  label: string;
  disabled: boolean;
  onClick?: () => void;
}

export const BasicButton = ({
  variant = "contained",
  color = "primary",
  size = "small",
  disabled = false,
  label,
  ...props
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      {...props}
    >
      {label}
    </Button>
  );
};
