# Custom Checkout UI Extension Guide

This guide will walk you through creating a simple Checkout UI extension for your Shopify store. This extension will display a custom banner on your checkout page.

Please follow these steps carefully.

## Step 1: Install Shopify's Command Line Interface (CLI)

The Shopify CLI is a tool that helps you build Shopify apps and extensions. You'll need to have it installed on your computer.

1.  **Open a terminal or command prompt.**
2.  **Make sure you have Node.js installed.** You can check by typing `node -v`. If you don't have it, please install it from [nodejs.org](https://nodejs.org/).
3.  **Install the Shopify CLI** by running this command:

    ```bash
    npm install -g @shopify/cli
    ```

## Step 2: Generate a New Extension

Now, we'll use the Shopify CLI to generate the files for your new extension.

1.  **Navigate to your project's root directory** in your terminal.
2.  **Run the following command** to start the extension generation process:

    ```bash
    shopify app generate extension
    ```

3.  **The CLI will ask you a few questions:**
    *   It will first ask you to log in to your Shopify account. Please follow the on-screen instructions to log in.
    *   When it asks for the type of extension, choose **"Checkout UI Extension"**.
    *   When it asks for the name of your extension, you can name it something like **"My Custom Checkout Banner"**.

    The CLI will create a new directory for your extension, usually in an `extensions` folder within your project.

## Step 3: Add the Custom Code

Now, we will replace the default code with the custom code for our banner.

1.  **Navigate into the new extension directory** that the CLI created. It will be something like `extensions/my-custom-checkout-banner`.
2.  **You will find a `src` directory inside.** Open the `src` directory.
3.  **Replace the content of `src/index.js` or `src/index.jsx`** with the following code:

    ```jsx
    import React from 'react';
    import {
      render,
      useExtensionApi,
      Banner,
      TextBlock,
    } from '@shopify/checkout-ui-extensions-react';

    render('Checkout::Dynamic::Render', () => <App />);

    function App() {
      const { extensionPoint, settings } = useExtensionApi();
      const { title, content } = settings;

      return (
        <Banner title={title || 'A little something extra'}>
          <TextBlock>
            {content || 'Enjoy free shipping on all orders over $50!'}
          </TextBlock>
        </Banner>
      );
    }
    ```

## Step 4: Deploy the Extension

Now, we need to "upload" the extension to your Shopify store.

1.  **In your terminal, make sure you are in your project's root directory.**
2.  **Run the following command:**

    ```bash
    shopify app deploy
    ```

3.  **The CLI will ask you to confirm the deployment.** It will show you the extensions you are about to deploy. Confirm that your new extension is on the list and proceed.

## Step 5: Enable the Extension in Your Shopify Admin

The final step is to enable the extension on your checkout page.

1.  **Go to your Shopify Admin.**
2.  On the left-hand menu, click on **"Online Store"**, and then **"Themes"**.
3.  On your current theme, click the **"Customize"** button.
4.  **This will open the theme editor.** At the top of the screen, there is a dropdown menu that probably says "Homepage". Click on it and select **"Checkout"**.
5.  **You are now in the checkout editor.** On the left-hand side, you will see a section for "Apps". Click on **"Add app"** or look for your new extension, "My Custom Checkout Banner".
6.  **Click on your extension to add it to the checkout page.** You can drag and drop it to change its position.
7.  **You can customize the title and content** of the banner in the settings on the right-hand side.
8.  **Click the "Save" button** at the top right of the screen.

That's it! Your custom checkout banner should now be visible on your checkout page.

Please let me know if you have any questions at any step of this process.
