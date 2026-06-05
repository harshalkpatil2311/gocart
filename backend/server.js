/**
 * server.js — GoCart Backend
 * ============================================================
 * ✅ MOCK DATA MODE  — No database connection whatsoever.
 * ✅ All data lives in ./data/*.js files (in-memory).
 * ✅ Plain-text password comparison (mock/dev mode only).
 * ✅ Data resets on server restart (by design).
 * ✅ No bcrypt, No MongoDB, No MySQL, No Prisma, No Sequelize.
 *
 *   PORT      : 4000  (override with PORT env var)
 *   CORS      : http://localhost:5173
 *   Auth      : JWT (8h expiry)
 * ============================================================
 */

import express from "express";
import cors    from "cors";
import jwt     from "jsonwebtoken";
import dotenv  from "dotenv";

// ── Mock data ─────────────────────────────────────────────────
import { mockUsers, bumpUserId }                               from "./data/mockUsers.js";
import { mockProducts }                                        from "./data/mockProducts.js";
import { getCart, upsertCartItem, removeCartItem, clearCart }  from "./data/mockCart.js";
import { getOrdersByUser, placeOrder }                         from "./data/mockOrders.js";

// ── Config ────────────────────────────────────────────────────
dotenv.config();

const app        = express();
const PORT       = process.env.PORT       || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "gocart-mock-secret-key";

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.CLIENT_ORIGIN || "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
  ],
  credentials: true,
}));
app.use(express.json());

// ── Utility helpers ───────────────────────────────────────────

/** Sign a JWT containing safe user claims (no password). */
function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
}

/** Strip sensitive fields before sending to client. */
function publicUser(user) {
  const { password, ...safe } = user;
  return safe;
}

/** JWT auth middleware — attaches decoded payload to req.user. */
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Missing or invalid auth token." });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Token expired or invalid. Please log in again." });
  }
}

// ═══════════════════════════════════════════════════════════════
// HEALTH CHECK
// ═══════════════════════════════════════════════════════════════

app.get("/api/health", (_req, res) => {
  res.json({
    success:  true,
    status:   "ok",
    message:  "GoCart API is running — Mock Data Mode",
    mode:     "mock",
    database: "disabled",
    port:     PORT,
    time:     new Date().toISOString(),
  });
});

// ═══════════════════════════════════════════════════════════════
// AUTH  →  /api/auth/*
// ═══════════════════════════════════════════════════════════════

/**
 * POST /api/auth/login
 * Body : { email, password }
 * Returns: { success: true, token, user }
 */
app.post("/api/auth/login", (req, res) => {
  const { email = "", password = "" } = req.body ?? {};

  // ── Basic validation ─────────────────────────────────────────
  if (!email.trim() || !password.trim()) {
    return res.status(400).json({
      success: false,
      error: "Email and password are required.",
    });
  }

  // ── Lookup user in mock store (case-insensitive email) ───────
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim()
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "No account found with that email address.",
    });
  }

  // ── Plain-text password comparison (mock dev mode) ───────────
  if (user.password !== password.trim()) {
    return res.status(401).json({
      success: false,
      error: "Incorrect password. Please try again.",
    });
  }

  // ── Success ──────────────────────────────────────────────────
  const token = signToken(user);

  console.log(`[Auth] ✅ Login success → ${user.email} (${user.role})`);

  return res.status(200).json({
    success: true,
    token,
    user: publicUser(user),
  });
});

/**
 * POST /api/auth/register
 * Body : { name, email, password }
 * Returns: { success: true, token, user }
 */
app.post("/api/auth/register", (req, res) => {
  const { name = "", email = "", password = "" } = req.body ?? {};

  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({ success: false, error: "Name, email, and password are all required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Please enter a valid email address." });
  }

  if (password.trim().length < 6) {
    return res.status(400).json({ success: false, error: "Password must be at least 6 characters." });
  }

  const exists = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  if (exists) {
    return res.status(409).json({ success: false, error: "An account with this email already exists. Please log in." });
  }

  const newUser = {
    id:        bumpUserId(),
    name:      name.trim(),
    email:     email.toLowerCase().trim(),
    password:  password.trim(),     // plain-text in mock mode
    role:      "customer",
    avatar:    null,
    createdAt: new Date().toISOString(),
  };
  mockUsers.push(newUser);

  const token = signToken(newUser);
  console.log(`[Auth] ✅ New user registered → ${newUser.email}`);

  return res.status(201).json({
    success: true,
    token,
    user: publicUser(newUser),
  });
});

/**
 * GET /api/auth/profile  [protected]
 */
app.get("/api/auth/profile", requireAuth, (req, res) => {
  const user = mockUsers.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found." });
  }
  return res.json({ success: true, user: publicUser(user) });
});

// ═══════════════════════════════════════════════════════════════
// PRODUCTS  →  /api/products  |  /api/categories
// ═══════════════════════════════════════════════════════════════

/**
 * GET /api/products?category=&search=&sort=
 */
