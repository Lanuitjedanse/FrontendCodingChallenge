import { test, expect } from "@playwright/test";

test("Cart is visible on the page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const cart = page.getByTestId("add-to-cart__container");

  await expect(cart).toBeVisible();
});

test("Button is disabled if no products are selected", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const cart = page.getByTestId("add-to-cart__container");
  await expect(cart).toBeVisible();

  const button = page.getByRole("button", { name: "Add to cart" });

  await expect(button).toBeDisabled();
});

test("Button is enabled if product and quantity are selected", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  const cart = page.getByTestId("add-to-cart__container");
  await expect(cart).toBeVisible();

  const button = page.getByRole("button", { name: "Add to cart" });

  await expect(button).toBeDisabled();

  const select = page.getByLabel("Products");

  await select.click();

  const option = page.getByRole("option", { name: "Cup" });

  await option.click();

  const slider = page.getByTestId("step-slider");
  await slider.click();

  await slider.press("ArrowRight");
  await slider.press("ArrowRight");

  await expect(button).toBeEnabled();
});

test("If The maximum quantity is reached, the button is disabled and I see an error", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");

  const cart = page.getByTestId("add-to-cart__container");
  await expect(cart).toBeVisible();

  const button = page.getByRole("button", { name: "Add to cart" });

  await expect(button).toBeDisabled();

  const select = page.getByLabel("Products");

  await select.click();

  const option = page.getByRole("option", { name: "T-Shirt" });

  await option.click();

  const slider = page.getByTestId("step-slider");
  await slider.click();

  await slider.press("ArrowRight");
  await slider.press("ArrowRight");

  await expect(button).toBeEnabled();

  await button.click();

  await slider.click();
  await slider.press("ArrowRight");

  const errorMessage = page.getByTestId("step-slider");
  const errorMessageButtons = page.getByTestId(
    "remove-or-add-buttons__error-message"
  );

  await expect(errorMessage).toBeVisible();
  await expect(errorMessageButtons).toBeVisible();
});
