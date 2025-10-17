import {Await, useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {HeroSection} from '~/components/HeroSection';
import {OurCollections} from '~/components/OurCollections';
import {BlackFridaySale} from '~/components/BlackFridaySale';
import {TheEliteStory} from '~/components/TheEliteStory';
import {LolaShimmer} from '~/components/LolaShimmer';
import {MoreForYou} from '~/components/MoreForYou';
import {FromTheMagazine} from '~/components/FromTheMagazine';

// ... (rest of the file is the same until Homepage component)

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <HeroSection />
      <OurCollections collections={data.featuredCollection} />
      <BlackFridaySale products={data.recommendedProducts} />
      <TheEliteStory />
      <LolaShimmer />
      <MoreForYou />
      <FromTheMagazine />
    </div>
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
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
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