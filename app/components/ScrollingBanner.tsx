interface ScrollingBannerProps {
  text: string;
  repetitions?: number;
  speed?: number;
  backgroundImage?: string;
  className?: string;
}

export function ScrollingBanner({
  text,
  repetitions = 4,
  speed = 30,
  backgroundImage,
  className = '',
}: ScrollingBannerProps) {
  const repeatedText = Array.from({ length: repetitions }, (_, i) => (
    <span key={i} className="inline-flex items-center gap-8 px-4">
      {text}
    </span>
  ));

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="scrolling-banner flex whitespace-nowrap py-8">
        <div
          className="animate-scroll flex font-avenir-next text-6xl font-medium uppercase text-white md:text-8xl"
          style={
            {
              '--scroll-speed': `${speed}s`,
            } as React.CSSProperties
          }
        >
          {repeatedText}
        </div>
        <div
          className="animate-scroll flex font-avenir-next text-6xl font-medium uppercase text-white md:text-8xl"
          style={
            {
              '--scroll-speed': `${speed}s`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          {repeatedText}
        </div>
      </div>
    </div>
  );
}
