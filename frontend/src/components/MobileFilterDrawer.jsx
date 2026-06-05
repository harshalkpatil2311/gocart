import FilterSidebar from "./FilterSidebar";

function MobileFilterDrawer({
  isOpen,
  onClose,
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* We can just reuse the internal content of FilterSidebar without the aside wrapper, 
              but for simplicity, we render FilterSidebar and override its hidden class */}
          <div className="mobile-filter-wrapper [&>aside]:static [&>aside]:block [&>aside]:h-auto [&>aside]:w-full [&>aside]:shadow-none [&>aside]:ring-0 [&>aside]:p-0">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              priceRange={priceRange}
              onPriceChange={onPriceChange}
              ratingFilter={ratingFilter}
              onRatingChange={onRatingChange}
              uniqueSellers={uniqueSellers}
              sellerFilter={sellerFilter}
              onSellerChange={onSellerChange}
              onResetFilters={() => {
                onResetFilters();
                onClose();
              }}
            />
          </div>
        </div>

        <div className="border-t border-slate-200 p-4">
          <button
            onClick={onClose}
            className="w-full rounded-md bg-primary-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileFilterDrawer;
