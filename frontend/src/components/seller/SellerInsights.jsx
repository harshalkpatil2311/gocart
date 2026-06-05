import { FiTrendingUp, FiAlertCircle, FiInfo } from "react-icons/fi";

const TOP_PRODUCTS = [
  { name: "Wireless Earbuds", sales: 342, revenue: "₹5.1L" },
  { name: "Smart Watch Series 5", sales: 218, revenue: "₹8.7L" },
  { name: "Gaming Mouse", sales: 189, revenue: "₹1.7L" },
];

const LOW_STOCK = [
  { name: "Bluetooth Speaker", stock: 4, status: "Critical" },
  { name: "Laptop Backpack", stock: 12, status: "Low" },
];

function SellerInsights() {
  return (
    <div className="space-y-6">
      {/* Top Products */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center gap-2">
          <FiTrendingUp className="h-5 w-5 text-success-600" />
          <h2 className="text-lg font-bold text-slate-900">Top Selling Products</h2>
        </div>
        <ul className="divide-y divide-slate-100">
          {TOP_PRODUCTS.map((p, i) => (
            <li key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">{i + 1}</span>
                <span className="text-sm font-medium text-slate-900 truncate max-w-[120px] sm:max-w-[180px]" title={p.name}>{p.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{p.revenue}</p>
                <p className="text-xs text-slate-500">{p.sales} sales</p>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-4 w-full rounded-lg bg-slate-50 py-2.5 text-sm font-bold text-primary-600 transition-colors hover:bg-slate-100">
          View All Products
        </button>
      </div>

      {/* Low Stock Alerts */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 border-t-4 border-t-warning-500">
        <div className="mb-4 flex items-center gap-2">
          <FiAlertCircle className="h-5 w-5 text-warning-600" />
          <h2 className="text-lg font-bold text-slate-900">Inventory Alerts</h2>
        </div>
        <ul className="space-y-3">
          {LOW_STOCK.map((p, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                <p className="text-xs text-slate-500">{p.stock} units left</p>
              </div>
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ${
                p.status === "Critical" ? "bg-red-50 text-red-700 ring-red-600/20" : "bg-warning-50 text-warning-700 ring-warning-600/20"
              }`}>
                {p.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Announcements */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-900 to-slate-900 p-6 text-white shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FiInfo className="h-5 w-5 text-primary-300" />
          <h2 className="text-lg font-bold">Seller Insights</h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-slate-300">
          Electronics category traffic is up by 24% this week. Consider running a promotional campaign on your top-performing accessories to boost conversion rates.
        </p>
        <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
          Create Promotion →
        </button>
      </div>
    </div>
  );
}

export default SellerInsights;
