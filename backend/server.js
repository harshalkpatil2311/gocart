import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "gocart-secret";

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

const users = [
  {
    id: 1,
    name: "Harsh",
    email: "user@gocart.com",
    password: "123456",
  },
];

const products = [
  {
    id: 1,
    name: "Smartphone Pro X",
    category: "Mobiles",
    brand: "Nimbus",
    price: 79999,
    oldPrice: 84999,
    discount: 6,
    rating: 4.9,
    reviews: 1420,
    stock: 12,
    freeDelivery: true,
    deliveryEstimate: "Delivered by Thu, Jun 6",
    badges: ["Best Seller"],
    description: "Flagship performance with an edge-to-edge display, fast charging, and premium camera capabilities.",
    seller: "GoCart Store",
    image: "https://images.unsplash.com/photo-1510552776732-03e61cf4b144?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    brand: "SoundWave",
    price: 22999,
    oldPrice: 26999,
    discount: 15,
    rating: 4.8,
    reviews: 860,
    stock: 8,
    freeDelivery: true,
    deliveryEstimate: "Delivered by Fri, Jun 7",
    badges: ["Limited Stock"],
    description: "Premium audio with adaptive noise cancellation and long battery life for travel and work.",
    seller: "SoundWave",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Everyday Fitness Watch",
    category: "Fashion",
    brand: "HealthTech",
    price: 3299,
    oldPrice: 4299,
    discount: 23,
    rating: 4.5,
    reviews: 430,
    stock: 18,
    freeDelivery: false,
    deliveryEstimate: "Delivered by Wed, Jun 5",
    badges: ["Hot Pick"],
    description: "Lightweight tracking for heart rate, steps, and sleep quality with a sleek all-day design.",
    seller: "HealthTech",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Home Espresso Machine",
    category: "Appliances",
    brand: "BrewHouse",
    price: 34999,
    oldPrice: 41999,
    discount: 17,
    rating: 4.7,
    reviews: 920,
    stock: 5,
    freeDelivery: true,
    deliveryEstimate: "Delivered by Mon, Jun 10",
    badges: ["Free Shipping"],
    description: "Barista-style espresso in one compact countertop design with easy-to-use controls.",
    seller: "BrewHouse",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Designer Backpack",
    category: "Fashion",
    brand: "UrbanGear",
    price: 6599,
    oldPrice: 7899,
    discount: 17,
    rating: 4.4,
    reviews: 120,
    stock: 15,
    freeDelivery: false,
    deliveryEstimate: "Delivered by Thu, Jun 6",
    badges: ["Limited Edition"],
    description: "Durable, stylish carry-all with multiple travel-friendly compartments for daily use.",
    seller: "UrbanGear",
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Smart Home Speaker",
    category: "Electronics",
    brand: "HomeLink",
    price: 14999,
    oldPrice: 17999,
    discount: 17,
    rating: 4.6,
    reviews: 540,
    stock: 22,
    freeDelivery: true,
    deliveryEstimate: "Delivered by Wed, Jun 5",
    badges: ["Best Value"],
    description: "Voice-enabled speaker with premium sound and home automation support for every room.",
    seller: "HomeLink",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
  },
];

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "8h",
  });
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing auth token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "GoCart backend is running" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = createToken(user);

  res.json({
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
});

app.get("/api/auth/profile", authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.get("/api/products", (req, res) => {
  const { category = "", search = "" } = req.query;
  const lowerSearch = String(search).toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory = !category || category === "All" || product.category === category;
    const matchesSearch =
      !lowerSearch ||
      product.name.toLowerCase().includes(lowerSearch) ||
      product.category.toLowerCase().includes(lowerSearch) ||
      product.seller.toLowerCase().includes(lowerSearch);
    return matchesCategory && matchesSearch;
  });

  res.json({ products: filtered, total: filtered.length });
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ product });
});

app.get("/api/categories", (req, res) => {
  const categories = Array.from(new Set(products.map((product) => product.category)));
  res.json({ categories: ["All", ...categories] });
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`GoCart backend listening on http://localhost:${PORT}`);
});
