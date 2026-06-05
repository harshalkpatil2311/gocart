import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Wishlist({ wishlist, onToggleWishlist, onAddToCart }) {
  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">
          <div className="mb-6 text-7xl">❤️</div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Your wishlist is empty</h2>
          <p className="mb-8 max-w-md text-slate-600">Save products you love and revisit them later. Your wishlist is a great place to keep track of items you're interested in buying.</p>
          <Link to="/" className="rounded-lg bg-primary-600 px-8 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-primary-500">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="mb-1 block text-sm font-bold uppercase tracking-wider text-accent-600">Saved Items</span>
          <h1 className="text-3xl font-black text-slate-900">My Wishlist</h1>
          <p className="mt-1 text-slate-600">You have {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart(product)}
            onToggleWishlist={() => onToggleWishlist(product)}
            isWishlisted={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
