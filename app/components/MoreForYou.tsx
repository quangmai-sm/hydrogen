import {Link} from 'react-router';

export function MoreForYou() {
  return (
    <div style={{padding: '100px 90px', background: 'var(--color-primary-mila-branding)'}}>
      <h2 style={{font: 'var(--font-caslon-lg)', textAlign: 'center', marginBottom: '40px'}}>More for you. Tango with us.</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
        <div style={{textAlign: 'center'}}>
          <img src="/mila-assets/tango-1.png" alt="Tango with me" style={{width: '100%', marginBottom: '30px'}} />
          <h3 style={{font: 'var(--font-caslon-md)', marginBottom: '10px'}}>Tango with me</h3>
          <p style={{font: 'var(--font-avenir-md)', marginBottom: '30px'}}>Discover the alluring new tropical tango print, inspired by palm trees, beach escapes, & lush tropical settings.</p>
          <Link to="/collections/tango" style={{font: 'var(--font-avenir-md-medium)', textDecoration: 'underline'}}>Shop Tango</Link>
        </div>
        <div style={{textAlign: 'center'}}>
          <img src="/mila-assets/tango-2.png" alt="Tango High Waist Gathered Side Pant" style={{width: '100%', marginBottom: '30px'}} />
          <h3 style={{font: 'var(--font-caslon-md)', marginBottom: '10px'}}>Tango High Waist Gathered Side Pant</h3>
          <p style={{font: 'var(--font-avenir-md)', marginBottom: '30px'}}>If there’s one theme that inspires us the most it’s palm trees, beach escapes and lush tropical settings.</p>
          <Link to="/products/" style={{font: 'var(--font-avenir-md-medium)', textDecoration: 'underline'}}>Shop Now</Link>
        </div>
        <div style={{textAlign: 'center'}}>
          <img src="/mila-assets/tango-3.png" alt="Cross Front Multifit Bra Top" style={{width: '100%', marginBottom: '30px'}} />
          <h3 style={{font: 'var(--font-caslon-md)', marginBottom: '10px'}}>Cross Front Multifit Bra Top</h3>
          <p style={{font: 'var(--font-avenir-md)', marginBottom: '30px'}}>Featuring a luxe V neckline, thick & supportive shoulder straps, & hidden soft cups, this shape offers the perfect amount of lift & support.</p>
          <Link to="/products/" style={{font: 'var(--font-avenir-md-medium)', textDecoration: 'underline'}}>Shop Tango</Link>
        </div>
      </div>
    </div>
  );
}
