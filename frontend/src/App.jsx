import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Seller from "./pages/Seller";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { API_BASE_URL } from "./api/config";

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
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("gocartUser") || sessionStorage.getItem("gocartUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

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
      alert("Product already exists in cart");
      return;
    }

    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    alert("Added to Cart");
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
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
        return prev.filter((item) => item.id !== product.id);
      }
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
      <div className="app-shell">
        <Navbar
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

        <main className="main-content">
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
      </div>
    </BrowserRouter>
  );
}

export default App;
