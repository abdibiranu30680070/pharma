import { Search, X } from 'lucide-react';

export default function PageBanner({ title, description, showSearch = false, searchPlaceholder = "Search...", searchValue, onSearchChange }) {
  return (
    <div className="relative bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white py-10 md:py-14 overflow-hidden border-b border-emerald-900/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-white">
          {title}
        </h1>
        {description && (
          <p className="text-slate-300 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
            {description}
          </p>
        )}

        {showSearch && (
          <div className="max-w-md mx-auto pt-2">
            <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-1 flex items-center border border-white/20 shadow-lg">
              <div className="pl-3 text-slate-300">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchValue || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent border-0 text-white placeholder-slate-300 text-xs md:text-sm py-1.5 px-3 focus:outline-none focus:ring-0"
              />
              {searchValue && (
                <button
                  onClick={() => onSearchChange?.('')}
                  className="text-slate-300 hover:text-white p-1"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
