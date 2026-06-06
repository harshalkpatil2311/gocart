import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

const TRUST = [
  { icon: "🚚", title: "Free & Fast Delivery", desc: "On orders above ₹499" },
  { icon: "🔄", title: "Easy Returns", desc: "10-day hassle-free returns" },
  { icon: "🔒", title: "Secure Payment", desc: "100% safe & encrypted" },
  { icon: "🏆", title: "Top Brands", desc: "Genuine certified products" },
];

const REVIEWS = [
  { id: 1, name: "Rahul S.", text: "GoCart is my go-to! The delivery is always on time and products are genuine.", rating: 5 },
  { id: 2, name: "Priya M.", text: "Incredible deals every day. I saved over ₹2,000 on my last smartphone purchase.", rating: 5 },
  { id: 3, name: "Ankit K.", text: "The user interface is so smooth. Finding what I want takes seconds.", rating: 4 },
  { id: 4, name: "Sneha V.", text: "Customer service resolved my return in a single day. Highly recommended!", rating: 5 },
];

function SectionRow({ title, desc, items, id, onAddToCart, onToggleWishlist, wishlist }) {
  return (
    <section id={id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6 lg:p-8">
      <div className="mb-4 flex items-end justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{title}</h2>
          <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{desc}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map(product => (
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
  );
}

function Home({
  products,
  loading,
  error,
  searchQuery,
  priceRange,
  ratingFilter,
  sellerFilter,
  uniqueSellers,
  onPriceChange,
  onRatingChange,
  onSellerChange,
  onResetFilters,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) {
  const [sortOption, setSortOption] = useState("featured");

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return products
      .filter((p) => sellerFilter === "All" || p.seller === sellerFilter)
      .filter((p) => {
        if (priceRange === "all") return true;
        if (priceRange === "budget") return p.price < 5000;
        if (priceRange === "mid") return p.price >= 5000 && p.price < 20000;
        if (priceRange === "premium") return p.price >= 20000;
        return true;
      })
      .filter((p) => ratingFilter === "all" || p.rating >= Number(ratingFilter))
      .filter((p) => !q || p.title.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)))
      .sort((a, b) => {
        if (sortOption === "low-to-high") return a.price - b.price;
        if (sortOption === "high-to-low") return b.price - a.price;
        if (sortOption === "highest-rated") return b.rating - a.rating;
        if (sortOption === "best-discount") return b.discount - a.discount;
        return a.id - b.id; // "featured" fallback
      });
  }, [products, searchQuery, priceRange, ratingFilter, sellerFilter, sortOption]);

  const isFiltered = searchQuery || priceRange !== "all" || ratingFilter !== "all" || sellerFilter !== "All";

  const trending = useMemo(() => [...products].sort((a, b) => b.rating - a.rating).slice(0, 8), [products]);
  const bestDeals = useMemo(() => [...products].sort((a, b) => b.discount - a.discount).slice(0, 8), [products]);
  const popular = useMemo(() => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8), [products]);
  const recommended = useMemo(() => [...products].reverse().slice(0, 8), [products]);

  // Exclude "All"
  const featuredSellersList = useMemo(() => uniqueSellers.filter(s => s !== "All").slice(0, 4), [uniqueSellers]);



  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {error && <div className="mb-8 rounded-md bg-red-50 p-4 text-red-700 ring-1 ring-inset ring-red-600/20">⚠️ {error}</div>}
        {loading && !error && <div className="mb-8 rounded-md bg-blue-50 p-4 text-blue-700 ring-1 ring-inset ring-blue-600/20">⏳ Loading marketplace data...</div>}

        {!isFiltered ? (
          /* =========================================
             HOME PAGE VIEW (Thematic Layout)
             ========================================= */
          <div className="space-y-12 pb-12">
            
            {/* 1. Hero Banner & Search Section */}
            <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl lg:flex lg:h-[450px]">
              <div className="relative z-10 flex flex-1 flex-col justify-center p-8 lg:p-16">
                <div className="space-y-8 max-w-2xl">
                  <span className="inline-block rounded-full bg-slate-800/80 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-300 ring-1 ring-white/20 shadow-sm">
                    Welcome to GoCart
                  </span>
                  
                  <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 drop-shadow-sm">Shop Smarter.</span><br />
                    <span className="text-white">Live Better.</span>
                  </h1>
                  
                  <div className="space-y-4">
                    <p className="text-xl font-medium text-slate-200 leading-relaxed">
                      Discover top products, trending deals, and trusted sellers — all in one modern marketplace.
                    </p>
                    <p className="text-base text-slate-400 leading-relaxed">
                      Explore thousands of products across fashion, electronics, home essentials, beauty, grocery, and more.
                    </p>
                  </div>

                  <div className="flex pt-2">
                    <button
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-primary-600 px-10 py-4 font-black tracking-wide text-white shadow-xl ring-1 ring-inset ring-white/20 transition-all hover:-translate-y-1 hover:bg-primary-500 hover:shadow-primary-500/40 active:translate-y-0"
                      onClick={() => { document.getElementById("trending-products")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                    >
                      <span className="relative z-10">Start Shopping</span>
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 lg:relative lg:flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent lg:hidden z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80" 
                  alt="Shopping" 
                  className="h-full w-full object-cover object-right"
                />
              </div>
            </section>

            {/* 2. Trending Products */}
            <SectionRow id="trending-products" title="Trending Now" desc="The highest rated products everyone is talking about" items={trending} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} />

            {/* 3. Best Deals */}
            <SectionRow id="best-deals" title="Best Deals" desc="Massive discounts you simply cannot miss" items={bestDeals} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} />

            {/* 4. Popular Products */}
            <SectionRow id="popular-products" title="Popular Products" desc="Most reviewed items trusted by thousands" items={popular} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} />

            {/* 5. Recommended Products */}
            <SectionRow id="recommended-products" title="Recommended For You" desc="Handpicked selections based on your browsing" items={recommended} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} />

            {/* 6. Featured Sellers */}
            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <h2 className="mb-6 text-2xl font-black text-slate-900 text-center">Featured Sellers</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredSellersList.map((seller, idx) => (
                  <div key={idx} className="flex cursor-pointer flex-col items-center rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-primary-300">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100 text-3xl shadow-inner">
                      🏪
                    </div>
                    <h3 className="font-bold text-slate-900">{seller}</h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">Official Partner</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Customer Reviews */}
            <section className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black">What Our Customers Say</h2>
                <p className="text-slate-400">Join millions of satisfied shoppers</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {REVIEWS.map(r => (
                  <div key={r.id} className="rounded-2xl bg-slate-800 p-6 ring-1 ring-white/10">
                    <div className="mb-3 flex text-accent-400">
                      {[...Array(r.rating)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-slate-300">"{r.text}"</p>
                    <p className="font-bold text-slate-100">- {r.name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. Trust Section */}
            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {TRUST.map((t, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl shadow-inner">
                      {t.icon}
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-slate-900">{t.title}</h4>
                    <p className="text-sm text-slate-600">{t.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        ) : (
          /* =========================================
             PRODUCT LISTING VIEW (Filters Active)
             ========================================= */
          <div id="product-grid" className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <FilterSidebar 
              priceRange={priceRange}
              onPriceChange={onPriceChange}
              ratingFilter={ratingFilter}
              onRatingChange={onRatingChange}
              sellerFilter={sellerFilter}
              onSellerChange={onSellerChange}
              uniqueSellers={uniqueSellers}
              onResetFilters={onResetFilters}
            />

            {/* Main Listing Area */}
            <div className="flex-1">
              
              {/* Header & Sort Bar */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">
                    {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">Showing {filteredProducts.length} products</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-700 whitespace-nowrap">Sort by:</span>
                  <select 
                    value={sortOption} 
                    onChange={(e) => setSortOption(e.target.value)}
                    className="rounded-lg border-0 bg-slate-100 py-2.5 pl-4 pr-10 text-sm font-bold text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary-600"
                  >
                    <option value="featured">Featured</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                    <option value="highest-rated">Highest Rated</option>
                    <option value="best-discount">Best Discount</option>
                  </select>
                </div>
              </div>

              {/* Empty State */}
              {!loading && filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center shadow-sm ring-1 ring-slate-200">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-5xl shadow-inner">
                    🔍
                  </div>
                  <h3 className="mb-2 text-2xl font-black text-slate-900">No matches found</h3>
                  <p className="mb-8 max-w-md text-slate-600">We couldn't find any products matching your current filters. Try adjusting them or clearing the filters.</p>
                  <button
                    type="button"
                    className="rounded-xl bg-primary-600 px-8 py-3 font-bold text-white shadow-sm hover:bg-primary-500"
                    onClick={onResetFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Product Grid */}
              {!loading && filteredProducts.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
        )}

      </div>
    </div>
  );
}

export default Home;
