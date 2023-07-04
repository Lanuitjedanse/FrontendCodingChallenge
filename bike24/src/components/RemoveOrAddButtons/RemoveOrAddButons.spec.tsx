import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import RemoveOrAddButtons from "./RemoveOrAddButtons";

const mockOnQuantityChange = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

test("renders the correct quantity", () => {
  render(
    <RemoveOrAddButtons
      quantity={5}
      maxQuantity={10}
      onQuantityChange={mockOnQuantityChange}
    />
  );

  const numberIndicator = screen.getByTestId(
    "remove-or-add-buttons__new-quantity"
  );
  expect(numberIndicator.textContent).toBe("5");
});

test("If I click on the + button and conditions matches it increases the quantity by 1", () => {
  render(
    <RemoveOrAddButtons
      quantity={5}
      maxQuantity={10}
      quantityToSubstractOrAdd={1}
      onQuantityChange={mockOnQuantityChange}
    />
  );

  const addButton = screen.getByTestId("remove-or-add-buttons__add");
  expect(addButton).not.toBeDisabled();

  fireEvent.click(addButton);

  const numberIndicator = screen.getByTestId(
    "remove-or-add-buttons__new-quantity"
  );
  expect(numberIndicator.textContent).toBe("6");
  expect(mockOnQuantityChange).toBeCalledTimes(1);
  expect(addButton).not.toBeDisabled();
});

test("If I click on the + button and conditions does not match it does not increase the quantity by 1", () => {
  render(
    <RemoveOrAddButtons
      quantity={10}
      maxQuantity={10}
      quantityToSubstractOrAdd={1}
      onQuantityChange={mockOnQuantityChange}
    />
  );
  const addButton = screen.getByTestId("remove-or-add-buttons__add");
  fireEvent.click(addButton);

  const numberIndicator = screen.getByTestId(
    "remove-or-add-buttons__new-quantity"
  );
  expect(numberIndicator.textContent).toBe("10");
  expect(mockOnQuantityChange).toBeCalledTimes(0);
  expect(addButton).toBeDisabled();
});

test("If I click on the - button and conditions matches it decreases the quantity by 1", () => {
  render(
    <RemoveOrAddButtons
      quantity={5}
      maxQuantity={10}
      quantityToSubstractOrAdd={1}
      onQuantityChange={mockOnQuantityChange}
    />
  );

  const removeButton = screen.getByTestId("remove-or-add-buttons__remove");
  expect(removeButton).not.toBeDisabled();

  fireEvent.click(removeButton);

  const numberIndicator = screen.getByTestId(
    "remove-or-add-buttons__new-quantity"
  );

  expect(numberIndicator.textContent).toBe("4");
  expect(mockOnQuantityChange).toHaveBeenCalledTimes(1);
  expect(removeButton).not.toBeDisabled();
});

test("If I click on the - button and conditions does not matches it does not decrease the quantity by 1", () => {
  render(
    <RemoveOrAddButtons
      quantity={0}
      maxQuantity={10}
      quantityToSubstractOrAdd={1}
      onQuantityChange={mockOnQuantityChange}
    />
  );

  const removeButton = screen.getByTestId("remove-or-add-buttons__remove");
  expect(removeButton).toBeDisabled();

  fireEvent.click(removeButton);

  const numberIndicator = screen.getByTestId(
    "remove-or-add-buttons__new-quantity"
  );

  expect(numberIndicator.textContent).toBe("0");
  expect(mockOnQuantityChange).toHaveBeenCalledTimes(0);
  expect(removeButton).toBeDisabled();
});

test("If the button is disabled and I add or remove it enables the button depending on the condition", async () => {
  render(
    <RemoveOrAddButtons
      quantity={0}
      maxQuantity={10}
      quantityToSubstractOrAdd={1}
      onQuantityChange={mockOnQuantityChange}
    />
  );

  const removeButton = screen.getByTestId("remove-or-add-buttons__remove");
  const addButton = screen.getByTestId("remove-or-add-buttons__add");

  expect(removeButton).toBeDisabled();

  fireEvent.click(addButton);

  const numberIndicator = screen.getByTestId(
    "remove-or-add-buttons__new-quantity"
  );

  expect(numberIndicator.textContent).toBe("1");
  expect(mockOnQuantityChange).toHaveBeenCalledTimes(1);

  waitFor(() => {
    expect(removeButton).not.toBeDisabled();
  });
});
