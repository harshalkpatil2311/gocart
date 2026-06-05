const ORDERS = [
  { id: "ORD-9281", customer: "Rahul Sharma", product: "Wireless Earbuds", status: "Shipped", amount: "₹1,499", date: "Today, 10:42 AM" },
  { id: "ORD-9280", customer: "Priya Patel", product: "Smart Watch Series 5", status: "Pending", amount: "₹3,999", date: "Today, 09:15 AM" },
  { id: "ORD-9279", customer: "Amit Singh", product: "Gaming Mouse", status: "Delivered", amount: "₹899", date: "Yesterday" },
  { id: "ORD-9278", customer: "Neha Gupta", product: "Bluetooth Speaker", status: "Cancelled", amount: "₹2,199", date: "Yesterday" },
  { id: "ORD-9277", customer: "Vikram Reddy", product: "Laptop Backpack", status: "Delivered", amount: "₹1,249", date: "Oct 24, 2026" },
];

function getStatusBadge(status) {
  switch (status) {
    case "Shipped":
      return <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-600/20">Shipped</span>;
    case "Pending":
      return <span className="inline-flex items-center rounded-md bg-warning-50 px-2 py-1 text-xs font-bold text-warning-700 ring-1 ring-inset ring-warning-600/20">Pending</span>;
    case "Delivered":
      return <span className="inline-flex items-center rounded-md bg-success-50 px-2 py-1 text-xs font-bold text-success-700 ring-1 ring-inset ring-success-600/20">Delivered</span>;
    case "Cancelled":
      return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/20">Cancelled</span>;
    default:
      return <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700 ring-1 ring-inset ring-slate-600/20">{status}</span>;
  }
}

function SellerOrdersTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="border-b border-slate-200 px-6 py-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">📋 Recent Orders</h2>
        <button className="text-sm font-bold text-primary-600 hover:text-primary-700 hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4 font-bold">Order ID</th>
              <th className="px-6 py-4 font-bold">Customer</th>
              <th className="px-6 py-4 font-bold">Product</th>
              <th className="px-6 py-4 font-bold">Date</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {ORDERS.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">
                  <div className="max-w-[200px] truncate" title={order.product}>{order.product}</div>
                </td>
                <td className="px-6 py-4 text-slate-500">{order.date}</td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 text-right font-bold text-slate-900">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerOrdersTable;
