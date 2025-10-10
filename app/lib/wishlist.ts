import type {AppSession} from '~/lib/session';

const WISHLIST_SESSION_KEY = 'wishlist';

export type WishlistItem = string; // Product variant ID

/**
 * Wishlist utility class for managing wishlist items in session
 * Stores variant IDs and provides methods to add, remove, and check items
 */
export class Wishlist {
  #session: AppSession;

  constructor(session: AppSession) {
    this.#session = session;
  }

  /**
   * Get all wishlist items (variant IDs)
   */
  getAll(): WishlistItem[] {
    const items = this.#session.get(WISHLIST_SESSION_KEY);
    return Array.isArray(items) ? (items as string[]) : [];
  }

  /**
   * Check if a variant is in the wishlist
   */
  has(variantId: string): boolean {
    const items = this.getAll();
    return items.includes(variantId);
  }

  /**
   * Add a variant to the wishlist
   */
  add(variantId: string): void {
    const items = this.getAll();
    if (!items.includes(variantId)) {
      items.push(variantId);
      this.#session.set(WISHLIST_SESSION_KEY, items);
    }
  }

  /**
   * Remove a variant from the wishlist
   */
  remove(variantId: string): void {
    const items = this.getAll();
    const filtered = items.filter((id) => id !== variantId);
    this.#session.set(WISHLIST_SESSION_KEY, filtered);
  }

  /**
   * Clear all wishlist items
   */
  clear(): void {
    this.#session.set(WISHLIST_SESSION_KEY, []);
  }

  /**
   * Get the count of wishlist items
   */
  count(): number {
    return this.getAll().length;
  }

  /**
   * Toggle a variant in the wishlist
   * Returns true if added, false if removed
   */
  toggle(variantId: string): boolean {
    if (this.has(variantId)) {
      this.remove(variantId);
      return false;
    } else {
      this.add(variantId);
      return true;
    }
  }
}
