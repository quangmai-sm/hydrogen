import { XIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AnnouncementBarProps {
  message: string;
  dismissible?: boolean;
  storageKey?: string;
  className?: string;
}

export function AnnouncementBar({
  message,
  dismissible = false,
  storageKey = 'announcement-dismissed',
  className = '',
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (dismissible && typeof window !== 'undefined') {
      const dismissed = localStorage.getItem(storageKey);
      if (dismissed === 'true') {
        setIsVisible(false);
      }
    }
  }, [dismissible, storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined' && storageKey) {
      localStorage.setItem(storageKey, 'true');
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`relative flex items-center justify-center bg-mila-primary px-4 py-2.5 ${className}`}
    >
      <p className="text-center text-sm text-gray-800">{message}</p>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          aria-label="Dismiss announcement"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
}
