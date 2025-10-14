import type {ReactNode} from 'react';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  background?: 'default' | 'mila' | 'white';
  padding?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Section({
  children,
  title,
  subtitle,
  background = 'default',
  padding = 'medium',
  className = '',
}: SectionProps) {
  return (
    <section className={`section section-bg-${background} section-padding-${padding} ${className}`}>
      <div className="section-container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="section-content">{children}</div>
      </div>
    </section>
  );
}
