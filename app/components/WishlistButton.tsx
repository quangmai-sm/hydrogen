import {useFetcher} from 'react-router';
import {useEffect, useState} from 'react';
import {Button} from '~/components/ui/button';

type WishlistButtonProps = {
  variantId: string;
  productId?: string;
  initialIsInWishlist?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function WishlistButton({
  variantId,
  initialIsInWishlist = false,
  className = '',
  size = 'md',
}: WishlistButtonProps) {
  const fetcher = useFetcher<{added?: boolean}>();
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);

  // Update state based on fetcher data
  useEffect(() => {
    if (fetcher.data && typeof fetcher.data.added === 'boolean') {
      setIsInWishlist(fetcher.data.added);
    }
  }, [fetcher.data]);

  // Optimistic update
  const optimisticIsInWishlist =
    fetcher.formData?.get('action') === 'toggle'
      ? !isInWishlist
      : isInWishlist;

  const isLoading = fetcher.state !== 'idle';

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <fetcher.Form method="post" action="/api/wishlist">
      <input type="hidden" name="variantId" value={variantId} />
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        name="action"
        value="toggle"
        disabled={isLoading}
        className={`wishlist-button ${className}`}
        aria-label={
          optimisticIsInWishlist
            ? 'Remove from wishlist'
            : 'Add to wishlist'
        }
      >
        <svg
          className={sizeClasses[size]}
          viewBox="0 0 24 24"
          fill={optimisticIsInWishlist ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'all 0.2s ease',
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </Button>
    </fetcher.Form>
  );
}
