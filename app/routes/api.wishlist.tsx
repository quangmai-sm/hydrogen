import {json} from 'react-router';
import type {Route} from './+types/api.wishlist';

export async function loader({context}: Route.LoaderArgs) {
  const {wishlist, session} = context;

  const items = wishlist.getAll();
  const count = wishlist.count();

  return json(
    {items, count},
    {
      headers: session.isPending
        ? {'Set-Cookie': await session.commit()}
        : {},
    },
  );
}

export async function action({request, context}: Route.ActionArgs) {
  const {wishlist, session} = context;

  const formData = await request.formData();
  const action = formData.get('action');
  const variantId = formData.get('variantId');

  if (!variantId || typeof variantId !== 'string') {
    return json({error: 'Invalid variant ID'}, {status: 400});
  }

  let added = false;

  switch (action) {
    case 'add':
      wishlist.add(variantId);
      added = true;
      break;
    case 'remove':
      wishlist.remove(variantId);
      added = false;
      break;
    case 'toggle':
      added = wishlist.toggle(variantId);
      break;
    default:
      return json({error: 'Invalid action'}, {status: 400});
  }

  return json(
    {
      success: true,
      added,
      count: wishlist.count(),
      items: wishlist.getAll(),
    },
    {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    },
  );
}
