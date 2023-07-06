import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import NumberIndicator from "../NumberIndicator/NumberIndicator";

interface RemoveOrAddButtonsProps {
  quantity: number;
  maxQuantity: number;
  quantityToSubstractOrAdd?: number;
  onQuantityChange: (newQuantity: number) => void;
}

export default function RemoveOrAddButtons({
  quantity,
  maxQuantity,
  quantityToSubstractOrAdd = 1,
  onQuantityChange,
}: RemoveOrAddButtonsProps) {
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    setNewQuantity(quantity);
  }, [quantity]);

  const handleAddOne = (): void => {
    if (quantity < maxQuantity) {
      const updatedQuantity = quantity + quantityToSubstractOrAdd;
      setNewQuantity(updatedQuantity);
      onQuantityChange(updatedQuantity);
    }
  };

  const handleRemoveOne = (): void => {
    if (quantity >= 1) {
      const updatedQuantity = quantity - quantityToSubstractOrAdd;
      setNewQuantity(updatedQuantity);
      onQuantityChange(updatedQuantity);
    }
  };

  return (
    <div className="h-full flex flex-col items-center space-y-2 relative">
      <div className="flex-1 flex items-center space-x-3">
        <IconButton
          data-testid="remove-or-add-buttons__remove"
          aria-label="delete"
          color="primary"
          disabled={quantity < 1}
          size="small"
          onClick={handleRemoveOne}
        >
          <RemoveIcon fontSize="inherit" />
        </IconButton>

        <NumberIndicator
          dataTestid="remove-or-add-buttons__new-quantity"
          value={newQuantity}
          width="w-12"
          height="h-12"
        ></NumberIndicator>

        <IconButton
          data-testid="remove-or-add-buttons__add"
          aria-label="add"
          color="primary"
          disabled={quantity >= maxQuantity}
          size="small"
          onClick={handleAddOne}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </div>

      {quantity >= maxQuantity && (
        <p className="absolute bottom-0 text-xs text-red-500 -mt-12">
          Max quantity reached
        </p>
      )}
    </div>
  );
}
