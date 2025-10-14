import * as React from 'react';
import {cn} from '~/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  responsive?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {className, columns = 3, gap = 'md', responsive = true, ...props},
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          {
            // Gap sizes
            'gap-2': gap === 'xs',
            'gap-3': gap === 'sm',
            'gap-5': gap === 'md',
            'gap-8': gap === 'lg',
            'gap-12': gap === 'xl',
            'gap-16': gap === '2xl',
            // Responsive columns (mobile 1, tablet 2, desktop full)
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3':
              responsive && columns === 3,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-4':
              responsive && columns === 4,
            'grid-cols-1 md:grid-cols-2': responsive && columns === 2,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-5':
              responsive && columns === 5,
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-6':
              responsive && columns === 6,
            // Fixed columns (no responsive)
            'grid-cols-1': !responsive && columns === 1,
            'grid-cols-2': !responsive && columns === 2,
            'grid-cols-3': !responsive && columns === 3,
            'grid-cols-4': !responsive && columns === 4,
            'grid-cols-5': !responsive && columns === 5,
            'grid-cols-6': !responsive && columns === 6,
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';

export {Grid};
