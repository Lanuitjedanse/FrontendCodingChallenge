"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface StepSliderProps {
  defaultValue: number;
  size?: "small" | "medium";
  step?: number;
  min: number;
  max: number;
  disabled: boolean;
  handleChangeCallback: (value: number) => void;
}

export default function StepSlider({
  defaultValue = 0,
  size = "small",
  step = 1,
  min = 0,
  max,
  disabled,
  handleChangeCallback,
}: StepSliderProps) {
  const [selectedValue, setSelectedValue] =
    React.useState<number>(defaultValue);

  const handleChange = (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    setSelectedValue(Array.isArray(value) ? value[0] : value);
    handleChangeCallback(Array.isArray(value) ? value[0] : value);
  };

  React.useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <Box width={300} className="flex w-96">
      <Slider
        data-testid="step-slider"
        size={size}
        disabled={disabled}
        defaultValue={defaultValue}
        aria-label="Small"
        valueLabelDisplay="auto"
        step={step}
        marks
        min={min}
        max={max}
        onChange={handleChange}
        value={selectedValue}
      />
    </Box>
  );
}
