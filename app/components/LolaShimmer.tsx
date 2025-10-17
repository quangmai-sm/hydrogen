import {Link} from 'react-router';

export function LolaShimmer() {
  return (
    <div style={{display: 'flex', padding: '100px 156px', gap: '30px', background: 'var(--color-primary-mila-branding)'}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
        <div style={{marginBottom: '14px'}}>
          <img src="/mila-assets/stars.svg" alt="Stars" />
        </div>
        <h2 style={{font: 'var(--font-caslon-lg)', marginBottom: '14px'}}>Lola Shimmer</h2>
        <p style={{font: 'var(--font-avenir-md)', marginBottom: '16px'}}>Explore the luxe details of our new Lola Shimmer collection, which features a cross trim detail that flatters & contours.</p>
        <Link to="/collections/lola-shimmer" style={{
          display: 'inline-block',
          padding: '18px 30px',
          border: '1px solid black',
          color: 'black',
          textDecoration: 'none',
          font: 'var(--font-avenir-md)',
        }}>Shop the collection</Link>
      </div>
      <div style={{flex: 1}}>
        <img src="/mila-assets/lola-shimmer.png" alt="Lola Shimmer" style={{width: '100%'}} />
        <p style={{font: 'var(--font-avenir-md-medium)', textAlign: 'center', marginTop: '15px'}}>Lola Shimmer Tank Style One Piece</p>
      </div>
    </div>
  );
}
