import SellerStatsCards from "../components/seller/SellerStatsCards";
import SellerQuickActions from "../components/seller/SellerQuickActions";
import SellerPerformance from "../components/seller/SellerPerformance";
import SellerOrdersTable from "../components/seller/SellerOrdersTable";
import SellerInsights from "../components/seller/SellerInsights";

function Seller() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-1 block text-sm font-bold uppercase tracking-wider text-primary-600">Seller Hub</span>
            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Dashboard</h1>
            <p className="mt-1 text-slate-600">Welcome back, Harshal. Here's what's happening with your store today.</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
              Download Report
            </button>
            <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              + Add Product
            </button>
          </div>
        </div>

        {/* Top Summary & Secondary Row */}
        <div className="mb-8">
          <SellerStatsCards />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left Column (Wider) */}
          <div className="space-y-8 lg:col-span-2">
            <SellerOrdersTable />
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <SellerQuickActions />
              <SellerPerformance />
            </div>
          </div>

          {/* Right Column (Narrower) */}
          <div className="lg:col-span-1">
            <SellerInsights />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Seller;
