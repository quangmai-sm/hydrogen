import {Link} from 'react-router';

type WishlistIconProps = {
  count: number;
  className?: string;
};

export function WishlistIcon({count, className = ''}: WishlistIconProps) {
  return (
    <Link
      to="/wishlist"
      className={`wishlist-icon ${className}`}
      aria-label={`Wishlist (${count} items)`}
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count > 0 && <span className="wishlist-badge">{count}</span>}
    </Link>
  );
}
