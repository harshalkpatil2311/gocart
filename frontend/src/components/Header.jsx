import { useState } from "react";
import { Link } from "react-router-dom";

function Header({
  cartCount,
  searchQuery,
  onSearchChange,
  user,
  onLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-md">
        {/* Main Header Row */}
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <button 
              className="lg:hidden p-1 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-lg font-bold text-white shadow-lg transition-transform group-hover:scale-105">
                Go
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xl font-bold leading-none tracking-tight">GoCart</span>
                <span className="text-[0.65rem] font-medium uppercase tracking-wider text-primary-200 opacity-90">Marketplace</span>
              </div>
            </Link>
          </div>

          {/* Search Bar (Hidden on tiny mobile, visible otherwise) */}
          <form 
            className="hidden sm:flex relative flex-1 max-w-3xl items-center rounded-md bg-white shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500"
            onSubmit={handleSearchSubmit} 
          >

            <div className="relative flex-1">
              <input
                type="search"
                className="block w-full border-0 bg-transparent py-2.5 pl-4 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0"
                placeholder="Search products, brands and more..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
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
            </div>
          </form>

          {/* Navigation Actions */}
          <nav className="flex items-center gap-1 sm:gap-3 shrink-0" aria-label="Main navigation">
            
            {/* Account & Orders */}
            {user ? (
              <div className="hidden lg:flex items-center gap-4">
                <div className="group relative">
                  <button className="flex flex-col items-start px-2 py-1 rounded-md hover:border-slate-700 border border-transparent transition-colors">
                    <span className="text-[0.65rem] text-slate-300 leading-none">Hello, {user.name}</span>
                    <span className="text-sm font-bold leading-none mt-1 flex items-center gap-1">
                      Account & Lists
                      <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </span>
                  </button>
                  <div className="absolute right-0 top-full pt-2 hidden group-hover:block">
                    <div className="bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 w-48 py-2 overflow-hidden">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <Link to="/orders" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600">Your Orders</Link>
                      <Link to="/wishlist" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600">Your Wishlist</Link>
                      <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Sign Out</button>
                    </div>
                  </div>
                </div>
                
                <Link to="/orders" className="flex flex-col items-start px-2 py-1 rounded-md hover:border-slate-700 border border-transparent transition-colors">
                  <span className="text-[0.65rem] text-slate-300 leading-none">Returns</span>
                  <span className="text-sm font-bold leading-none mt-1">& Orders</span>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="flex flex-col items-start px-2 py-1 rounded-md hover:border-slate-700 border border-transparent transition-colors">
                <span className="text-[0.65rem] text-slate-300 leading-none">Hello, sign in</span>
                <span className="text-sm font-bold leading-none mt-1 flex items-center gap-1">
                  Account & Lists
                  <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </span>
              </Link>
            )}


            {/* Cart */}
            <Link to="/cart" className="relative flex items-end gap-1 rounded-md px-2 py-2 hover:bg-slate-800 transition-colors">
              <div className="relative flex items-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="absolute -top-1 left-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[0.7rem] font-bold text-white ring-2 ring-slate-900">
                  {cartCount}
                </span>
              </div>
              <span className="hidden md:inline text-sm font-bold pb-0.5">Cart</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Search Bar (Visible only on very small screens) */}
        <div className="sm:hidden px-4 pb-3">
          <form 
            className="relative flex items-center rounded-md bg-white shadow-sm ring-1 ring-inset ring-slate-300"
            onSubmit={handleSearchSubmit} 
          >
            <input
              type="search"
              className="block w-full border-0 bg-transparent py-2 pl-4 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 rounded-md"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-r-md bg-primary-500 text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </form>
        </div>
      </header>


      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform">
            
            <div className="bg-slate-900 px-6 py-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 font-bold text-xl">
                  {user ? user.name[0].toUpperCase() : "👤"}
                </div>
                <div>
                  <p className="text-lg font-bold">{user ? `Hello, ${user.name}` : "Hello, sign in"}</p>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">

              <div className="mb-8">
                <h3 className="text-lg font-black text-slate-900 mb-4">Help & Settings</h3>
                <ul className="space-y-4">
                  <li><Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-primary-600 font-medium text-lg">Your Orders</Link></li>
                  {user ? (
                    <li><button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="text-red-600 hover:text-red-700 font-medium text-lg">Sign Out</button></li>
                  ) : (
                    <li><Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-primary-600 hover:text-primary-700 font-medium text-lg">Sign In</Link></li>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Header;
