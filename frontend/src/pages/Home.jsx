import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import CategorySection from "../components/CategorySection";
import MobileFilterDrawer from "../components/MobileFilterDrawer";

const OFFERS = [
  { id: 1, cls: "bg-gradient-to-r from-blue-600 to-indigo-600", icon: "⚡", title: "Flash Deals", sub: "Up to 70% off today only" },
  { id: 2, cls: "bg-gradient-to-r from-accent-600 to-fuchsia-600", icon: "🎁", title: "New Arrivals", sub: "Just dropped — shop fresh" },
  { id: 3, cls: "bg-gradient-to-r from-orange-500 to-red-500", icon: "🔥", title: "Clearance Sale", sub: "Last chance prices" },
];

const TRUST = [
  { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹499" },
  { icon: "🔄", title: "Easy Returns", desc: "10-day hassle-free returns" },
  { icon: "🔒", title: "Secure Payment", desc: "100% safe & encrypted" },
  { icon: "🏆", title: "Top Brands", desc: "Genuine certified products" },
];

function Home({
  products,
  loading,
  error,
  searchQuery,
  selectedCategory,
  onSearchChange, // Only used to pass down if needed, but search is global now
  onCategoryChange,
  onResetFilters,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  recentlyViewed,
}) {
  const navigate = useNavigate();
  const [sortOption, setSortOption]     = useState("featured");
  const [priceRange, setPriceRange]     = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sellerFilter, setSellerFilter] = useState("All");
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const uniqueSellers = useMemo(
    () => ["All", ...new Set(products.map((p) => p.seller))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products
      .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
      .filter((p) => sellerFilter === "All" || p.seller === sellerFilter)
      .filter((p) => {
        if (priceRange === "all")     return true;
        if (priceRange === "budget")  return p.price < 5000;
        if (priceRange === "mid")     return p.price >= 5000 && p.price < 20000;
        if (priceRange === "premium") return p.price >= 20000;
        return true;
      })
      .filter((p) => ratingFilter === "all" || p.rating >= Number(ratingFilter))
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q))
      .sort((a, b) => {
        if (sortOption === "low-to-high")  return a.price - b.price;
        if (sortOption === "high-to-low")  return b.price - a.price;
        if (sortOption === "highest-rated") return b.rating - a.rating;
        if (sortOption === "best-discount") return b.discount - a.discount;
        return a.id - b.id;
      });
  }, [products, searchQuery, selectedCategory, priceRange, ratingFilter, sellerFilter, sortOption]);

  const handleOfferClick = (offerId) => {
    onResetFilters();
    setPriceRange("all");
    setRatingFilter("all");
    setSellerFilter("All");
    
    if (offerId === 1) setSortOption("best-discount");
    else if (offerId === 2) setSortOption("featured");
    else if (offerId === 3) setSortOption("low-to-high");
    
    setTimeout(() => {
      document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const bestSellers   = useMemo(() => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4), [products]);
  const topDeals      = useMemo(() => [...products].sort((a, b) => b.discount - a.discount).slice(0, 4), [products]);
  const isFiltered    = searchQuery || selectedCategory !== "All" || priceRange !== "all" || ratingFilter !== "all" || sellerFilter !== "All";

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {error   && <div className="mb-8 rounded-md bg-red-50 p-4 text-red-700 ring-1 ring-inset ring-red-600/20">⚠️ {error}</div>}
        {loading && !error && <div className="mb-8 rounded-md bg-blue-50 p-4 text-blue-700 ring-1 ring-inset ring-blue-600/20">⏳ Loading products from backend...</div>}

        {/* ── Hero ──────────────────────────────────────── */}
        {!isFiltered && (
          <section className="mb-12 overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl lg:flex lg:h-[480px]">
            <div className="flex flex-1 flex-col justify-center p-8 lg:p-16">
              <span className="mb-4 inline-block w-fit rounded-full bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-300">🛍️ India's #1 Smart Marketplace</span>
              <h1 className="mb-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Shop <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Smarter,</span><br />Save Bigger
              </h1>
              <p className="mb-8 max-w-lg text-lg text-slate-300">
                Discover thousands of products across top categories — from the latest mobiles to everyday essentials. Best prices, genuine products, fast delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="rounded-lg bg-primary-500 px-8 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })}
                >
                  🛒 Shop Now
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-700 bg-slate-800 px-8 py-3.5 font-bold text-white transition-colors hover:bg-slate-700"
                  onClick={() => navigate("/seller")}
                >
                  🏪 Sell on GoCart
                </button>
              </div>
            </div>

            <div className="relative hidden flex-1 lg:block">
              <img 
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80" 
                alt="Shopping" 
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
            </div>
          </section>
        )}

        {/* ── Offer Banners ─────────────────────────────── */}
        {!isFiltered && (
          <section className="mb-12">
            <div className="grid gap-4 sm:grid-cols-3">
              {OFFERS.map((o) => (
                <div 
                  key={o.id} 
                  className={`flex cursor-pointer items-center gap-4 rounded-xl p-6 text-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg ${o.cls}`}
                  onClick={() => handleOfferClick(o.id)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="text-4xl">{o.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold">{o.title}</h3>
                    <p className="text-sm font-medium opacity-90">{o.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Best Sellers strip ────────────────────────── */}
        {!isFiltered && bestSellers.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-accent-600">Most Popular</span>
                <h2 className="text-3xl font-black text-slate-900">🏆 Best Sellers</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => onAddToCart(product)}
                  onToggleWishlist={() => onToggleWishlist(product)}
                  isWishlisted={wishlist.some((i) => i.id === product.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Marketplace Layout (Sidebar + Grid) ──────────── */}
        <section id="featured-products">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900">
                {selectedCategory === "All" ? "Explore Marketplace" : selectedCategory}
              </h2>
              <p className="mt-1 text-slate-600">
                {isFiltered
                  ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""} found`
                  : "Discover everything in one place"}
              </p>
            </div>
          </div>

          {/* Category Strip (Horizontal) */}
          <CategorySection 
            selectedCategory={selectedCategory} 
            onCategoryChange={onCategoryChange} 
          />

          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Desktop Sidebar */}
            <FilterSidebar 
              categories={["All"]} // Not used here as we have CategorySection, but passing for prop safety
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              ratingFilter={ratingFilter}
              onRatingChange={setRatingFilter}
              uniqueSellers={uniqueSellers}
              sellerFilter={sellerFilter}
              onSellerChange={setSellerFilter}
              onResetFilters={() => {
                onResetFilters();
                setPriceRange("all");
                setRatingFilter("all");
                setSellerFilter("All");
                setSortOption("featured");
              }}
            />

            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer 
              isOpen={mobileFiltersOpen}
              onClose={() => setMobileFiltersOpen(false)}
              categories={["All"]} 
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              ratingFilter={ratingFilter}
              onRatingChange={setRatingFilter}
              uniqueSellers={uniqueSellers}
              sellerFilter={sellerFilter}
              onSellerChange={setSellerFilter}
              onResetFilters={() => {
                onResetFilters();
                setPriceRange("all");
                setRatingFilter("all");
                setSellerFilter("All");
                setSortOption("featured");
              }}
            />

            {/* Products main area */}
            <div className="flex-1">
              
              {/* Sort Bar & Mobile Filter Trigger */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <button 
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 lg:hidden"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Filters
                </button>

                <div className="flex items-center gap-3 ml-auto">
                  <span className="text-sm font-medium text-slate-500">Sort by:</span>
                  <select 
                    value={sortOption} 
                    onChange={(e) => setSortOption(e.target.value)}
                    className="rounded-md border-0 bg-slate-50 py-2 pl-3 pr-8 text-sm font-medium text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary-600"
                  >
                    <option value="featured">Featured</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="highest-rated">Highest Rated</option>
                    <option value="best-discount">Best Discount</option>
                  </select>
                </div>
              </div>

              {/* Loading skeleton */}
              {loading && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div key={n} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="aspect-square w-full animate-pulse rounded-lg bg-slate-200"></div>
                      <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200"></div>
                      <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200"></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!loading && filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 py-16 text-center">
                  <div className="mb-4 text-6xl">🔍</div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">No products found</h3>
                  <p className="mb-6 max-w-md text-slate-600">Try adjusting your search or filters to find what you're looking for.</p>
                  <button
                    type="button"
                    className="rounded-md bg-primary-600 px-6 py-2.5 font-bold text-white hover:bg-primary-500"
                    onClick={() => {
                      onResetFilters();
                      setPriceRange("all");
                      setRatingFilter("all");
                      setSellerFilter("All");
                      setSortOption("featured");
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Product grid */}
              {!loading && filteredProducts.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => onAddToCart(product)}
                      onToggleWishlist={() => onToggleWishlist(product)}
                      isWishlisted={wishlist.some((i) => i.id === product.id)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
