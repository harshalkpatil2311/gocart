function ProgressBar({ label, value, color }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-bold text-slate-700">{label}</span>
        <span className="font-medium text-slate-900">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${color}`} 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}

function SellerPerformance() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">🎯 Seller Performance</h2>
        <span className="rounded-full bg-success-50 px-2.5 py-1 text-xs font-bold text-success-700">Excellent</span>
      </div>

      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 ring-4 ring-primary-100">
          <span className="text-xl font-black text-primary-700">92</span>
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Overall Store Score</h3>
          <p className="text-sm text-slate-500">Top 5% of sellers in your category</p>
        </div>
      </div>

      <ProgressBar label="Customer Satisfaction" value={95} color="from-success-400 to-success-500" />
      <ProgressBar label="On-Time Delivery" value={88} color="from-blue-400 to-blue-500" />
      {/* Reverse color logic for Return Rate — lower is better, so it represents "Good Orders" */}
      <ProgressBar label="Successful Orders (No Returns)" value={96} color="from-emerald-400 to-emerald-500" />
      <ProgressBar label="Response Rate" value={100} color="from-purple-400 to-purple-500" />
    </div>
  );
}

export default SellerPerformance;
