import { Map, Warehouse, Snowflake, BarChart } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { Map, Warehouse, Snowflake, BarChart };

export default function Distribution({ showHeader = true }) {
  return (
    <section className="py-16 md:py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              Distribution Network
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-3">
              {siteData.distribution.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              {siteData.distribution.description}
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.distribution.features.map((f) => {
            const Icon = iconMap[f.icon] || Map;
            return (
              <div 
                key={f.name} 
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-4 border border-emerald-100">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 mb-2">{f.name}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
