import { FiPackage, FiTag, FiBarChart2, FiSettings } from "react-icons/fi";

const ACTIONS = [
  { id: 1, title: "Manage Products", desc: "Add, edit or delete your listings", icon: FiPackage, color: "text-blue-600", bg: "bg-blue-50" },
  { id: 2, title: "Active Offers", desc: "Create coupons and discounts", icon: FiTag, color: "text-accent-600", bg: "bg-accent-50" },
  { id: 3, title: "View Analytics", desc: "Check your sales performance", icon: FiBarChart2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: 4, title: "Store Settings", desc: "Manage policies and details", icon: FiSettings, color: "text-slate-600", bg: "bg-slate-100" },
];

function SellerQuickActions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-4 text-lg font-bold text-slate-900">⚡ Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className="group flex w-full items-start gap-4 rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-primary-300 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${action.bg} transition-transform group-hover:scale-110`}>
              <action.icon className={`h-6 w-6 ${action.color}`} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-primary-700">{action.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SellerQuickActions;
