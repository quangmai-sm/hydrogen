import {useLoaderData, Link, useFetcher, data} from 'react-router';
import type {Route} from './+types/wishlist';
import {WISHLIST_QUERY} from '~/lib/fragments';
import {Money, Image} from '@shopify/hydrogen';
import type {WishlistItemsQuery} from 'storefrontapi.generated';
import {Button} from '~/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [{title: 'My Wishlist'}];
};

export async function loader({context}: Route.LoaderArgs) {
  const {wishlist, storefront} = context;

  const variantIds = wishlist.getAll();

  // If wishlist is empty, return early
  if (variantIds.length === 0) {
    return {items: []};
  }

  // Fetch product details for all wishlist items
  const {nodes} = await storefront.query<WishlistItemsQuery>(WISHLIST_QUERY, {
    variables: {
      ids: variantIds,
    },
    cache: storefront.CacheShort(),
  });

  // Filter out any null entries (in case variant was deleted)
  const items = nodes.filter(
    (node): node is NonNullable<typeof node> => node !== null,
  );

  return {items};
}

export async function action({request, context}: Route.ActionArgs) {
  const {wishlist, session, cart} = context;

  const formData = await request.formData();
  const actionType = formData.get('action');
  const variantId = formData.get('variantId');

  if (!variantId || typeof variantId !== 'string') {
    return data({error: 'Invalid variant ID'}, {status: 400});
  }

  switch (actionType) {
    case 'remove':
      wishlist.remove(variantId);
      break;
    case 'addToCart':
      // Add to cart and remove from wishlist
      await cart.addLines([{merchandiseId: variantId, quantity: 1}]);
      wishlist.remove(variantId);
      break;
    default:
      return data({error: 'Invalid action'}, {status: 400});
  }

  return data(
    {success: true},
    {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    },
  );
}

export default function Wishlist() {
  const {items} = useLoaderData<typeof loader>();

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {items.length === 0 ? (
        <WishlistEmpty />
      ) : (
        <div className="wishlist-grid">
          {items.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function WishlistEmpty() {
  return (
    <div className="wishlist-empty">
      <p>Your wishlist is empty</p>
      <Link to="/collections/all">Continue Shopping</Link>
    </div>
  );
}

function WishlistItem({
  item,
}: {
  item: NonNullable<WishlistItemsQuery['nodes'][number]>;
}) {
  const fetcher = useFetcher();
  const isRemoving = fetcher.formData?.get('action') === 'remove';
  const isAddingToCart = fetcher.formData?.get('action') === 'addToCart';

  if (!item.product || !item.image) {
    return null;
  }

  return (
    <div className="wishlist-item" style={{opacity: isRemoving ? 0.5 : 1}}>
      <Link to={`/products/${item.product.handle}`}>
        <Image data={item.image} aspectRatio="1/1" sizes="(min-width: 45em) 20vw, 50vw" />
      </Link>

      <div className="wishlist-item-details">
        <Link to={`/products/${item.product.handle}`}>
          <h3>{item.product.title}</h3>
        </Link>

        {item.selectedOptions.length > 1 && (
          <p className="wishlist-item-variant">
            {item.selectedOptions
              .map((option) => option.value)
              .filter((value) => value !== 'Default Title')
              .join(' / ')}
          </p>
        )}

        <div className="wishlist-item-price">
          <Money data={item.price} />
          {item.compareAtPrice && (
            <Money
              data={item.compareAtPrice}
              className="wishlist-item-compare-price"
            />
          )}
        </div>

        <div className="wishlist-item-actions">
          <fetcher.Form method="post">
            <input type="hidden" name="variantId" value={item.id} />
            <Button
              type="submit"
              name="action"
              value="addToCart"
              disabled={!item.availableForSale || isAddingToCart}
            >
              {isAddingToCart
                ? 'Adding...'
                : !item.availableForSale
                  ? 'Sold Out'
                  : 'Add to Cart'}
            </Button>
          </fetcher.Form>

          <fetcher.Form method="post">
            <input type="hidden" name="variantId" value={item.id} />
            <Button
              variant="outline"
              type="submit"
              name="action"
              value="remove"
              disabled={isRemoving}
              className="wishlist-remove-btn"
            >
              {isRemoving ? 'Removing...' : 'Remove'}
            </Button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
