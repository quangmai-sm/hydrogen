import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {Card, CardContent} from '~/components/ui/card';

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
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      className="group block"
    >
      <Card className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow duration-200">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {image && (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
        <CardContent className="p-4">
          <h4 className="text-base font-medium text-gray-900 mb-2 line-clamp-2">
            {product.title}
          </h4>
          <div className="text-sm font-semibold text-gray-900">
            <Money data={product.priceRange.minVariantPrice} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
