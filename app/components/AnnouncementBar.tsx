/**
 * AnnouncementBar Component
 * Displays a promotional message or announcement at the top of the page
 * Based on Mila theme design
 */

export function AnnouncementBar({
  message = 'Free Shipping On Orders Over $75',
}: {
  message?: string;
}) {
  return (
    <div className="announcement-bar">
      <p>{message}</p>
    </div>
  );
}
