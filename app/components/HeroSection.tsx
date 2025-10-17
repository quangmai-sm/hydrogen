import {Link} from 'react-router';

export function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      height: '800px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
    }}>
      <img 
        src="/mila-assets/hero-background.png" 
        alt="Swimwear model"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <div>
        <h2 style={{font: 'var(--font-avenir-xs-all-cap)', textTransform: 'uppercase'}}>Swimwear</h2>
        <h1 style={{font: 'var(--font-caslon-2xl)'}}>Maximum impact</h1>
        <p style={{font: 'var(--font-avenir-xl)'}}>Shop our collection of glamorous swimsuits and mix-and-match bikinis.</p>
        <Link to="/collections/all" style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '18px 30px',
          background: 'white',
          color: 'black',
          textDecoration: 'none',
          font: 'var(--font-avenir-md)',
        }}>Shop New Arrivals</Link>
      </div>
    </div>
  );
}
