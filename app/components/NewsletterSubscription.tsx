import { Form, useActionData } from 'react-router';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

interface NewsletterSubscriptionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export function NewsletterSubscription({
  title = 'Subscribe to our newsletter',
  subtitle = 'Get the latest updates on new products and upcoming sales',
  backgroundImage,
  className = '',
}: NewsletterSubscriptionProps) {
  const actionData = useActionData<{ success?: boolean; error?: string }>();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-2xl px-4 py-16 text-center md:py-24">
        <p className="mb-2 text-xs uppercase tracking-widest text-white">
          {title}
        </p>
        <h2 className="mb-6 font-big-caslon text-4xl font-medium tracking-wide text-white md:text-5xl">
          {subtitle}
        </h2>
        <Form method="post" className="mx-auto max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/90 backdrop-blur-sm"
              aria-label="Email address"
            />
            <Button
              type="submit"
              variant="default"
              className="whitespace-nowrap bg-white text-gray-900 hover:bg-gray-100"
            >
              Subscribe
            </Button>
          </div>
          {actionData?.success && (
            <p className="mt-3 text-sm text-white">
              Thank you for subscribing!
            </p>
          )}
          {actionData?.error && (
            <p className="mt-3 text-sm text-red-200">{actionData.error}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
