import * as React from 'react';
import {Link} from 'react-router';
import {cn} from '~/lib/utils';
import {Button} from '~/components/ui/button';
import {Section, Container} from '~/components/layout';

interface FeatureSectionProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  imagePosition?: 'left' | 'right';
  variant?: 'default' | 'mila';
  className?: string;
}

export function FeatureSection({
  title,
  description,
  imageUrl,
  imageAlt = '',
  ctaText,
  ctaLink,
  imagePosition = 'left',
  variant = 'default',
  className,
}: FeatureSectionProps) {
  return (
    <Section variant={variant} padding="desktop" className={className}>
      <Container maxWidth="desktop">
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center',
            {
              'md:flex-row-reverse': imagePosition === 'right',
            },
          )}
        >
          {/* Image */}
          {imageUrl && (
            <div
              className={cn('order-1', {
                'md:order-2': imagePosition === 'right',
                'md:order-1': imagePosition === 'left',
              })}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className={cn('order-2', {
              'md:order-1': imagePosition === 'right',
              'md:order-2': imagePosition === 'left',
            })}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {description}
            </p>
            {ctaText && ctaLink && (
              <Button asChild variant="default" size="lg">
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
