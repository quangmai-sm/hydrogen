import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {image && (
        <div style={{
          overflow: 'hidden',
          marginBottom: '1rem',
          borderRadius: '2px'
        }}>
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
          />
        </div>
      )}
      <h4 style={{
        fontSize: '1rem',
        fontWeight: '400',
        marginBottom: '0.5rem',
        fontFamily: "'Playfair Display', Georgia, serif",
        letterSpacing: '0.01em',
      }}>
        {product.title}
      </h4>
      <div style={{
        fontSize: '0.875rem',
        color: '#8B8B8B',
        letterSpacing: '0.02em',
      }}>
        <Money data={product.priceRange.minVariantPrice} />
      </div>
    </Link>
  );
}
