import { Link } from "react-router-dom";

function StarRating({ rating }) {
  return (
    <div className="flex" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= Math.round(rating) ? "text-warning-500" : "text-slate-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-slate-100 p-3 flex items-center justify-center h-[140px] sm:h-[150px] md:h-[160px] lg:h-[180px]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://placehold.co/400x400/f1f5f9/64748b?text=No+Image";
          }}
        />

        {/* Badges */}
        {product.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-2 py-1 text-[0.65rem] font-bold text-white shadow-sm">
            {product.discount}% OFF
          </span>
        )}
        
        {product.badges?.[0] && !product.discount && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900 px-2 py-1 text-[0.65rem] font-bold text-white shadow-sm">
            {product.badges[0]}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist();
          }}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-1 ring-slate-200 transition-colors ${
            isWishlisted 
              ? "bg-accent-50 text-accent-500 hover:bg-accent-100" 
              : "bg-white text-slate-400 hover:text-accent-500"
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        {/* Meta */}
        <div className="mb-2 flex items-center gap-2 text-[0.7rem] uppercase tracking-wider text-slate-500">
          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-bold text-slate-600">{product.category}</span>
          <span className="truncate">{product.seller}</span>
        </div>

        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-sm font-bold leading-tight text-slate-900" title={product.title}>
          {product.title}
        </h3>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-600">
          <StarRating rating={product.rating} />
          <span className="font-bold text-slate-900">{product.rating}</span>
          <span>({product.reviews?.toLocaleString()})</span>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="mb-1 flex items-baseline gap-2">
            <span className="text-lg font-black text-slate-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          {/* Savings & Delivery */}
          <div className="mb-4 flex flex-col gap-1 text-[0.7rem] font-medium">
            {savings > 0 && <span className="text-success-600">Save ₹{savings.toLocaleString()}</span>}
            {product.delivery === "Free Delivery" ? (
              <span className="flex items-center gap-1 text-slate-600"><span className="text-success-500">✓</span> Free delivery</span>
            ) : (
              <span className="flex items-center gap-1 text-slate-500">📦 Paid delivery</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart();
              }}
              className="flex-1 rounded-md bg-primary-600 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Add
            </button>
            <Link
              to={`/product/${product.id}`}
              className="flex-1 rounded-md bg-white py-1.5 text-center text-xs font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
