import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const categoryCards = [
  { name: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80" },
  { name: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80" },
  { name: "Grocery", image: "https://images.unsplash.com/photo-1505577058444-a3dab7d73fc8?auto=format&fit=crop&w=800&q=80" },
  { name: "Furniture", image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=80" },
  { name: "Beauty", image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" },
  { name: "Appliances", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" },
];

function Home({ products, loading, error, searchQuery, selectedCategory, onSearchChange, onCategoryChange, onResetFilters, onAddToCart, wishlist, onToggleWishlist, recentlyViewed }) {
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sellerFilter, setSellerFilter] = useState("All");

  const uniqueSellers = useMemo(() => ["All", ...new Set(products.map((item) => item.seller))], [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return products
      .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
      .filter((product) => (sellerFilter === "All" ? true : product.seller === sellerFilter))
      .filter((product) => {
        if (priceRange === "all") return true;
        if (priceRange === "budget") return product.price < 5000;
        if (priceRange === "mid") return product.price >= 5000 && product.price < 20000;
        if (priceRange === "premium") return product.price >= 20000;
        return true;
      })
      .filter((product) => (ratingFilter === "all" ? true : product.rating >= Number(ratingFilter)))
      .filter((product) => {
        if (!normalizedSearch) return true;
        return (
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch) ||
          product.seller.toLowerCase().includes(normalizedSearch)
        );
      })
      .sort((a, b) => {
        if (sortOption === "low-to-high") return a.price - b.price;
        if (sortOption === "high-to-low") return b.price - a.price;
        if (sortOption === "highest-rated") return b.rating - a.rating;
        if (sortOption === "best-discount") return b.discount - a.discount;
        return a.id - b.id;
      });
  }, [products, searchQuery, selectedCategory, priceRange, ratingFilter, sellerFilter, sortOption]);

  return (
    <div className="home-page">
      {error && <div className="status-banner status-error"><p>{error}</p></div>}
      {loading && !error && <div className="status-banner"><p>Loading latest products from the backend...</p></div>}

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Discover a premium shopping experience</span>
          <h1>Discover Amazing Products</h1>
          <p>Find top-rated products, exclusive offers, and trusted sellers all in one modern marketplace.</p>
          <div className="hero-actions">
            <button type="button" className="button button-primary" onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>Shop Now</button>
          </div>
        </div>
        <div className="hero-image-card">
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80" alt="GoCart hero" />
        </div>
      </section>

      <section className="category-section">
        <div className="section-header">
          <div>
            <h2>Shop by category</h2>
            <p>Browse top categories for a modern marketplace experience.</p>
          </div>
        </div>
        <div className="category-scroll">
          {categoryCards.map((item) => (
            <button key={item.name} type="button" className={`category-card ${selectedCategory === item.name ? "active-category" : ""}`} onClick={() => onCategoryChange(item.name)}>
              <div className="category-image"><img src={item.image} alt={item.name} /></div>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="marketplace-section">
        <aside className="filter-sidebar">
          <div className="filter-card">
            <h3>Search</h3>
            <input type="search" placeholder="Search products, categories, sellers..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
          </div>
          <div className="filter-card">
            <h3>Category</h3>
            <div className="category-options">
              <button type="button" className={selectedCategory === "All" ? "filter-pill active-pill" : "filter-pill"} onClick={() => onCategoryChange("All")}>All</button>
              {categoryCards.map((item) => (
                <button key={item.name} type="button" className={selectedCategory === item.name ? "filter-pill active-pill" : "filter-pill"} onClick={() => onCategoryChange(item.name)}>{item.name}</button>
              ))}
            </div>
          </div>
          <div className="filter-card">
            <h3>Price range</h3>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">All prices</option>
              <option value="budget">Under ₹5,000</option>
              <option value="mid">₹5,000 - ₹20,000</option>
              <option value="premium">₹20,000+</option>
            </select>
          </div>
          <div className="filter-card">
            <h3>Ratings</h3>
            <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
              <option value="all">All ratings</option>
              <option value="4">4 stars & up</option>
              <option value="3">3 stars & up</option>
              <option value="2">2 stars & up</option>
            </select>
          </div>
          <div className="filter-card">
            <h3>Seller</h3>
            <select value={sellerFilter} onChange={(e) => setSellerFilter(e.target.value)}>
              {uniqueSellers.map((seller) => (
                <option key={seller} value={seller}>{seller}</option>
              ))}
            </select>
          </div>
          <div className="filter-card">
            <button type="button" className="button button-secondary" onClick={() => { onResetFilters(); setPriceRange("all"); setRatingFilter("all"); setSellerFilter("All"); setSortOption("featured"); }}>Clear all filters</button>
          </div>
        </aside>

        <div className="marketplace-main">
          <div className="marketplace-header">
            <div>
              <h2>Featured products</h2>
              <p>All the latest deals in one place.</p>
            </div>
            <div className="category-summary">
              <span>{filteredProducts.length} products</span>
              <span>Category: {selectedCategory}</span>
              <span>Seller: {sellerFilter}</span>
            </div>
          </div>

          <div className="sort-bar">
            <span>Sort by:</span>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="low-to-high">Price Low to High</option>
              <option value="high-to-low">Price High to Low</option>
              <option value="highest-rated">Highest Rated</option>
              <option value="best-discount">Best Discount</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No products match your filters</h3>
              <p>Try broadening your search or changing the category selection.</p>
            </div>
          ) : (
            <div className="product-grid" id="featured-products">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => onAddToCart(product)}
                  onToggleWishlist={() => onToggleWishlist(product)}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                />
              ))}
            </div>
          )}

          {recentlyViewed.length > 0 && (
            <section className="recently-viewed-section">
              <div className="section-header">
                <div>
                  <h2>Recently viewed</h2>
                  <p>Items you opened recently.</p>
                </div>
              </div>
              <div className="product-grid">
                {recentlyViewed.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} onToggleWishlist={() => onToggleWishlist(product)} isWishlisted={wishlist.some((item) => item.id === product.id)} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
