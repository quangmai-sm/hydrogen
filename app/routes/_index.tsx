import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';

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
    context.storefront.query(HERO_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    heroCollection: collections.nodes[0],
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

  const featuredCollections = context.storefront
    .query(FEATURED_COLLECTIONS_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
    featuredCollections,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <HeroSection collection={data.heroCollection} />
      <FeaturedProducts products={data.recommendedProducts} />
      <ImageWithText />
      <FeaturedCollections collections={data.featuredCollections} />
      <Newsletter />
    </div>
  );
}

// Hero Section - Large image with centered text (Dawn style)
function HeroSection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="hero-section relative block"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="hero-image relative w-full" style={{height: '600px'}}>
          <Image
            data={image}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-3xl">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {collection.title}
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
            Discover timeless pieces for every occasion
          </p>
          <span className="inline-block bg-white text-black px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors">
            Shop Now
          </span>
        </div>
      </div>
    </Link>
  );
}

// Featured Products Section
function FeaturedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Handpicked favorites to elevate your style
          </p>
        </div>
        <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-96 rounded" />
          ))}
        </div>}>
          <Await resolve={products}>
            {(response) => (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {response
                  ? response.products.nodes.map((product) => (
                      <ProductItem key={product.id} product={product} loading="lazy" />
                    ))
                  : null}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

// Image with Text Section (Dawn style)
function ImageWithText() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Crafted with Care
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Every piece in our collection is thoughtfully designed and crafted
              with attention to detail. We believe in creating products that stand
              the test of time, both in style and quality.
            </p>
            <Link
              to="/collections/all"
              className="inline-block border-2 border-black text-black px-8 py-3 font-medium hover:bg-black hover:text-white transition-all"
            >
              Explore Our Story
            </Link>
          </div>
          <div className="order-1 md:order-2 h-96 bg-gray-200 rounded overflow-hidden">
            <img
              src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Featured Collections Grid
function FeaturedCollections({
  collections,
}: {
  collections: Promise<{collections: {nodes: FeaturedCollectionFragment[]}} | null>;
}) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Explore our curated collections
          </p>
        </div>
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-80 rounded" />
          ))}
        </div>}>
          <Await resolve={collections}>
            {(response) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {response && response.collections.nodes.map((collection) => (
                  <Link
                    key={collection.id}
                    to={`/collections/${collection.handle}`}
                    className="group relative block overflow-hidden rounded bg-gray-100 h-80"
                  >
                    {collection.image && (
                      <Image
                        data={collection.image}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold">
                        {collection.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

// Newsletter Section
function Newsletter() {
  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay in the Loop
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 text-black rounded-none focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            className="bg-white text-black px-8 py-4 font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

const HERO_COLLECTION_QUERY = `#graphql
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
  query HeroCollection($country: CountryCode, $language: LanguageCode)
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

const FEATURED_COLLECTIONS_QUERY = `#graphql
  fragment FeaturedCollectionItem on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query FeaturedCollections($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 3, sortKey: UPDATED_AT) {
      nodes {
        ...FeaturedCollectionItem
      }
    }
  }
` as const;
