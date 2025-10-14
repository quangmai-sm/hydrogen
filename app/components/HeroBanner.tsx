import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';

interface HeroBannerProps {
  collection?: FeaturedCollectionFragment | null;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: {
    id?: string;
    url: string;
    altText?: string | null;
    width?: number;
    height?: number;
  } | null;
  height?: 'small' | 'medium' | 'large' | 'full';
}

export function HeroBanner({
  collection,
  title,
  description,
  buttonText = 'Shop Now',
  buttonLink,
  image,
  height = 'large',
}: HeroBannerProps) {
  // Use collection data if provided, otherwise use custom props
  const bannerTitle = title || collection?.title;
  const bannerDescription = description || '';
  const bannerImage = image || collection?.image;
  const link = buttonLink || (collection ? `/collections/${collection.handle}` : '#');

  if (!bannerImage || !bannerTitle) return null;

  return (
    <div className={`hero-banner hero-banner-${height}`}>
      <div className="hero-banner-image">
        <Image
          data={bannerImage}
          sizes="100vw"
          loading="eager"
        />
        <div className="hero-banner-overlay" />
      </div>
      <div className="hero-banner-content">
        <div className="hero-banner-text">
          <h1>{bannerTitle}</h1>
          {bannerDescription && <p>{bannerDescription}</p>}
          {buttonText && (
            <Link to={link} className="hero-banner-button">
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
