import {Suspense} from 'react';
import {Await} from 'react-router';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';

export function BlackFridaySale({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div style={{padding: '50px 20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '34px'}}>
        <h2 style={{font: 'var(--font-caslon-lg)'}}>Black Friday Sale</h2>
        <a href="/collections/all" style={{font: 'var(--font-avenir-md-medium)', textDecoration: 'underline'}}>View all</a>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(355px, 1fr))', gap: '1.5rem'}}>
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
