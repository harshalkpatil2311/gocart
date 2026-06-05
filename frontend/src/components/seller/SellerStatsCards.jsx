import { FiBox, FiShoppingCart, FiDollarSign, FiStar, FiClock, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";

const TOP_CARDS = [
  { id: 1, title: "Total Products", value: "1,248", growth: "+12% this month", icon: FiBox, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600", growthColor: "text-success-600" },
  { id: 2, title: "Total Orders", value: "8,542", growth: "+8.5% this month", icon: FiShoppingCart, color: "from-purple-500 to-purple-600", bg: "bg-purple-50", text: "text-purple-600", growthColor: "text-success-600" },
  { id: 3, title: "Total Revenue", value: "₹24.5L", growth: "+15% this month", icon: FiDollarSign, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-600", growthColor: "text-success-600" },
  { id: 4, title: "Average Rating", value: "4.8/5", growth: "+0.2 from last month", icon: FiStar, color: "from-amber-400 to-amber-500", bg: "bg-amber-50", text: "text-amber-600", growthColor: "text-success-600" },
];

const SECOND_ROW = [
  { id: 1, title: "Today's Orders", value: "142", icon: FiClock, color: "text-indigo-600" },
  { id: 2, title: "Pending Shipments", value: "28", icon: FiTruck, color: "text-warning-600" },
  { id: 3, title: "Delivered Orders", value: "89", icon: FiCheckCircle, color: "text-success-600" },
  { id: 4, title: "Cancelled Orders", value: "3", icon: FiXCircle, color: "text-red-500" },
];

function SellerStatsCards() {
  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TOP_CARDS.map((card) => (
          <div 
            key={card.id} 
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-slate-500">{card.title}</p>
                <h3 className="mt-2 text-3xl font-black text-slate-900">{card.value}</h3>
              </div>
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-inner`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-xs font-bold ${card.growthColor}`}>↑ {card.growth}</span>
            </div>
            {/* Subtle background glow effect on hover */}
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${card.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-50 blur-2xl`}></div>
          </div>
        ))}
      </div>

      {/* Second Row Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SECOND_ROW.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 ${item.color}`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{item.title}</p>
              <h4 className="text-xl font-black text-slate-900">{item.value}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerStatsCards;
