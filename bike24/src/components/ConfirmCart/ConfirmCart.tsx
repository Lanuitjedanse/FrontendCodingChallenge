import { BasicButton } from "../BasicButton/BasicButton";
import NumberIndicator from "../NumberIndicator/NumberIndicator";

interface ConfirmCartProps {
  totalPrice: number;
  disabled: boolean;
  label: string;
  onClick: () => void;
}

export default function ConfirmCart({
  totalPrice,
  disabled,
  label,
  onClick,
}: ConfirmCartProps) {
  return (
    <div className="flex space-x-3">
      <NumberIndicator value={`${totalPrice} €`} width="w-32" />
      <BasicButton
        color="success"
        label={label}
        disabled={disabled}
        onClick={onClick}
      />
    </div>
  );
}
