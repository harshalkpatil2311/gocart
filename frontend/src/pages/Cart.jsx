import { Link, useNavigate } from "react-router-dom";

function Cart({ cart, onRemoveFromCart, onUpdateQuantity }) {
  const navigate = useNavigate();

  const subtotal  = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const savings   = cart.reduce((s, i) => i.originalPrice ? s + (i.originalPrice - i.price) * i.quantity : s, 0);
  const delivery  = subtotal >= 499 ? 0 : 49;
  const total     = subtotal + delivery;
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 min-h-[calc(100vh-10rem)] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-lg w-full max-w-2xl">
          <div className="mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-slate-50">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" className="h-40 w-40 object-contain opacity-80" />
          </div>
          <h2 className="mb-3 text-3xl font-black text-slate-900 tracking-tight">Your cart is feeling lonely</h2>
          <p className="mb-8 max-w-md text-lg text-slate-600">Explore our massive catalog and find something you love to fill it up.</p>
          <Link to="/" className="rounded-xl bg-primary-600 px-8 py-4 font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-500 hover:shadow-primary-500/30">
            Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          🛒 Your Cart <span className="text-xl font-medium text-slate-500">({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
        </h1>
        <p className="mt-2 text-slate-600">Review your items and proceed to checkout.</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <article key={item.id} className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:p-6">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                  onError={(e) => { e.target.src = "https://placehold.co/100x100/f1f5f9/64748b?text=?"; }}
                />
              </div>

              <div className="flex-1">
                <h3 className="mb-1 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mb-2 text-xs font-medium text-slate-500">Seller: {item.seller} • {item.category}</p>
                {item.delivery === "Free Delivery" && (
                  <p className="mb-3 text-xs font-bold text-success-600">✓ Free Delivery</p>
                )}
                
                <div className="flex items-center gap-4">
                  <div className="flex h-9 items-center rounded-md ring-1 ring-inset ring-slate-300">
                    <button
                      type="button"
                      className="flex h-full w-8 items-center justify-center font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-l-md transition-colors"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="flex h-full w-10 items-center justify-center border-x border-slate-300 text-sm font-bold bg-slate-50">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="flex h-full w-8 items-center justify-center font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-r-md transition-colors"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                  
                  <button
                    type="button"
                    className="text-sm font-bold text-red-500 hover:text-red-700 hover:underline"
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end sm:w-32">
                <strong className="text-xl font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</strong>
                {item.originalPrice && (
                  <p className="mt-1 text-xs text-slate-500 line-through">
                    ₹{(item.originalPrice * item.quantity).toLocaleString()}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-96 shrink-0 lg:sticky lg:top-24">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-6 text-xl font-bold text-slate-900">💳 Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium text-slate-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className={`font-bold ${delivery === 0 ? "text-success-600" : "text-slate-900"}`}>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>
              
              {savings > 0 && (
                <div className="rounded-md bg-success-50 p-3 text-success-700 ring-1 ring-inset ring-success-600/20">
                  <span className="font-bold">🎉 You save ₹{savings.toLocaleString()}</span> on this order!
                </div>
              )}
              
              <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-black text-slate-900">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-primary-600 px-4 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => alert("Checkout coming soon! This is a demo.")}
              id="checkout-btn"
            >
              Proceed to Checkout →
            </button>

            <button
              type="button"
              className="mt-3 w-full rounded-lg bg-white px-4 py-3 font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-50"
              onClick={() => navigate("/")}
            >
              ← Continue Shopping
            </button>

            {subtotal < 499 && (
              <p className="mt-4 text-center text-xs font-medium text-slate-500">
                Add ₹{(499 - subtotal).toLocaleString()} more for free delivery
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
