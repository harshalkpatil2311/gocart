import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";

/** Renders star icons for a rating value (0–5) */
function StarRating({ rating }) {
  return (
    <div className="flex" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${star <= Math.round(rating) ? "text-warning-500" : "text-slate-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ProductDetail({ onAddToCart, onToggleWishlist, wishlist, onProductView }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("Enter your pincode to check delivery availability.");
  const [deliveryOk, setDeliveryOk] = useState(null);

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
      setDeliveryStatus("🚀 Delivery available within 2-3 days!");
      setDeliveryOk(true);
    } else if (value.length === 0) {
      setDeliveryStatus("Enter your pincode to check delivery availability.");
      setDeliveryOk(null);
    } else {
      setDeliveryStatus("⚠️ Please enter a valid 6-digit pincode.");
      setDeliveryOk(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">Loading product details...</h2>
          <div className="h-96 w-full max-w-3xl animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 py-16 text-center">
          <div className="mb-4 text-6xl">🚫</div>
          <h3 className="mb-2 text-xl font-bold text-slate-900">Product not found</h3>
          <p className="mb-6 max-w-md text-slate-600">{error || "The item you were looking for is unavailable."}</p>
          <Link to="/" className="rounded-md bg-primary-600 px-6 py-2.5 font-bold text-white hover:bg-primary-500">
            ← Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = wishlist.some((item) => item.id === product.id);
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-primary-600 hover:underline">Home</Link>
        <span>/</span>
        <Link to={`/?category=${product.category}`} className="hover:text-primary-600 hover:underline">{product.category}</Link>
        <span>/</span>
        <span className="font-medium text-slate-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Area */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <img
            src={product.image}
            alt={product.name}
            className="h-auto w-full object-contain"
            onError={(e) => { e.target.src = "https://placehold.co/800x800/f1f5f9/64748b?text=Image+Unavailable"; }}
          />
        </div>

        {/* Info Area */}
        <div className="flex flex-col">
          <div className="mb-6">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
                {product.category}
              </span>
              {product.badges?.map((badge) => (
                <span key={badge} className="rounded bg-slate-900 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {badge}
                </span>
              ))}
            </div>
            
            <h1 className="mb-4 text-3xl font-black text-slate-900 sm:text-4xl">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <StarRating rating={product.rating} />
              <span className="font-bold text-slate-900">{product.rating}</span>
              <span>({product.reviews?.toLocaleString()} ratings)</span>
              <span>•</span>
              <span className="font-bold text-primary-600">{product.brand}</span>
            </div>
          </div>

          <div className="mb-6 border-y border-slate-200 py-6">
            <div className="mb-2 flex items-baseline gap-3">
              <strong className="text-4xl font-black text-slate-900">₹{product.price.toLocaleString()}</strong>
              {product.oldPrice && <span className="text-xl text-slate-500 line-through">₹{product.oldPrice.toLocaleString()}</span>}
              {product.discount > 0 && <span className="rounded-full bg-accent-100 px-3 py-1 text-sm font-bold text-accent-700">{product.discount}% OFF</span>}
            </div>
            {savings > 0 && (
              <p className="mb-1 text-sm font-bold text-success-600">
                You save ₹{savings.toLocaleString()} on this item!
              </p>
            )}
            <p className="text-xs text-slate-500">Inclusive of all taxes</p>
          </div>

          <div className="mb-8 flex flex-wrap gap-4">
            <button
              type="button"
              className="flex-1 rounded-lg bg-primary-600 px-8 py-4 font-bold text-white shadow-sm transition-colors hover:bg-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => onAddToCart(product)}
            >
              🛒 Add to Cart
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-white px-8 py-4 font-bold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-50"
              onClick={() => { onAddToCart(product); navigate("/cart"); }}
            >
              ⚡ Buy Now
            </button>
            <button
              type="button"
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg shadow-sm ring-1 ring-inset transition-colors ${
                inWishlist 
                  ? "bg-accent-50 text-accent-500 ring-accent-200 hover:bg-accent-100" 
                  : "bg-white text-slate-400 ring-slate-300 hover:text-accent-500 hover:bg-slate-50"
              }`}
              onClick={() => onToggleWishlist(product)}
              title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <span className="text-2xl">{inWishlist ? "♥" : "♡"}</span>
            </button>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-200">
            <div>
              <strong className="block text-sm text-slate-500">Sold by</strong>
              <p className="font-medium text-slate-900">{product.seller}</p>
            </div>
            <div>
              <strong className="block text-sm text-slate-500">Availability</strong>
              <p className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                product.stock > 5 ? "bg-success-100 text-success-700" : "bg-warning-100 text-warning-700"
              }`}>
                {product.stock > 5 ? `In Stock (${product.stock})` : `Only ${product.stock} left!`}
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-inset ring-slate-200">
            <label htmlFor="pincode" className="mb-2 block font-bold text-slate-900">Check Delivery</label>
            <div className="flex gap-2">
              <input
                id="pincode"
                type="text"
                value={pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                className="flex-1 rounded-md border-0 py-2.5 pl-3 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
              <button type="button" className="rounded-md bg-slate-800 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700">Check</button>
            </div>
            <p className={`mt-2 text-sm ${
              deliveryOk === false ? "text-red-600" : deliveryOk === true ? "text-success-600" : "text-slate-500"
            }`}>
              {deliveryStatus}
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-slate-900">About this item</h2>
            <p className="mb-6 text-slate-700 leading-relaxed">{product.description}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><strong className="text-slate-900">Brand:</strong> {product.brand}</li>
              <li><strong className="text-slate-900">Category:</strong> {product.category}</li>
              <li className="flex items-center gap-2">
                <span className="text-success-500">✓</span>
                {product.freeDelivery ? "Free delivery available on this product" : "Standard delivery charges apply"}
              </li>
              <li className="flex items-center gap-2"><span className="text-primary-500">✓</span> 10-day replacement policy</li>
              <li className="flex items-center gap-2"><span className="text-primary-500">✓</span> 1 Year manufacturer warranty</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
