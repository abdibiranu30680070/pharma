import { Search, X } from 'lucide-react';

export default function PageBanner({ title, description, showSearch = false, searchPlaceholder = "Search...", searchValue, onSearchChange }) {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white min-h-[25vh] py-12 pt-16 overflow-hidden">
      <div className="bg-blob -top-20 -left-20 animate-float opacity-30"></div>
      <div className="bg-blob-secondary bottom-10 right-10 animate-float-delayed opacity-20"></div>
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight animate-slide-in">
          {title}
        </h1>
        {description && (
          <p className="text-blue-200 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}

        {showSearch && (
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative glass-panel rounded-2xl p-1.5 flex items-center border border-white/20 shadow-xl">
              <div className="pl-3 text-slate-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchValue || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent border-0 text-white placeholder-slate-400 text-sm py-2 px-3.5 focus:outline-none focus:ring-0"
              />
              {searchValue && (
                <button
                  onClick={() => onSearchChange?.('')}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
