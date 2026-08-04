import { CheckCircle, Handshake, Zap, DollarSign, Users, Layers, Headphones, Award } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { CheckCircle, Handshake, Zap, DollarSign, Users, Layers, Headphones, Award };

export default function WhyChooseUs() {
  return (
    <section className="section-shell relative bg-slate-50/50 overflow-hidden">
      {/* Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-none mx-auto px-5 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3 border border-primary/20 shadow-sm">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-3">
            {siteData.whyChooseUs.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Reasons to trust Pharmakon as your pharmaceutical partner
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {siteData.whyChooseUs.reasons.map((r) => {
            const Icon = iconMap[r.icon];
            return (
              <div key={r.name} className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl"></div>
                <div className="h-full glass-card p-8 rounded-3xl text-center bg-white/70 backdrop-blur-xl border border-slate-200/60 hover:border-primary/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20 transition-all duration-500 shadow-inner">
                    <Icon className="text-primary group-hover:text-blue-700 transition-colors drop-shadow-sm" size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-black font-heading text-slate-900 mb-2.5 group-hover:text-primary transition-colors">{r.name}</h3>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed">{r.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
