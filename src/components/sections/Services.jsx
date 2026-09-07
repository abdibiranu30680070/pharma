import { Ship, Truck, FileCheck, Snowflake, Wrench, Award, Database, Coffee } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { Ship, Truck, FileCheck, Snowflake, Wrench, Award, Database, Coffee };

export default function Services({ showHeader = true }) {
  return (
    <section className="section-shell-tight relative bg-slate-50/60 py-16 md:py-24">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
              Full-Spectrum Operations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 mb-4">
              {siteData.services.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              {siteData.services.subtitle}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.services.services.map((s) => {
            const Icon = iconMap[s.icon] || Truck;
            return (
              <div 
                key={s.name} 
                className="glass-card rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md w-11 h-11 rounded-2xl flex items-center justify-center border border-slate-200 shadow-md text-primary">
                    <Icon size={20} />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-heading text-slate-900 mb-2 group-hover:text-primary transition-colors leading-snug">
                      {s.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {s.description}
                    </p>
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
