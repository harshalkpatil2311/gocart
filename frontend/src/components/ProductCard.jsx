import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/320x240?text=Image+Unavailable";
          }}
        />
        <button type="button" className="wishlist-button" onClick={onToggleWishlist}>
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>
      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-seller">{product.seller}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-card-footer">
          <div>
            <strong>₹{product.price.toLocaleString()}</strong>
            {product.oldPrice && <span className="old-price">₹{product.oldPrice.toLocaleString()}</span>}
          </div>
          <button type="button" className="button button-primary" onClick={onAddToCart}>Add</button>
        </div>
        <Link to={`/product/${product.id}`} className="button button-outline">View</Link>
      </div>
    </article>
  );
}

export default ProductCard;
