import * as React from "react";

interface QuantityIndicatorProps {
  quantity: number;
}

export default function QuantityIndicator({
  quantity,
}: QuantityIndicatorProps) {
  return (
    <div className="p-2 border-2 border-blue-400 rounded-md w-10 h-10 flex justify-center items-center">
      {quantity}
    </div>
  );
}
