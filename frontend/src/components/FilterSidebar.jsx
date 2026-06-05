function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  ratingFilter,
  onRatingChange,
  uniqueSellers,
  sellerFilter,
  onSellerChange,
  onResetFilters
}) {
  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-[280px] shrink-0 overflow-y-auto rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>
        <button 
          onClick={onResetFilters}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Category</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="sidebar-category"
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-600"
              />
              <span className={`text-sm ${selectedCategory === cat ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6 border-slate-200" />

      {/* Price */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Price Range</h3>
        <div className="flex flex-col gap-2">
          {[
            { value: "all", label: "Any Price" },
            { value: "budget", label: "Under ₹5,000" },
            { value: "mid", label: "₹5,000 - ₹20,000" },
            { value: "premium", label: "Over ₹20,000" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="sidebar-price"
                checked={priceRange === opt.value}
                onChange={() => onPriceChange(opt.value)}
                className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-600"
              />
              <span className={`text-sm ${priceRange === opt.value ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6 border-slate-200" />

      {/* Rating */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Minimum Rating</h3>
        <div className="flex flex-col gap-2">
          {[
            { value: "4", label: "4★ & above" },
            { value: "3", label: "3★ & above" },
            { value: "2", label: "2★ & above" },
            { value: "all", label: "Any Rating" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="sidebar-rating"
                checked={ratingFilter === opt.value}
                onChange={() => onRatingChange(opt.value)}
                className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-600"
              />
              <span className={`text-sm flex items-center gap-1 ${ratingFilter === opt.value ? 'font-semibold text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6 border-slate-200" />

      {/* Seller */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Seller</h3>
        <select 
          className="w-full rounded-md border-0 bg-slate-50 py-2.5 pl-3 pr-8 text-sm text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600"
          value={sellerFilter} 
          onChange={(e) => onSellerChange(e.target.value)}
        >
          {uniqueSellers.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

    </aside>
  );
}

export default FilterSidebar;
