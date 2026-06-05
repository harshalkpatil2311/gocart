import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Header({
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
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-md">
      {/* ── Top row ──────────────────────────────────── */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-lg font-bold text-white shadow-lg transition-transform group-hover:scale-105">
            Go
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xl font-bold leading-none tracking-tight">GoCart</span>
            <span className="text-[0.65rem] font-medium uppercase tracking-wider text-primary-200 opacity-90">India's Smart Market</span>
          </div>
        </Link>

        {/* Search */}
        <form 
          className="relative flex flex-1 max-w-2xl items-center rounded-md bg-white shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500"
          onSubmit={handleSearchSubmit} 
          role="search"
        >
          <div className="hidden md:flex items-center border-r border-slate-200">
            <select
              className="h-full rounded-l-md border-0 bg-slate-50 py-2 pl-3 pr-8 text-sm text-slate-700 focus:ring-0 cursor-pointer"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <input
              type="search"
              className="block w-full border-0 bg-transparent py-2.5 pl-4 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSuggestionsVisible(true)}
              onBlur={() => setTimeout(() => setSuggestionsVisible(false), 180)}
              aria-label="Search products"
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-r-md bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>

            {suggestionsVisible && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5" role="listbox">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    className="flex w-full flex-col items-start px-4 py-2 text-left text-sm hover:bg-slate-50 focus:bg-slate-50 outline-none"
                    role="option"
                    onMouseDown={() => {
                      onSelectSuggestion(product);
                      setSuggestionsVisible(false);
                    }}
                  >
                    <span className="font-medium text-slate-900">{product.name}</span>
                    <span className="text-xs text-slate-500">{product.category} • {product.brand}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>

        {/* Actions */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0" aria-label="Main navigation">
          {user ? (
            <div className="flex items-center gap-2">
              <button 
                className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-slate-800 transition-colors"
                onClick={() => navigate("/")}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-bold text-white">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-[0.65rem] text-slate-300 leading-none">Hello,</span>
                  <span className="text-sm font-bold leading-none">{user.name}</span>
                </div>
              </button>
              <button
                type="button"
                className="hidden sm:flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
                onClick={onLogout}
                title="Logout"
              >
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
              <span className="hidden md:inline">Login</span>
            </NavLink>
          )}

          <NavLink to="/seller" className="hidden lg:flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
            <span>Sell</span>
          </NavLink>

          <NavLink to="/wishlist" className="relative flex flex-col items-center justify-center rounded-md px-2 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {wishlistCount > 0 && (
              <span className="absolute right-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[0.65rem] font-bold text-white shadow-sm ring-2 ring-slate-900">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className="relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span className="hidden md:inline font-bold">Cart</span>
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[0.65rem] font-bold text-white shadow-sm ring-2 ring-slate-900">
                {cartCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
