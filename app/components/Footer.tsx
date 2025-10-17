import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
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
          <footer className="footer" style={{backgroundColor: 'var(--color-primary-mila-branding)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '50px 20px'}}>
              <div style={{maxWidth: '300px'}}>
                <h3 style={{fontWeight: 'bold', marginBottom: '20px'}}>Talk about your store</h3>
                <p style={{marginBottom: '20px'}}>Sea Level Swim features an extensive selection of precision contouring and body moulded swimsuits made from regenerated nylon. The result is a beautiful line up of luxurious high quality pieces that feel right for the times and designed to last.This is a demonstration of the Showcase theme for Shopify. Swimwear kindly donated by Sea Level Swim.</p>
                <img src="/mila-assets/image-2.png" alt="Store image" />
              </div>
              <div>
                <h3 style={{fontWeight: 'bold', marginBottom: '20px'}}>Shop</h3>
                {footer?.menu && header.shop.primaryDomain?.url && (
                  <FooterMenu
                    menu={footer.menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                )}
              </div>
              <div>
                <h3 style={{fontWeight: 'bold', marginBottom: '20px'}}>Help</h3>
                {footer?.menu && header.shop.primaryDomain?.url && (
                  <FooterMenu
                    menu={footer.menu} // Using the same menu for now
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                )}
              </div>
              <div>
                <h3 style={{fontWeight: 'bold', marginBottom: '20px'}}>Newsletter</h3>
                <p style={{marginBottom: '20px'}}>Sign up for our newsletter to only receive good things.</p>
                <div style={{display: 'flex', borderBottom: '1px solid black'}}>
                  <input type="email" placeholder="Enter email" style={{background: 'transparent', border: 'none', flexGrow: 1}} />
                  <button type="submit"><img src="/mila-assets/arrow-right.svg" alt="Submit" /></button>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '20px', borderTop: '1px solid var(--color-primary-gray-200)'}}>
              <div>
                <span>United Kingdom (GBP £)</span>
                <img src="/mila-assets/caret-down.svg" alt="" style={{display: 'inline-block'}}/>
              </div>
              <div>© 2023 mila. Powered by Shopify</div>
              <div style={{display: 'flex', gap: '10px'}}>
                <img src="/mila-assets/payment-amex.svg" alt="Amex" />
                <img src="/mila-assets/payment-apple-pay.svg" alt="Apple Pay" />
                <img src="/mila-assets/payment-diners-club.svg" alt="Diners Club" />
                <img src="/mila-assets/payment-discover.svg" alt="Discover" />
                <img src="/mila-assets/payment-google-pay.svg" alt="Google Pay" />
                <img src="/mila-assets/payment-mastercard.svg" alt="Mastercard" />
                <img src="/mila-assets/payment-unionpay.svg" alt="UnionPay" />
                <img src="/mila-assets/payment-visa.svg" alt="Visa" />
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
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
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

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
