import {Link} from 'react-router';

export function FromTheMagazine() {
  return (
    <div style={{
      position: 'relative',
      height: '677px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '70px 90px',
      color: 'white',
      textAlign: 'center',
    }}>
      <img 
        src="/mila-assets/magazine-background.png" 
        alt="Magazine background"
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
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <span style={{font: 'var(--font-caslon-2xs)', textTransform: 'uppercase'}}>from the megazine</span>
        <Link to="/blogs/journal" style={{font: 'var(--font-avenir-xs-all-cap)', textTransform: 'uppercase', color: 'white', textDecoration: 'underline'}}>View All</Link>
      </div>
      <div style={{maxWidth: '646px'}}>
        <p style={{font: 'var(--font-avenir-xs-all-cap)', textTransform: 'uppercase', marginBottom: '20px'}}>may 10, 2022</p>
        <h2 style={{font: 'var(--font-caslon-2xl)', marginBottom: '20px'}}>Our high summer lookbook</h2>
        <Link to="/blogs/journal/" style={{
          display: 'inline-block',
          padding: '18px 30px',
          background: 'white',
          color: 'black',
          textDecoration: 'none',
          font: 'var(--font-avenir-md)',
        }}>Read More</Link>
      </div>
      <div></div>
    </div>
  );
}
