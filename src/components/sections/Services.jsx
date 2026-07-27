import { Truck, Box, Warehouse, Building2, Store, ClipboardList, Clock, Search } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { Truck, Box, Warehouse, Building2, Store, ClipboardList, Clock, Search };

export default function Services() {
  return (
    <section className="section-shell-tight section-tint relative bg-slate-50/50">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our Services</p>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-5 drop-shadow-sm">{siteData.services.title}</h2>
          <p className="text-primary font-extrabold max-w-2xl mx-auto text-base md:text-lg leading-relaxed bg-primary/10 p-5 rounded-2xl border border-primary/20 shadow-inner">Comprehensive pharmaceutical distribution and supply services</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {siteData.services.services.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <div key={s.name} className="glass-card rounded-2xl bg-white border border-slate-100 overflow-hidden flex flex-col justify-between group">
                <div className="relative h-48 overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200/50 shadow-sm">
                    <Icon className="text-primary" size={18} />
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-heading text-slate-900 mb-2 group-hover:text-primary transition-colors">{s.name}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{s.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
