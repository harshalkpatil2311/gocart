import { useState } from "react";
import SellerStatsCards from "../components/seller/SellerStatsCards";
import SellerQuickActions from "../components/seller/SellerQuickActions";
import SellerPerformance from "../components/seller/SellerPerformance";
import SellerOrdersTable from "../components/seller/SellerOrdersTable";
import SellerInsights from "../components/seller/SellerInsights";

function Seller() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 py-8 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-1 block text-sm font-bold uppercase tracking-wider text-primary-600">Seller Hub</span>
            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">Dashboard</h1>
            <p className="mt-1 text-slate-600">Welcome back, Harshal. Here's what's happening with your store today.</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
              onClick={() => alert("Report downloaded successfully!")}
            >
              Download Report
            </button>
            <button 
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => setShowAddModal(true)}
            >
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
              <SellerQuickActions onActionClick={(title) => alert(`Opening ${title} view...`)} />
              <SellerPerformance />
            </div>
          </div>

          {/* Right Column (Narrower) */}
          <div className="lg:col-span-1">
            <SellerInsights />
          </div>

        </div>

      </div>

      {/* Add Product Mock Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
            <h2 className="mb-6 text-2xl font-black text-slate-900">Add New Product</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">Product Name</label>
                <input type="text" className="w-full rounded-lg border-0 py-2 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary-600" placeholder="e.g. Wireless Headphones" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">Price (₹)</label>
                <input type="number" className="w-full rounded-lg border-0 py-2 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-primary-600" placeholder="0.00" />
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button className="rounded-lg px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-bold text-white hover:bg-primary-500" onClick={() => { alert("Product added successfully!"); setShowAddModal(false); }}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Seller;
