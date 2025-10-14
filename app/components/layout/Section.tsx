import * as React from 'react';
import {cn} from '~/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'mila' | 'dark' | 'image';
  padding?: 'none' | 'mobile' | 'desktop' | 'sm' | 'lg';
  as?: 'section' | 'div' | 'article' | 'aside';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'desktop',
      as: Component = 'section',
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          'w-full',
          {
            'bg-white': variant === 'default',
            'bg-[--color-mila-primary]': variant === 'mila',
            'bg-gray-900 text-white': variant === 'dark',
            'relative bg-cover bg-center': variant === 'image',
            'py-0': padding === 'none',
            'py-[50px]': padding === 'mobile',
            'py-[50px] md:py-[90px]': padding === 'desktop',
            'py-[30px]': padding === 'sm',
            'py-[120px]': padding === 'lg',
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Section.displayName = 'Section';

export {Section};
