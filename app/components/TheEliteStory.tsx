import {Link} from 'react-router';

export function TheEliteStory() {
  return (
    <div style={{display: 'flex', padding: '100px 156px', gap: '30px'}}>
      <div style={{flex: 1}}>
        <img src="/mila-assets/elite-story.png" alt="The Elite Story" style={{width: '100%'}} />
        <p style={{font: 'var(--font-avenir-md-medium)', textAlign: 'center', marginTop: '15px'}}>Elite Spliced Multifit One Piece</p>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
        <div style={{marginBottom: '14px'}}>
          <img src="/mila-assets/stars.svg" alt="Stars" />
        </div>
        <h2 style={{font: 'var(--font-caslon-lg)', marginBottom: '14px'}}>The Elite Story</h2>
        <p style={{font: 'var(--font-avenir-md)', marginBottom: '16px'}}>Discover our Elite Spliced Multifit One Piece, featuring removable soft cups, adjustable & convertible straps, & our signature powermesh support front & back.</p>
        <Link to="/products/" style={{
          display: 'inline-block',
          padding: '18px 30px',
          border: '1px solid black',
          color: 'black',
          textDecoration: 'none',
          font: 'var(--font-avenir-md)',
        }}>Shop Elite One Piece</Link>
      </div>
    </div>
  );
}
