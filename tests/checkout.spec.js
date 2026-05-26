const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');
const { CheckoutPage } = require('../pages/checkout.page');

test('Sauce Demo End to End Flow', async ({ page }) => {

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // 1. Login
  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  // 2. Sort High to Low
  await inventory.sortHighToLow();

  // 3. Assertion: check sorting
  const prices = await inventory.getPrices();
  expect(prices[0]).toBeGreaterThanOrEqual(prices[1]);

  // 4. Add top 2 items
  await inventory.addTopTwoItems();

  // 5. Go to cart
  await inventory.goToCart();

  // 6. Checkout
  await cart.checkout();

  await checkout.fillInfo();
  await checkout.finishOrder();

  // 7. Final Assertion
  const msg = await checkout.verifySuccess();
  expect(msg).toBe('Thank you for your order!');
});