import { BasicButton } from "../BasicButton/BasicButton";
import NumberIndicator from "../NumberIndicator/NumberIndicator";

interface ConfirmCartProps {
  totalPrice: number;
  disabled: boolean;
  label: string;
  onClick: () => void;
  color?:
    | "success"
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "warning"
    | undefined;
}

export default function ConfirmCart({
  totalPrice,
  disabled,
  label,
  color = "success",
  onClick,
}: ConfirmCartProps) {
  return (
    <div className="flex space-x-3">
      <NumberIndicator value={`${totalPrice} €`} width="w-32" />
      <BasicButton
        color={color}
        label={label}
        disabled={disabled}
        onClick={onClick}
      />
    </div>
  );
}
