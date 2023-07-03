import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface StepSliderProps {
  defaultValue: number;
  size: "small" | "medium";
  step: number;
  min: number;
  max: number;
  onChange: () => void;
}

// const handleChange = (event: SelectChangeEvent) => {
//   setChosenProduct(event.target.value as string);
// };

export default function StepSlider({
  defaultValue,
  size,
  step,
  min,
  max,
}: StepSliderProps) {
  return (
    <Box width={300}>
      <Slider
        size={size}
        defaultValue={defaultValue}
        aria-label="Small"
        valueLabelDisplay="auto"
        step={step}
        marks
        min={min}
        max={max}
        // onChange={handleQuantity}
      />
    </Box>
  );
}
