import { CheckCircle, Handshake, Zap, DollarSign, Users, Layers, Headphones, Award } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { CheckCircle, Handshake, Zap, DollarSign, Users, Layers, Headphones, Award };

export default function WhyChooseUs() {
  return (
    <section className="section-shell relative bg-white">
      <div className="w-full max-w-none mx-auto px-5 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-5 drop-shadow-sm">{siteData.whyChooseUs.title}</h2>
          <p className="text-primary font-extrabold max-w-2xl mx-auto text-base md:text-lg leading-relaxed bg-primary/10 p-5 rounded-2xl border border-primary/20 shadow-inner">Reasons to trust Pharmakon as your pharmaceutical partner</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {siteData.whyChooseUs.reasons.map((r) => {
            const Icon = iconMap[r.icon];
            return (
              <div key={r.name} className="glass-card p-6 rounded-2xl text-center bg-white border border-slate-100 hover:border-primary/50 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-primary/30 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300 shadow-sm">
                  <Icon className="text-primary group-hover:text-blue-700 transition-colors" size={32} strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-black font-heading text-slate-900 mb-2 group-hover:text-primary transition-colors">{r.name}</h3>
                <p className="text-slate-600 font-medium text-sm leading-relaxed group-hover:text-slate-800 transition-colors">{r.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
