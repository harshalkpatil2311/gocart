function Cart({ cart, onRemoveFromCart, onUpdateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="page-shell">
        <section className="page-header">
          <h1>Your cart is empty</h1>
          <p>Add products to your cart to see them here.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <section className="page-header">
        <h1>Your Cart</h1>
        <p>Review your items before checkout.</p>
      </section>

      <div className="cart-grid">
        <div className="cart-items">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.seller}</p>
                <div className="cart-actions">
                  <button type="button" className="button button-outline" onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" className="button button-outline" onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <div>
                <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
                <button type="button" className="button button-secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <p>Subtotal ({cart.length} items)</p>
          <strong>₹{total.toLocaleString()}</strong>
          <button type="button" className="button button-primary">Proceed to checkout</button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
