# Guide: Enabling Customer Sign-In in Your Hydrogen Storefront

This guide will walk you through the final steps to enable the customer sign-in feature in your Shopify Hydrogen application. The boilerplate code for login, logout, and profile management is already in place; you just need to connect it to your Shopify store.

There are two ways to configure your local environment:

1.  **Using the Shopify CLI (Recommended)**: This is the easiest and recommended method.
2.  **Manual Setup**: For when you can't use the CLI or prefer to manage variables yourself.

---

## Method 1: Using the Shopify CLI (Recommended)

The Shopify CLI can automatically link your local project to your store and pull all the necessary environment variables.

### Step 1: Link Your Project to Shopify

Run the following command in your terminal and follow the prompts. You will be asked to log in to your Shopify account and select a store.

```bash
npx shopify hydrogen link
```

### Step 2: Pull Environment Variables

Once linked, the CLI can fetch the environment variables from your store and add them to a local `.env` file.

```bash
npx shopify hydrogen env pull
```

This command will create or update your `.env` file with all the necessary tokens and IDs, including:
- `PUBLIC_STORE_DOMAIN`
- `PUBLIC_STOREFRONT_API_TOKEN`
- `PRIVATE_STOREFRONT_API_TOKEN`
- `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID`
- `PUBLIC_CUSTOMER_ACCOUNT_API_URL`

---

## Method 2: Manual Environment Setup

If you prefer to set up your environment manually, you will need to get credentials from the **Headless** sales channel in your Shopify admin.

### Step 1: Get Your Shopify Storefront Credentials

1.  **Navigate to your Shopify Admin.**
2.  Go to **Apps and sales channels** on the left-hand menu.
3.  Click on **Headless**.
4.  If you haven't already, create a storefront.
5.  Under the "Storefront API" section, you will find your credentials. You need:
    *   **Store domain**: It will look like `your-store-name.myshopify.com`.
    *   **Public Storefront API token**.

### Step 2: Get Customer Account API Credentials

1.  In the **Headless** channel settings, click the **Customer Account API** tab.
2.  You will find the **Client ID** and the **Customer Account API URL**.

### Step 3: Configure Environment Variables

1.  In the root of your project (`/Users/vnhcmlap-0093/cyborgs/hydrogen-ts/`), create a new file named `.env`.
2.  Add the following content to the `.env` file, replacing the placeholder values with the credentials you obtained in the previous steps:

    ```env
    # Storefront API
    PUBLIC_STORE_DOMAIN="your-store-name.myshopify.com"
    PUBLIC_STOREFRONT_API_TOKEN="your-public-storefront-api-token"

    # Customer Account API
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID="your-customer-api-client-id"
    PUBLIC_CUSTOMER_ACCOUNT_API_URL="your-customer-api-url"
    ```

### Step 4: Enable Customer Account API Permissions

For the sign-in feature to work, the Headless sales channel needs permission to access customer data.

1.  Go back to the **Headless** sales channel settings in your Shopify Admin.
2.  Click on the **Storefront API** tab.
3.  Scroll down to the **Customer Account API** permissions section.
4.  Ensure that the permissions for `Read` and `Write` are **checked**.
5.  Click **Save**.

---

## Final Step: Run the Application

Whether you used the CLI or the manual method, you need to restart your development server to apply the new environment variables.

1.  If your server is running, stop it (press `Ctrl + C` in the terminal).
2.  Run the development command:

    ```bash
    npm run dev
    ```

Your sign-in feature should now be fully functional. You can test it by navigating to `/account/login` in your browser.

---

## Troubleshooting

### `redirect_uri mismatch` Error

If you see a `redirect_uri mismatch` error after attempting to log in, it means Shopify does not recognize the callback URL your app is using.

By default, the development server uses `https://localhost:3000`. The full callback URL is `https://localhost:3000/account/authorize`.

**How to Fix:**

1.  **Go to your Shopify Admin.**
2.  Navigate to **Apps and sales channels** > **Headless**.
3.  Click on your storefront to open its settings.
4.  Go to the **Customer Account API** tab.
5.  In the **Callback URLs** section, click **Add callback URL**.
6.  Paste the following URL:
    ```
    https://localhost:3000/account/authorize
    ```
7.  Click **Save**.

After saving, the login process should work correctly on your local machine.