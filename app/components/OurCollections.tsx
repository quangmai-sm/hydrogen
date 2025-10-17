import {Link} from 'react-router';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function OurCollections({
  collections,
}: {
  collections: FeaturedCollectionFragment[];
}) {
  return (
    <div style={{padding: '50px 20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '34px'}}>
        <h2 style={{font: 'var(--font-caslon-lg)'}}>Our Collections</h2>
        <Link to="/collections" style={{font: 'var(--font-avenir-md-medium)', textDecoration: 'underline'}}>View all</Link>
      </div>
      <div style={{display: 'flex', gap: '20px', overflowX: 'auto'}}>
        {collections.map((collection) => (
          <Link to={`/collections/${collection.handle}`} key={collection.id} style={{flex: '0 0 280px'}}>
            {collection.image && (
              <Image data={collection.image} aspectRatio="1/1" sizes="(min-width: 45em) 400px, 100vw" />
            )}
            <h3 style={{font: 'var(--font-caslon-lg)', textAlign: 'center', marginTop: '14px'}}>{collection.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
