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
