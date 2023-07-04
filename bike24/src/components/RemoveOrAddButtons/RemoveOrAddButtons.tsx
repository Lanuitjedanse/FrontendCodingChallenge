import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import NumberIndicator from "../NumberIndicator/NumberIndicator";

interface RemoveOrAddButtonsProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export default function RemoveOrAddButtons({
  quantity,
  maxQuantity,
  onQuantityChange,
}: RemoveOrAddButtonsProps) {
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    setNewQuantity(quantity);
  }, [quantity]);

  const handleAddOne = (quantity: number): void => {
    if (quantity < maxQuantity) {
      const updatedQuantity = quantity++;
      setNewQuantity(updatedQuantity);
      onQuantityChange(updatedQuantity);
    }
  };

  const handleRemoveOne = (quantity: number): void => {
    if (quantity < 1) {
      const updatedQuantity = quantity--;
      setNewQuantity(updatedQuantity);
      onQuantityChange(updatedQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <IconButton
        aria-label="delete"
        color="primary"
        disabled={quantity < 1}
        size="small"
        onClick={() => handleRemoveOne(quantity)}
      >
        <RemoveIcon fontSize="inherit" />
      </IconButton>

      <NumberIndicator
        value={newQuantity}
        width="w-12"
        height="h-12"
      ></NumberIndicator>
      <IconButton
        aria-label="add"
        color="primary"
        disabled={quantity >= maxQuantity}
        size="small"
        onClick={() => handleAddOne(quantity)}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}
