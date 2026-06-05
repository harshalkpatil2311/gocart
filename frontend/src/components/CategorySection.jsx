const CATEGORY_META = [
  { name: "Mobiles",     emoji: "📱", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80" },
  { name: "Electronics", emoji: "🎧", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80" },
  { name: "Fashion",     emoji: "👗", image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80" },
  { name: "Appliances",  emoji: "🏠", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" },
  { name: "Grocery",     emoji: "🛒", image: "https://images.unsplash.com/photo-1505577058444-a3dab7d73fc8?auto=format&fit=crop&w=400&q=80" },
  { name: "Beauty",      emoji: "💄", image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" },
  { name: "Books",       emoji: "📚", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
];

function CategorySection({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-8 overflow-hidden rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        <button
          onClick={() => onCategoryChange("All")}
          className={`flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg p-3 w-24 transition-all ${
            selectedCategory === "All" 
              ? "bg-primary-50 ring-2 ring-primary-500 scale-105" 
              : "hover:bg-slate-50 hover:scale-105"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-2xl shadow-inner">
            🌟
          </div>
          <span className={`text-xs font-medium ${selectedCategory === "All" ? "text-primary-700 font-bold" : "text-slate-700"}`}>
            All
          </span>
        </button>

        {CATEGORY_META.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onCategoryChange(cat.name)}
            className={`flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg p-3 w-24 transition-all ${
              selectedCategory === cat.name 
                ? "bg-primary-50 ring-2 ring-primary-500 scale-105" 
                : "hover:bg-slate-50 hover:scale-105"
            }`}
          >
            <div className="h-12 w-12 overflow-hidden rounded-full shadow-inner ring-1 ring-slate-200">
              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <span className={`text-xs font-medium ${selectedCategory === cat.name ? "text-primary-700 font-bold" : "text-slate-700"}`}>
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