app.get("/api/products", (req, res) => {
  const { category = "", search = "", sort = "" } = req.query;
  const q = search.toLowerCase().trim();

  let result = mockProducts.filter((p) => {
    const catOk    = !category || category === "All" || p.category === category;
    const searchOk = !q || [p.name, p.category, p.brand, p.seller].some(
      (f) => f.toLowerCase().includes(q)
    );
    return catOk && searchOk;
  });

  if (sort === "price_asc")     result.sort((a, b) => a.price    - b.price);
  if (sort === "price_desc")    result.sort((a, b) => b.price    - a.price);
  if (sort === "rating_desc")   result.sort((a, b) => b.rating   - a.rating);
  if (sort === "discount_desc") result.sort((a, b) => b.discount - a.discount);

  return res.json({ success: true, products: result, total: result.length });
});

/**
 * GET /api/products/:id
 */
app.get("/api/products/:id", (req, res) => {
  const product = mockProducts.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, error: "Product not found." });
  }
  return res.json({ success: true, product });
});

/**
 * GET /api/categories
 */
app.get("/api/categories", (_req, res) => {
  const cats = [...new Set(mockProducts.map((p) => p.category))];
  return res.json({ success: true, categories: ["All", ...cats] });
});

// ═══════════════════════════════════════════════════════════════
// CART  →  /api/cart  [protected]
// ═══════════════════════════════════════════════════════════════

/**
 * GET /api/cart
 */
app.get("/api/cart", requireAuth, (req, res) => {
  const items    = getCart(req.user.id);
  const enriched = items
    .map((item) => {
      const p = mockProducts.find((x) => x.id === item.productId);
      return p ? { ...p, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal  = enriched.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = enriched.reduce((s, i) => s + i.quantity, 0);

  return res.json({ success: true, cart: enriched, subtotal, itemCount });
});

/**
 * POST /api/cart
 * Body: { productId, quantity? }
 */
app.post("/api/cart", requireAuth, (req, res) => {
  const { productId, quantity = 1 } = req.body ?? {};

  if (!productId) {
    return res.status(400).json({ success: false, error: "productId is required." });
  }

  const product = mockProducts.find((p) => p.id === Number(productId));
  if (!product) {
    return res.status(404).json({ success: false, error: "Product not found." });
  }

  upsertCartItem(req.user.id, Number(productId), Number(quantity));

  const items = getCart(req.user.id);
  const cart  = items
    .map((item) => {
      const p = mockProducts.find((x) => x.id === item.productId);
      return p ? { ...p, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  return res.json({ success: true, message: "Item added to cart.", cart });
});

/**
 * DELETE /api/cart/:productId
 */
app.delete("/api/cart/:productId", requireAuth, (req, res) => {
  removeCartItem(req.user.id, Number(req.params.productId));
  return res.json({ success: true, message: "Item removed from cart." });
});

// ═══════════════════════════════════════════════════════════════
// ORDERS  →  /api/orders  [protected]
// ═══════════════════════════════════════════════════════════════

/**
 * GET /api/orders
 */
app.get("/api/orders", requireAuth, (req, res) => {
  const orders = getOrdersByUser(req.user.id);
  return res.json({ success: true, orders, total: orders.length });
});

/**
 * POST /api/orders
 * Body: { items, total, paymentMethod, address }
 */
app.post("/api/orders", requireAuth, (req, res) => {
  const { items, total, paymentMethod, address } = req.body ?? {};

  if (!items?.length || !total || !paymentMethod || !address) {
    return res.status(400).json({
      success: false,
      error: "items, total, paymentMethod, and address are all required.",
    });
  }

  const order = placeOrder(req.user.id, { items, total, paymentMethod, address });
  clearCart(req.user.id);

  console.log(`[Order] ✅ New order placed → ${order.id} by user ${req.user.id}`);

  return res.status(201).json({ success: true, order });
});

// ═══════════════════════════════════════════════════════════════
// 404 — catch all unmatched routes
// ═══════════════════════════════════════════════════════════════

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.path}`,
  });
});

// ═══════════════════════════════════════════════════════════════
// 500 — global error handler
// ═══════════════════════════════════════════════════════════════

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error("[Error]", err);
  res.status(500).json({ success: false, error: "Internal server error." });
});

// ═══════════════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log("");
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║        GoCart Backend  — MOCK DATA MODE       ║");
  console.log("╠═══════════════════════════════════════════════╣");
  console.log(`║  Server running on → http://localhost:${PORT}      ║`);
  console.log("║  Mode             → ✅ Mock Data (in-memory)  ║");
  console.log("║  Database         → ❌ Disabled               ║");
  console.log("╠═══════════════════════════════════════════════╣");
  console.log("║  Test credentials:                            ║");
  console.log("║    Email    →  test@gmail.com                 ║");
  console.log("║    Password →  123456                         ║");
  console.log("║    Role     →  customer                       ║");
  console.log("╚═══════════════════════════════════════════════╝");
  console.log("");
});
