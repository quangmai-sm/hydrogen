import React, { useEffect, useState } from 'react';
import {
  render,
  useCartLines,
  useApplyCartLinesChange,
  Banner,
} from '@shopify/ui-extensions-react/checkout';

render('purchase.checkout.block.render', () => <App />);

function App() {
  const lines = useCartLines();
  const applyCartLinesChange = useApplyCartLinesChange();
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    const totalQuantity = lines.reduce((total, line) => total + line.quantity, 0);

    if (totalQuantity >= 5) {
      const cheapestLine = lines.reduce((cheapest, line) => {
        const price = parseFloat(line.cost.amountPerQuantity.amount);
        if (price < parseFloat(cheapest.cost.amountPerQuantity.amount)) {
          return line;
        }
        return cheapest;
      }, lines[0]);

      if (cheapestLine && !discountApplied) {
        applyCartLinesChange({
          type: 'updateCartLine',
          id: cheapestLine.id,
          quantity: cheapestLine.quantity,
          discount: {
            amount: parseFloat(cheapestLine.cost.amountPerQuantity.amount),
            title: 'Free item',
          },
        }).then(() => setDiscountApplied(true));
      }
    } else {
      // Optional: remove discount if quantity drops below 5
      setDiscountApplied(false);
    }
  }, [lines, applyCartLinesChange, discountApplied]);

  return (
    <Banner
      title="my-checkout-extension"
      status={discountApplied ? 'success' : 'info'}
    >
      {discountApplied
        ? 'Congrats! You got one item for free.'
        : 'Add 5 items to your cart to get 1 for free.'}
    </Banner>
  );
}