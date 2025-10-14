import * as React from 'react';
import {Link} from 'react-router';
import {cn} from '~/lib/utils';
import {Button} from '~/components/ui/button';
import {Section, Container} from '~/components/layout';

interface BannerSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  height?: 'default' | 'hero' | 'short';
  textAlignment?: 'left' | 'center' | 'right';
  overlay?: boolean;
  className?: string;
}

export function BannerSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  height = 'default',
  textAlignment = 'center',
  overlay = true,
  className,
}: BannerSectionProps) {
  return (
    <Section variant="image" padding="none" className={className}>
      <div
        className={cn(
          'relative flex items-center justify-center',
          {
            'h-[510px] md:h-[800px]': height === 'hero',
            'h-[400px] md:h-[600px]': height === 'default',
            'h-[300px] md:h-[400px]': height === 'short',
          },
        )}
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {backgroundColor: 'var(--color-mila-primary)'}
        }
      >
        {/* Overlay */}
        {overlay && backgroundImage && (
          <div className="absolute inset-0 bg-black/30" />
        )}

        {/* Content */}
        <Container maxWidth="desktop" className="relative z-10">
          <div
            className={cn('flex flex-col gap-6', {
              'items-start text-left': textAlignment === 'left',
              'items-center text-center': textAlignment === 'center',
              'items-end text-right': textAlignment === 'right',
            })}
          >
            <h1
              className={cn(
                'text-4xl md:text-6xl font-bold max-w-3xl',
                backgroundImage ? 'text-white' : 'text-gray-900',
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  'text-lg md:text-xl max-w-2xl',
                  backgroundImage ? 'text-white' : 'text-gray-700',
                )}
              >
                {subtitle}
              </p>
            )}
            {ctaText && ctaLink && (
              <Button
                asChild
                size="lg"
                variant={backgroundImage ? 'default' : 'outline'}
                className="mt-4"
              >
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            )}
          </div>
        </Container>
      </div>
    </Section>
  );
}
