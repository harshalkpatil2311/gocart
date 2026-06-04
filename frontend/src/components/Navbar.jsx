import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

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

  const suggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) return [];

    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.seller.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [products, searchQuery]);

  return (
    <header className="navbar sticky-navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <div className="logo-badge">Go</div>
          <div>
            <span className="brand-name">GoCart</span>
            <small className="brand-tag">Modern marketplace for every need</small>
          </div>
        </Link>
      </div>

      <div className="navbar-search-wrap">
        <div className="navbar-search">
          <input
            type="search"
            placeholder="Search products, categories, sellers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSuggestionsVisible(true)}
            onBlur={() => setTimeout(() => setSuggestionsVisible(false), 150)}
            aria-label="Search products"
          />
          {suggestionsVisible && suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="suggestion-item"
                  onMouseDown={() => onSelectSuggestion(product)}
                >
                  <span>{product.name}</span>
                  <small>{product.category} • {product.seller}</small>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-category-select">
          <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <nav className="navbar-actions">
        {user ? (
          <div className="navbar-user">
            <span>Hello, {user.name}</span>
            <button type="button" className="button button-secondary" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <NavLink to="/login" className="navbar-link">Login</NavLink>
        )}

        <NavLink to="/wishlist" className="button button-secondary navbar-wishlist">
          Wishlist <span className="badge">{wishlistCount}</span>
        </NavLink>
        <NavLink to="/cart" className="button button-cart">
          Cart <span className="badge">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
