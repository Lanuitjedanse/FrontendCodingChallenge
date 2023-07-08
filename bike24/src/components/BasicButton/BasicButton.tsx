"use client";

import React from "react";
import Button from "@mui/material/Button";
import "./BasicButton.module.css";

export interface ButtonProps {
  variant?: "contained" | "outlined" | "text";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  label: string;
  disabled?: boolean;
  style?: string;
  onClick?: () => void;
}

export const BasicButton = ({
  variant = "contained",
  color = "primary",
  size = "small",
  disabled = false,
  label,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
