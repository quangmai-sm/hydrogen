# Verify Your Shopify Store Checkout Setup

This guide provides instructions on how to verify that your Shopify store is correctly set up for checkout. It includes a Playwright script to automate the testing process and a checklist of items to verify in your Shopify admin.

## 1. Install Playwright

First, you need to add Playwright to your project's dev dependencies.

```bash
npm install --save-dev @playwright/test
```

Then, install the necessary browsers for Playwright:

```bash
npx playwright install
```

## 2. Create a Playwright Test Script

Create a new file named `tests/checkout.spec.ts` and add the following code:

```typescript
import { test, expect } from '@playwright/test';

test('Checkout Process Verification', async ({ page }) => {
  // Replace with your storefront URL
  const storefrontUrl = 'http://localhost:3000';

  // 1. Navigate to the storefront
  await page.goto(storefrontUrl);

  // 2. Find a product and navigate to its page
  // This assumes you have a product on the homepage.
  // If not, you can navigate directly to a product page.
  const productLink = page.locator('a[href^="/products/"]').first();
  await productLink.click();

  // 3. Add the product to the cart
  await page.getByRole('button', { name: 'Add to cart' }).click();

  // 4. Go to the cart
  await page.goto(`${storefrontUrl}/cart`);

  // 5. Proceed to checkout
  const checkoutLink = page.getByRole('link', { name: 'Continue to Checkout' });
  const checkoutUrl = await checkoutLink.getAttribute('href');
  expect(checkoutUrl).not.toBeNull();
  await page.goto(checkoutUrl!);

  // 6. Verify checkout page
  // Check for the presence of key elements on the checkout page.
  // This indicates that the checkout process has started successfully.

  // Check for email/phone input
  await expect(page.getByPlaceholder('Email or mobile phone number')).toBeVisible();

  // Check for shipping address form
  await expect(page.getByPlaceholder('Last name')).toBeVisible();
  await expect(page.getByPlaceholder('Address')).toBeVisible();

  // Check for a way to continue to shipping
  await expect(page.getByRole('button', { name: 'Continue to shipping' })).toBeVisible();

  // You can add more checks here, for example, to fill in the form
  // and proceed to the payment page to verify payment options.
  // However, this requires a valid address and may depend on your store's setup.
});
```

## 3. Run the Playwright Test

To run the test, use the following command:

```bash
npx playwright test tests/checkout.spec.ts
```

The test will open a browser, navigate to your store, add a product to the cart, and proceed to checkout. If the test passes, it means the basic checkout flow is working.

## 4. Manual Verification in Shopify Admin

The Playwright script verifies the frontend flow. You also need to ensure that your Shopify admin is configured correctly. Here's a checklist of things to verify:

### Products
*   **Availability:** Make sure you have products available for sale on your online store channel.
*   **Inventory:** Ensure that the products you want to test with have available inventory.

### Payments
*   **Payment Provider:** Go to **Settings -> Payments**. You should have a payment provider configured and active. For testing, you can enable the "(for testing) Bogus Gateway". This allows you to simulate transactions without using a real credit card.

### Shipping
*   **Shipping Zones:** Go to **Settings -> Shipping and delivery**. You need to have shipping zones and rates configured. If you don't have any shipping zones, customers won't be able to complete the checkout.
*   **Locations:** Ensure your products are stocked at a location that is set up to fulfill online orders.

### Storefront
*   **Domain:** Make sure your storefront domain is correctly configured.

By running the Playwright script and manually verifying your Shopify admin settings, you can be confident that your checkout process is set up correctly.
