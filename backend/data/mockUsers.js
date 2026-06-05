/**
 * mockUsers.js — Mock User Store
 * ================================
 * ✅ MOCK DATA MODE — No database, no bcrypt.
 * ✅ Plain-text passwords for local development only.
 * ✅ Data resets on server restart (by design).
 *
 * Pre-seeded accounts:
 *   test@gmail.com    / 123456   (customer)  ← PRIMARY TEST ACCOUNT
 *   seller@gmail.com  / 123456   (seller)    ← SELLER TEST ACCOUNT
 *   user@gocart.com   / 123456   (customer)
 *   admin@gocart.com  / admin123 (admin)
 */

export const mockUsers = [
  {
    id: 1,
    name: "Test User",
    email: "test@gmail.com",
    password: "123456",
    role: "customer",
    avatar: null,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    name: "Seller Test",
    email: "seller@gmail.com",
    password: "123456",
    role: "seller",
    avatar: null,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Harsh",
    email: "user@gocart.com",
    password: "123456",
    role: "customer",
    avatar: null,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Admin",
    email: "admin@gocart.com",
    password: "admin123",
    role: "admin",
    avatar: null,
    createdAt: "2025-01-01T00:00:00.000Z",
  },
];

/** Auto-incrementing ID for newly registered users */
let _nextId = mockUsers.length + 1;
export const bumpUserId = () => _nextId++;
