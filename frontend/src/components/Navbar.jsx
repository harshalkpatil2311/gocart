import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar({
  products,
  cartCount,
  wishlistCount,
  categories,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onSelectSuggestion,
  user,
  onLogout,
}) {
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [products, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSuggestionsVisible(false);
  };

  return (
    <header className="navbar">
      {/* ── Top row ──────────────────────────────────── */}
      <div className="navbar-top">
        {/* Logo */}
        <Link to="/" className="brand-link">
          <div className="logo-badge">Go</div>
          <div className="brand-text">
            <span className="brand-name">GoCart</span>
            <span className="brand-tag">India's Smart Marketplace</span>
          </div>
        </Link>

        {/* Search */}
        <form className="navbar-search-wrap" onSubmit={handleSearchSubmit} role="search">
          <div className="navbar-category-select">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="navbar-search">
            <input
              type="search"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSuggestionsVisible(true)}
              onBlur={() => setTimeout(() => setSuggestionsVisible(false), 180)}
              aria-label="Search products"
              autoComplete="off"
            />
            <button type="submit" className="search-btn" aria-label="Search">🔍</button>

            {suggestionsVisible && suggestions.length > 0 && (
              <div className="search-suggestions" role="listbox">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="suggestion-item"
                    role="option"
                    onMouseDown={() => {
                      onSelectSuggestion(product);
                      setSuggestionsVisible(false);
                    }}
                  >
                    <span>{product.name}</span>
                    <small>{product.category} • {product.brand}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Actions */}
        <nav className="navbar-actions" aria-label="Main navigation">
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button className="navbar-user-chip" onClick={() => navigate("/")}>
                <div className="navbar-avatar">{user.name?.[0]?.toUpperCase()}</div>
                <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                  <small style={{ opacity: 0.7, fontSize: "0.65rem" }}>Hello,</small>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>{user.name}</span>
                </span>
              </button>
              <button
                type="button"
                className="nav-btn"
                onClick={onLogout}
                title="Logout"
              >
                <span className="nav-btn-icon">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="nav-btn" id="nav-login-btn">
              <span className="nav-btn-icon">👤</span>
              <span>Login</span>
            </NavLink>
          )}

          <NavLink to="/seller" className="nav-btn" id="nav-seller-btn">
            <span className="nav-btn-icon">🏪</span>
            <span>Sell</span>
          </NavLink>

          <NavLink to="/wishlist" className="nav-btn" id="nav-wishlist-btn">
            <span className="nav-btn-icon">♡</span>
            <span>Wishlist</span>
            {wishlistCount > 0 && <span className="nav-btn-badge">{wishlistCount}</span>}
          </NavLink>

          <NavLink to="/cart" className="nav-btn nav-btn-cart" id="nav-cart-btn">
            <span className="nav-btn-icon">🛒</span>
            <span>Cart</span>
            {cartCount > 0 && <span className="nav-btn-badge">{cartCount}</span>}
          </NavLink>
        </nav>
      </div>

      {/* ── Category strip ───────────────────────────── */}
      <div className="navbar-bottom">
        <div className="navbar-bottom-inner">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`navbar-cat-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
          <NavLink to="/contact" className="navbar-cat-pill">Help</NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
