import * as React from 'react';
import {Link} from 'react-router';
import {Section, Container, Grid} from '~/components/layout';
import {Button} from '~/components/ui/button';
import {ProductItem} from '~/components/ProductItem';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';

interface ProductGridSectionProps {
  title?: string;
  description?: string;
  products: Array<
    ProductItemFragment | CollectionItemFragment | RecommendedProductFragment
  >;
  viewAllLink?: string;
  viewAllText?: string;
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'mila';
}

export function ProductGridSection({
  title,
  description,
  products,
  viewAllLink,
  viewAllText = 'View All',
  columns = 3,
  variant = 'default',
}: ProductGridSectionProps) {
  return (
    <Section variant={variant} padding="desktop">
      <Container maxWidth="desktop">
        {/* Section Header */}
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Product Grid */}
        <Grid columns={columns} gap="lg" responsive>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} loading="lazy" />
          ))}
        </Grid>

        {/* View All CTA */}
        {viewAllLink && (
          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link to={viewAllLink}>{viewAllText}</Link>
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
