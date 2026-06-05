/**
 * mockOrders.js
 * --------------------
 * In-memory mock order store.
 * Orders are stored in a flat array and filtered per user.
 * Data resets on server restart (no persistence).
 */

/** @type {Array<import('./mockOrders').Order>} */
export const mockOrders = [
  {
    id: "ORD-001",
    userId: 1,
    items: [
      { productId: 1, name: "Smartphone Pro X",         quantity: 1, price: 79999 },
      { productId: 2, name: "Wireless Headphones",      quantity: 1, price: 22999 },
    ],
    total: 102998,
    status: "Delivered",
    paymentMethod: "Credit Card",
    address: {
      name: "Test User",
      line1: "123 MG Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      phone: "9876543210",
    },
    placedAt: "2025-05-20T10:30:00.000Z",
    deliveredAt: "2025-05-25T14:00:00.000Z",
  },
  {
    id: "ORD-002",
    userId: 1,
    items: [
      { productId: 4, name: "Home Espresso Machine", quantity: 1, price: 34999 },
    ],
    total: 34999,
    status: "Processing",
    paymentMethod: "UPI",
    address: {
      name: "Test User",
      line1: "123 MG Road",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      phone: "9876543210",
    },
    placedAt: "2025-06-01T09:00:00.000Z",
    deliveredAt: null,
  },
];

let orderCounter = mockOrders.length + 1;

/**
 * Get orders for a specific user.
 * @param {number} userId
 */
export const getOrdersByUser = (userId) =>
  mockOrders.filter((o) => o.userId === userId);

/**
 * Place a new order.
 * @param {number} userId
 * @param {object} orderData
 */
export const placeOrder = (userId, orderData) => {
  const newOrder = {
    id: `ORD-${String(orderCounter++).padStart(3, "0")}`,
    userId,
    status: "Processing",
    placedAt: new Date().toISOString(),
    deliveredAt: null,
    ...orderData,
  };
  mockOrders.push(newOrder);
  return newOrder;
};
