// import { useEffect } from 'preact/hooks';
// import { render, useApi } from '@shopify/checkout-ui-extensions-preact';

import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import { useEffect } from 'react';

// Render the extension on the "Thank you" page
// render('Checkout::ThankYou::Render', () => <App />);

// function App() {
//   const { redirect } = useApi();

//   useEffect(() => {
//     // The URL you want to redirect to
//     const redirectUrl = "https://your-domain.com/your-custom-page";

//     redirect.dispatch(redirectUrl);
//   }, [redirect]);

//   // This extension doesn't render anything, so we return null
//   return null;
// }

export default function extension() {
  render(<Extension />, document.body);
}

function Extension() {
  // As of version 2025-10, you no longer need the `useApi` hook.
  // The full API object is accessible via the global `shopify` object.

  // useEffect(() => {

  // }, [shopify.extension.])
  
  return (
    <s-text>
      Shop name: {shopify.shop.name}
    </s-text>
  );
}