import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {Wishlist} from '~/lib/wishlist';

// Define the additional context object factory
// This needs to be a function to access session
function createAdditionalContext(session: AppSession) {
  return {
    // Additional context for custom properties, CMS clients, 3P SDKs, etc.
    // These will be available as both context.propertyName and context.get(propertyContext)
    wishlist: new Wishlist(session),
  } as const;
}

// Automatically augment HydrogenAdditionalContext with the additional context type
type AdditionalContextType = ReturnType<typeof createAdditionalContext>;

declare global {
  interface HydrogenAdditionalContext extends AdditionalContextType {}
}

/**
 * Creates Hydrogen context for React Router 7.9.x
 * Returns HydrogenRouterContextProvider with hybrid access patterns
 * */
export async function createHydrogenRouterContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const hydrogenContext = createHydrogenContext(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      // Or detect from URL path based on locale subpath, cookies, or any other strategy
      i18n: {language: 'EN', country: 'US'},
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
      },
    },
    createAdditionalContext(session),
  );

  return hydrogenContext;
}
