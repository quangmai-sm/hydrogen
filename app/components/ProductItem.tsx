import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

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
    >
      <Card>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {image && (
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 400px, 100vw"
            />
          )}
        </CardContent>
        <CardFooter>
          <small>
            <Money data={product.priceRange.minVariantPrice} />
          </small>
        </CardFooter>
      </Card>
    </Link>
  );
}
