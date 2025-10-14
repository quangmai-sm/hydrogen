import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import {Search, User, Menu, ShoppingCart} from 'lucide-react';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {WishlistIcon} from '~/components/WishlistIcon';
import {Badge} from '~/components/ui/badge';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  wishlistCount: number;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
  wishlistCount,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="sticky top-0 z-[var(--z-index-sticky)] bg-white border-b border-gray-200">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div className="flex items-center justify-between h-[84px]">
          {/* Mobile Menu Toggle - Left on Mobile */}
          <div className="flex items-center md:hidden">
            <HeaderMenuMobileToggle />
          </div>

          {/* Logo - Left on Desktop, Center on Mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
            <NavLink
              prefetch="intent"
              to="/"
              className="text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity"
            >
              {shop.name}
            </NavLink>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex flex-1 justify-center">
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
          </div>

          {/* Header CTAs - Right */}
          <HeaderCtas
            isLoggedIn={isLoggedIn}
            cart={cart}
            wishlistCount={wishlistCount}
          />
        </div>
      </div>
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();

  if (viewport === 'mobile') {
    return (
      <nav className="flex flex-col gap-6 py-6" role="navigation">
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          to="/"
          className={({isActive}) =>
            `text-lg ${isActive ? 'font-semibold' : 'font-normal'} hover:opacity-80 transition-opacity`
          }
        >
          Home
        </NavLink>
        {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
          if (!item.url) return null;

          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          return (
            <NavLink
              end
              key={item.id}
              onClick={close}
              prefetch="intent"
              to={url}
              className={({isActive}) =>
                `text-lg ${isActive ? 'font-semibold' : 'font-normal'} hover:opacity-80 transition-opacity`
              }
            >
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-8" role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            to={url}
            className={({isActive}) =>
              `text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'} hover:text-gray-900 transition-colors`
            }
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
  wishlistCount,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart' | 'wishlistCount'>) {
  return (
    <nav className="flex items-center gap-4 md:gap-6" role="navigation">
      <SearchToggle />
      <div className="hidden md:block">
        <WishlistIcon count={wishlistCount} />
      </div>
      <AccountLink isLoggedIn={isLoggedIn} />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="p-2 -ml-2 hover:bg-gray-100 rounded-md transition-colors"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
      onClick={() => open('search')}
      aria-label="Search"
    >
      <Search className="w-5 h-5" />
    </button>
  );
}

function AccountLink({isLoggedIn}: {isLoggedIn: Promise<boolean>}) {
  return (
    <NavLink
      prefetch="intent"
      to="/account"
      className="hidden md:flex p-2 hover:bg-gray-100 rounded-md transition-colors"
      aria-label="Account"
    >
      <Suspense fallback={<User className="w-5 h-5" />}>
        <Await resolve={isLoggedIn} errorElement={<User className="w-5 h-5" />}>
          {() => <User className="w-5 h-5" />}
        </Await>
      </Suspense>
    </NavLink>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="relative p-2 hover:bg-gray-100 rounded-md transition-colors"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      aria-label={`Cart with ${count ?? 0} items`}
    >
      <ShoppingCart className="w-5 h-5" />
      {count !== null && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};
