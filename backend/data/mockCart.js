/**
 * mockCart.js
 * --------------------
 * In-memory mock cart store.
 * Cart is keyed by userId → array of { productId, quantity }.
 * Data resets on server restart (no persistence).
 *
 * Example shape:
 * {
 *   1: [ { productId: 2, quantity: 1 }, { productId: 5, quantity: 3 } ]
 * }
 */

/** @type {Record<number, Array<{ productId: number; quantity: number }>>} */
export const mockCarts = {};

/**
 * Get cart items for a user.
 * @param {number} userId
 */
export const getCart = (userId) => mockCarts[userId] ?? [];

/**
 * Add or update an item in the user's cart.
 * If the product already exists, increments quantity.
 * @param {number} userId
 * @param {number} productId
 * @param {number} quantity
 */
export const upsertCartItem = (userId, productId, quantity = 1) => {
  if (!mockCarts[userId]) mockCarts[userId] = [];
  const existing = mockCarts[userId].find((i) => i.productId === productId);
  if (existing) {
    existing.quantity = Math.max(1, existing.quantity + quantity);
  } else {
    mockCarts[userId].push({ productId, quantity: Math.max(1, quantity) });
  }
};

/**
 * Remove an item from the user's cart.
 * @param {number} userId
 * @param {number} productId
 */
export const removeCartItem = (userId, productId) => {
  if (!mockCarts[userId]) return;
  mockCarts[userId] = mockCarts[userId].filter((i) => i.productId !== productId);
};

/**
 * Clear the entire cart for a user (e.g., after order placement).
 * @param {number} userId
 */
export const clearCart = (userId) => {
  mockCarts[userId] = [];
};
