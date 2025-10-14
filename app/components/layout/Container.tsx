import * as React from 'react';
import {cn} from '~/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'content' | 'narrow' | 'full';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({className, maxWidth = 'desktop', ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 md:px-6',
          {
            'max-w-[375px]': maxWidth === 'mobile',
            'max-w-[768px]': maxWidth === 'tablet',
            'max-w-[1400px]': maxWidth === 'desktop',
            'max-w-[1200px]': maxWidth === 'content',
            'max-w-[800px]': maxWidth === 'narrow',
            'max-w-full': maxWidth === 'full',
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Container.displayName = 'Container';

export {Container};
