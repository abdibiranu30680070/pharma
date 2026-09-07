import { Map, Warehouse, Snowflake, BarChart } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { Map, Warehouse, Snowflake, BarChart };

export default function Distribution({ showHeader = true }) {
  return (
    <section className="py-16 md:py-24 bg-slate-50/80 relative">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
              Logistics & Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 mb-4">
              {siteData.distribution.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
                className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-base font-bold font-heading text-slate-900 mb-2.5 group-hover:text-primary transition-colors">{f.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
