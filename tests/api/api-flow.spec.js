const { test, expect, request } = require('@playwright/test');

require('dotenv').config();

test('API Flow', async () => {

  const api = await request.newContext({
    baseURL: process.env.BASE_URL
  });

  console.log(process.env.DUMMY_USERNAME);
  console.log(process.env.DUMMY_PASSWORD);

  // LOGIN
  const loginResponse = await api.post('/auth/login', {
    data: {
      username: process.env.DUMMY_USERNAME,
      password: process.env.DUMMY_PASSWORD,
      expiresInMins: 30
    }
  });

  expect(loginResponse.ok()).toBeTruthy();

  const loginData = await loginResponse.json();

  console.log(loginData);

  const token =
    loginData.accessToken ||
    loginData.token;

  const userId = loginData.id;

  expect(token).toBeDefined();
  expect(userId).toBeDefined();

  // FETCH USER CART
  const cartResponse = await api.get(`/carts/user/${userId}`);

  expect(cartResponse.ok()).toBeTruthy();

  // ADD PRODUCT
  const addResponse = await api.post('/carts/add', {
    data: {
      userId,
      products: [
        {
          id: 1,
          quantity: 2
        }
      ]
    }
  });

  expect([200, 201]).toContain(addResponse.status());

  const addData = await addResponse.json();

  // ASSERT PRODUCT
  const addedProduct = addData.products.find(p => p.id === 1);

  expect(addedProduct).toBeDefined();
  expect(addedProduct.quantity).toBe(2);

  // ASSERT TOTAL
  expect(addData.total).toBeGreaterThan(0);

  // SCHEMA ASSERTION
  expect(addData).toHaveProperty('id');
  expect(addData).toHaveProperty('products');
  expect(addData).toHaveProperty('total');
});