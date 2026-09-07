import { Coffee, Factory, ShieldCheck, TrendingUp, Globe2, Cpu, CheckCircle2 } from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function StrategicGrowth() {
  const { strategicPillars } = siteData;

  return (
    <section className="section-shell-tight relative bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 border-t border-slate-100">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
            Long-Term Sustainability
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight mb-4">
            {strategicPillars.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {strategicPillars.subtitle}
          </p>
        </div>

        {/* Two-Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {strategicPillars.pillars.map((pillar) => {
            const isCoffee = pillar.icon === 'Coffee';
            const Icon = isCoffee ? Coffee : Factory;
            return (
              <div 
                key={pillar.number}
                className="glass-card rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
              >
                {/* Accent glow corner */}
                <div className={`absolute top-0 right-0 w-44 h-44 rounded-bl-full filter blur-2xl opacity-20 pointer-events-none ${isCoffee ? 'bg-amber-500' : 'bg-primary'}`} />
                
                <div>
                  {/* Top Row: Number & Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-4xl font-black font-heading text-slate-300 group-hover:text-primary transition-colors">
                      {pillar.number}
                    </span>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
                      isCoffee 
                        ? 'bg-amber-50 text-amber-800 border-amber-200' 
                        : 'bg-blue-50 text-primary border-primary/20'
                    }`}>
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm ${
                      isCoffee 
                        ? 'bg-amber-100/60 text-amber-800 border-amber-200' 
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 leading-snug">
                      {pillar.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Key Points */}
                <div className="pt-6 border-t border-slate-100 space-y-3">
                  {pillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isCoffee ? 'text-amber-600' : 'text-primary'}`} />
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-normal">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Growth Enablers Strip */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-emerald-500/20 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Foundation for Scale</p>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Resilience Through Operational Excellence
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strategicPillars.growthElements.map((elem, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {elem.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {elem.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
