import { CheckCircle, Handshake, Warehouse, Zap, DollarSign, Award, Layers, Building2 } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { CheckCircle, Handshake, Warehouse, Zap, DollarSign, Award, Layers, Building2 };

export default function WhyChooseUs() {
  return (
    <section className="section-shell relative bg-slate-50/70 overflow-hidden py-16 md:py-24">
      {/* Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-none mx-auto px-5 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3 border border-primary/20 shadow-sm">
            Competitive Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 mb-4">
            {siteData.whyChooseUs.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A decade of operational excellence, institutional compliance, and digital supply chain integrity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {siteData.whyChooseUs.reasons.map((r) => {
            const Icon = iconMap[r.icon] || CheckCircle;
            return (
              <div key={r.name} className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl"></div>
                <div className="h-full glass-card p-7 rounded-3xl text-center bg-white/80 backdrop-blur-xl border border-slate-200/70 hover:border-primary/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20 transition-all duration-500 shadow-inner text-primary">
                      <Icon size={28} strokeWidth={2.2} />
                    </div>
                    <h3 className="text-base font-black font-heading text-slate-900 mb-2.5 group-hover:text-primary transition-colors leading-snug">
                      {r.name}
                    </h3>
                  </div>
                  <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed mt-2">
                    {r.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
