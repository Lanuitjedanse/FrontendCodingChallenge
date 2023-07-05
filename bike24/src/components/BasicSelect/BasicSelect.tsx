"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import Product from "@/types/product.type";

interface BasicSelectProps {
  primary?: boolean;
  label: string;
  options: Product[];
  helperText: String;
  onChange: (e: Product) => void;
}

export default function BasicSelect({ ...props }: BasicSelectProps) {
  const [selectedOption, setSelectedOption] = useState<Product | undefined>(
    undefined
  );
  const [selectedOptiontId, setSelectedOptionId] = useState<string | undefined>(
    undefined
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOptionId(event.target.value as string);
    const selectedOption = props.options.find(
      (option) => option.id === event.target.value
    );
    if (selectedOption) {
      setSelectedOption(selectedOption);
      props.onChange(selectedOption);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedOptiontId || ""}
          label="Products"
          onChange={handleChange}
        >
          {props.options &&
            props.options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.productName}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}
