import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import {Instagram, Facebook, Twitter} from 'lucide-react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-[--color-mila-primary] mt-auto">
            <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-12 md:py-16">
              {/* Footer Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {/* Column 1: Brand */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {header.shop.name}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Premium e-commerce experience with curated collections and
                    exceptional service.
                  </p>
                </div>

                {/* Column 2: Shop Links */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                    Shop
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <NavLink
                        to="/collections"
                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        All Collections
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/products"
                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        All Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/search"
                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        Search
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Customer Service */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                    Customer Service
                  </h4>
                  {footer?.menu && header.shop.primaryDomain?.url && (
                    <FooterMenu
                      menu={footer.menu}
                      primaryDomainUrl={header.shop.primaryDomain.url}
                      publicStoreDomain={publicStoreDomain}
                    />
                  )}
                </div>

                {/* Column 4: Social & Newsletter */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                    Connect
                  </h4>
                  <div className="flex gap-4 mb-6">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Subscribe to our newsletter
                  </p>
                  <form className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="mt-12 pt-8 border-t border-gray-300">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-gray-700">
                    &copy; {new Date().getFullYear()} {header.shop.name}. All
                    rights reserved.
                  </p>
                  <div className="flex gap-6">
                    <NavLink
                      to="/policies/privacy-policy"
                      className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Privacy
                    </NavLink>
                    <NavLink
                      to="/policies/terms-of-service"
                      className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Terms
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <ul className="space-y-3">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <li key={item.id}>
            <a
              href={url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              {item.title}
            </a>
          </li>
        ) : (
          <li key={item.id}>
            <NavLink
              end
              prefetch="intent"
              to={url}
              className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              {item.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
