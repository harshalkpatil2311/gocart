function Wishlist({ wishlist, onToggleWishlist, onAddToCart }) {
  if (wishlist.length === 0) {
    return (
      <div className="page-shell">
        <section className="page-header">
          <h1>Your wishlist is empty</h1>
          <p>Save products you love and revisit them later.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="page-header">
        <h1>Wishlist</h1>
        <p>Products you have saved for later.</p>
      </section>
      <div className="product-grid">
        {wishlist.map((product) => (
          <article key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p>{product.seller}</p>
              <div className="product-card-footer">
                <button type="button" className="button button-primary" onClick={() => onAddToCart(product)}>Add to Cart</button>
                <button type="button" className="button button-secondary" onClick={() => onToggleWishlist(product)}>Remove</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
