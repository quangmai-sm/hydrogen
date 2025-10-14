import {Await, useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {BannerSection} from '~/components/sections/BannerSection';
import {ProductGridSection} from '~/components/sections/ProductGridSection';
import {Section, Container} from '~/components/layout';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      {/* Hero Banner */}
      <FeaturedCollection collection={data.featuredCollection} />

      {/* Recommended Products Section */}
      <RecommendedProducts products={data.recommendedProducts} />

      {/* Featured Content Section */}
      <Section variant="mila" padding="desktop">
        <Container maxWidth="narrow">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in creating timeless pieces that celebrate individuality
              and craftsmanship. Every product is thoughtfully curated to bring
              joy and quality to your everyday life.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <BannerSection
      title={collection.title}
      subtitle="Discover our latest collection"
      ctaText="Shop Now"
      ctaLink={`/collections/${collection.handle}`}
      backgroundImage={image?.url}
      height="hero"
      textAlignment="center"
      overlay={true}
    />
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <Suspense
      fallback={
        <Section variant="default" padding="desktop">
          <Container maxWidth="desktop">
            <div className="text-center">
              <div className="text-gray-500">Loading products...</div>
            </div>
          </Container>
        </Section>
      }
    >
      <Await resolve={products}>
        {(response) => {
          if (!response?.products?.nodes?.length) return null;
          return (
            <ProductGridSection
              title="Recommended Products"
              description="Handpicked selections just for you"
              products={response.products.nodes}
              viewAllLink="/collections/all"
              viewAllText="View All Products"
              columns={4}
              variant="default"
            />
          );
        }}
      </Await>
    </Suspense>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
