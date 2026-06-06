function FilterSidebar({
  priceRange,
  onPriceChange,
  ratingFilter,
  onRatingChange,
  sellerFilter,
  onSellerChange,
  uniqueSellers,
  onResetFilters,
}) {
  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900">Filters</h2>
          <button
            onClick={onResetFilters}
            className="text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline"
          >
            Clear All
          </button>
        </div>



        {/* Price Range */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Price
          </h3>
          <div className="space-y-2">
            {[
              { id: "all", label: "Any Price" },
              { id: "budget", label: "Under ₹5,000" },
              { id: "mid", label: "₹5,000 - ₹20,000" },
              { id: "premium", label: "Over ₹20,000" },
            ].map((range) => (
              <label key={range.id} className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="price"
                    value={range.id}
                    checked={priceRange === range.id}
                    onChange={(e) => onPriceChange(e.target.value)}
                    className="peer sr-only"
                  />
                  <div className="h-4 w-4 rounded-full border border-slate-300 bg-white transition-all peer-checked:border-primary-500 peer-checked:border-4"></div>
                </div>
                <span className={`text-sm ${priceRange === range.id ? 'font-bold text-slate-900' : 'font-medium text-slate-600 group-hover:text-slate-900'}`}>
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Customer Rating
          </h3>
          <div className="space-y-2">
            {[
              { id: "all", label: "All Ratings" },
              { id: "4", label: "4★ & above" },
              { id: "3", label: "3★ & above" },
              { id: "2", label: "2★ & above" },
            ].map((rating) => (
              <label key={rating.id} className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating.id}
                    checked={ratingFilter === rating.id}
                    onChange={(e) => onRatingChange(e.target.value)}
                    className="peer sr-only"
                  />
                  <div className="h-4 w-4 rounded-full border border-slate-300 bg-white transition-all peer-checked:border-primary-500 peer-checked:border-4"></div>
                </div>
                <span className={`text-sm ${ratingFilter === rating.id ? 'font-bold text-slate-900' : 'font-medium text-slate-600 group-hover:text-slate-900'}`}>
                  {rating.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Seller */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
            Seller
          </h3>
          <select
            value={sellerFilter}
            onChange={(e) => onSellerChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            {uniqueSellers.map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "Any Seller" : s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
