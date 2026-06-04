function Seller() {
  return (
    <div className="page-shell seller-page">
      <section className="page-header">
        <h1>Seller Dashboard</h1>
        <p>Welcome to the seller portal. Manage listings, view performance, and grow your marketplace business.</p>
      </section>
      <div className="seller-grid">
        <div className="seller-card">
          <h2>Live Listings</h2>
          <p>Track your active products and inventory levels in one place.</p>
        </div>
        <div className="seller-card">
          <h2>Orders</h2>
          <p>Review order status, shipping updates, and customer requests.</p>
        </div>
        <div className="seller-card">
          <h2>Insights</h2>
          <p>See sales trends, popular categories, and product performance metrics.</p>
        </div>
      </div>
    </div>
  );
}

export default Seller;
