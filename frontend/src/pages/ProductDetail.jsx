import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";

function ProductDetail({ onAddToCart, onToggleWishlist, wishlist, onProductView }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("Enter your pincode to check delivery availability.");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found.");
        }
        const payload = await response.json();
        setProduct(payload.product);
      } catch (err) {
        setError(err.message || "Unable to load product details.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && onProductView) {
      onProductView(product);
    }
  }, [product, onProductView]);

  const handlePincodeChange = (value) => {
    setPincode(value);
    if (/^[0-9]{6}$/.test(value)) {
      setDeliveryStatus("Delivery available in your area");
    } else if (value.length === 0) {
      setDeliveryStatus("Enter your pincode to check delivery availability.");
    } else {
      setDeliveryStatus("Enter a valid 6-digit pincode.");
    }
  };

  if (loading) {
    return (
      <div className="page-shell">
        <section className="page-header">
          <h1>Loading product...</h1>
          <p>Please wait while we load the product details.</p>
        </section>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-shell">
        <section className="page-header">
          <h1>Product not found</h1>
          <p>{error || "The item you were looking for is unavailable."}</p>
        </section>
        <Link to="/" className="button button-primary">Back to shop</Link>
      </div>
    );
  }

  const inWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="page-shell product-detail-page">
      <section className="page-header">
        <h1>{product.name}</h1>
        <p>{product.category} • {product.brand} • {product.seller}</p>
      </section>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} onError={(e) => { e.target.src = "https://via.placeholder.com/500x500?text=Image+Unavailable"; }} />
        </div>

        <div className="product-detail-info">
          <div className="badge-group">
            {product.badges?.map((badge) => (
              <span key={badge} className="badge-chip detail-badge">{badge}</span>
            ))}
          </div>

          <div className="price-row detail-price-row">
            <strong className="detail-price">₹{product.price.toLocaleString()}</strong>
            {product.oldPrice && <span className="old-price">₹{product.oldPrice.toLocaleString()}</span>}
            <span className="detail-discount">{product.discount}% off</span>
          </div>

          <div className="rating-row detail-rating-row">
            <span>{product.rating} ★</span>
            <span>{product.reviews} reviews</span>
            <span>{product.stock > 5 ? "In stock" : "Limited stock"}</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="detail-meta-grid">
            <div>
              <strong>Seller</strong>
              <p>{product.seller}</p>
            </div>
            <div>
              <strong>Delivery</strong>
              <p>{product.deliveryEstimate}</p>
            </div>
          </div>

          <div className="pincode-box">
            <label htmlFor="pincode">Delivery pincode</label>
            <input id="pincode" type="text" value={pincode} onChange={(e) => handlePincodeChange(e.target.value)} placeholder="Enter 6-digit pincode" />
            <p className="delivery-message">{deliveryStatus}</p>
          </div>

          <div className="detail-actions">
            <button type="button" className="button button-primary" onClick={() => onAddToCart(product)}>Add To Cart</button>
            <button type="button" className="button button-secondary" onClick={() => onToggleWishlist(product)}>{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</button>
            <button type="button" className="button button-outline" onClick={() => { onAddToCart(product); navigate("/cart"); }}>Buy Now</button>
          </div>

          <div className="detail-summary">
            <h2>Product details</h2>
            <ul>
              <li>Brand: {product.brand}</li>
              <li>Category: {product.category}</li>
              <li>Availability: {product.stock > 5 ? "Plenty in stock" : "Limited stock"}</li>
              <li>{product.freeDelivery ? "Free delivery available" : "Standard delivery charges apply"}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="detail-navigation">
        <Link to="/" className="button button-secondary">Back to marketplace</Link>
      </div>
    </div>
  );
}

export default ProductDetail;
