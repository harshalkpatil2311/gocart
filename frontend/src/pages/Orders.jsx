import { Link } from "react-router-dom";

function Orders() {
  // Mock orders data for the UI since we are using only mock data
  const mockOrders = [
    {
      id: "ORD-98234-A",
      date: "2026-06-01",
      status: "Delivered",
      total: 34999,
      items: [
        { name: "Home Espresso Machine", qty: 1, price: 34999, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=150&q=80" }
      ]
    },
    {
      id: "ORD-98235-B",
      date: "2026-06-03",
      status: "Processing",
      total: 4799,
      items: [
        { name: "Running Sneakers - Pro Series", qty: 1, price: 4799, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80" }
      ]
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Your Orders</h1>
            <p className="mt-2 text-slate-600">Track, return, or buy things again.</p>
          </div>
          <Link to="/" className="text-sm font-bold text-primary-600 hover:text-primary-700 hover:underline">
            Continue Shopping
          </Link>
        </div>

        {mockOrders.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">📦</div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">No orders placed yet</h3>
            <p className="mb-6 text-slate-600">Looks like you haven't made your first purchase.</p>
            <Link to="/" className="inline-block rounded-xl bg-primary-600 px-6 py-3 font-bold text-white shadow-sm hover:bg-primary-500">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map(order => (
              <div key={order.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="border-b border-slate-200 bg-slate-100/50 px-6 py-4 sm:flex sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-x-8 gap-y-2">
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Order Placed</span>
                      <span className="text-sm font-medium text-slate-900">{order.date}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Total</span>
                      <span className="text-sm font-medium text-slate-900">₹{order.total.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Order #</span>
                      <span className="text-sm font-medium text-slate-900">{order.id}</span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-success-100 text-success-800' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {order.status === 'Delivered' ? '✅ ' : '⏳ '}{order.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="divide-y divide-slate-100">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex py-4 first:pt-0 last:pb-0">
                        <img src={item.image} alt={item.name} className="h-24 w-24 flex-shrink-0 rounded-lg object-cover border border-slate-200" />
                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                              <p className="mt-1 text-sm text-slate-500">Qty: {item.qty}</p>
                            </div>
                            <p className="text-base font-bold text-slate-900">₹{item.price.toLocaleString()}</p>
                          </div>
                          <div className="mt-auto pt-4 flex gap-3">
                            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">
                              Buy it again
                            </button>
                            <button className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                              Track package
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
