import { BasicButton } from "../BasicButton/BasicButton";
import NumberIndicator from "../NumberIndicator/NumberIndicator";

interface ConfirmCartProps {
  totalPrice: string;
}

export default function ConfirmCart({ totalPrice }: ConfirmCartProps) {
  return (
    <div className="flex space-x-3">
      <NumberIndicator value={`${totalPrice} €`} />
      <BasicButton color="success" label="Confirm order" />
    </div>
  );
}
