import { Map, Warehouse, Snowflake, BarChart } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { Map, Warehouse, Snowflake, BarChart };

export default function Distribution() {
  return (
    <section className="section-shell-tight section-tint relative bg-slate-50/50">
      <div className="group cursor-pointer transition-colors duration-300 hover:bg-primary/10 p-4 rounded-2xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 transition-colors duration-300 group-hover:text-primary">{siteData.distribution.title}</h2>
          <p className="text-slate-900 font-bold max-w-3xl mx-auto text-lg leading-relaxed transition-colors duration-300 group-hover:text-primary">{siteData.distribution.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {siteData.distribution.features.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <div key={f.name} className="glass-card p-6 rounded-2xl bg-white border border-slate-100">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border border-primary/20">
                  <Icon className="text-primary" size={20} />
                </div>
                <h3 className="text-sm font-bold font-heading text-slate-900 mb-2">{f.name}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
