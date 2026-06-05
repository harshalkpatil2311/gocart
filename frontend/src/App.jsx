import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Seller from "./pages/Seller";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { API_BASE_URL } from "./api/config";

// --- Toast Component ---
function ToastContainer({ toasts }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div 
          key={t.id} 
          className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg ring-1 ring-black/5 animate-in slide-in-from-right duration-300 ${
            t.type === "success" ? "bg-success-50 text-success-700" : 
            t.type === "error" ? "bg-red-50 text-red-700" : 
            t.type === "warning" ? "bg-warning-50 text-warning-700" : 
            "bg-slate-800 text-white"
          }`}
        >
          <span className="text-lg">
            {t.type === "success" ? "✅" : t.type === "error" ? "❌" : t.type === "warning" ? "⚠️" : "ℹ️"}
          </span>
          <span className="text-sm font-semibold">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const [toasts, setToasts] = useState([]);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("gocartUser") || sessionStorage.getItem("gocartUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("gocartUser");
      sessionStorage.removeItem("gocartUser");
      return;
    }

    if (user.remember) {
      localStorage.setItem("gocartUser", JSON.stringify(user));
      sessionStorage.removeItem("gocartUser");
    } else {
      sessionStorage.setItem("gocartUser", JSON.stringify(user));
      localStorage.removeItem("gocartUser");
    }
  }, [user]);

  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      setBackendError(null);

      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/categories`),
          fetch(`${API_BASE_URL}/api/products`),
        ]);

        if (!categoriesRes.ok || !productsRes.ok) {
          throw new Error("Unable to load marketplace data.");
        }

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        setCategories(categoriesData.categories || ["All"]);
        setProducts(productsData.products || []);
      } catch (error) {
        setBackendError(error.message || "Unable to connect to backend.");
      } finally {
        setLoading(false);
      }
    }

    loadCatalog();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    showToast(`Welcome back, ${userData.name}!`, "success");
  };

  const handleLogout = () => {
    setUser(null);
    showToast("You have been logged out.", "info");
  };

  const handleSearchChange = (value) => setSearchQuery(value);
  const handleCategoryChange = (value) => setSelectedCategory(value);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const handleSelectSuggestion = (product) => {
    if (!product) return;
    setSearchQuery(product.name);
    setSelectedCategory(product.category);
  };

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some((item) => item.id === product.id);
    if (alreadyInCart) {
      showToast(`${product.name} is already in your cart`, "warning");
      return;
    }

    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    showToast(`${product.name} added to cart`, "success");
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast("Item removed from cart", "info");
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from wishlist`, "info");
        return prev.filter((item) => item.id !== product.id);
      }
      showToast(`${product.name} added to wishlist`, "success");
      return [...prev, product];
    });
  };

  const handleProductView = (product) => {
    setRecentlyViewed((prev) => {
      const next = [product, ...prev.filter((item) => item.id !== product.id)];
      return next.slice(0, 5);
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col font-sans">
        <Header
          products={products}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          categories={categories}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onSelectSuggestion={handleSelectSuggestion}
          user={user}
          onLogout={handleLogout}
        />

        <main className="flex-1 bg-slate-50">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  loading={loading}
                  error={backendError}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  onSearchChange={handleSearchChange}
                  onCategoryChange={handleCategoryChange}
                  onResetFilters={handleResetFilters}
                  onAddToCart={handleAddToCart}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  recentlyViewed={recentlyViewed}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetail
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                  onProductView={handleProductView}
                />
              }
            />
            <Route path="/cart" element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />} />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onToggleWishlist={handleToggleWishlist} onAddToCart={handleAddToCart} />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/login" element={<Login onLogin={handleLogin} user={user} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer toasts={toasts} />
      </div>
    </BrowserRouter>
  );
}

export default App;
