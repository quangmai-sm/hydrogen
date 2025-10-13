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
      className="product-item group block"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <div className="overflow-hidden mb-4 bg-gray-50">
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="transition-transform duration-400 ease-in-out group-hover:scale-105"
          />
        </div>
      )}
      <h4 className="text-base font-serif mb-2 tracking-tight">{product.title}</h4>
      <div className="text-sm text-gray-600">
        <Money data={product.priceRange.minVariantPrice} />
      </div>
    </Link>
  );
}
