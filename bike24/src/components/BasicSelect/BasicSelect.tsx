import * as React from "react";
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
  onChange?: () => void;
}

export default function BasicSelect({ ...props }: BasicSelectProps) {
  const [chosenProduct, setChosenProduct] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setChosenProduct(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenProduct}
          label="Products"
          onChange={handleChange}
        >
          {props.options &&
            props.options.map((option) => (
              <MenuItem value={option.productName}>
                {option.productName}
              </MenuItem>
            ))}
        </Select>
        <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}
