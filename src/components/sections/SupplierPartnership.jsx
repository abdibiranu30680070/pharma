import { Award, FileCheck, DollarSign, Warehouse, ArrowRight, ShieldCheck, CheckCircle2, Globe2 } from 'lucide-react';
import { siteData } from '../../data/siteData';
import { Link } from 'react-router-dom';

const iconMap = { Award, FileCheck, DollarSign, Warehouse };

export default function SupplierPartnership() {
  const { supplierPartnership } = siteData;

  return (
    <section className="section-shell-tight relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
            Global Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight mb-4">
            {supplierPartnership.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {supplierPartnership.subtitle}
          </p>
        </div>

        {/* 4 Partnership Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supplierPartnership.pillars.map((item) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <div 
                key={item.title}
                className="bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 rounded-3xl p-7 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-white mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership Criteria & CTA Box */}
        <div className="bg-gradient-to-r from-primary/20 via-slate-800 to-primary/10 rounded-3xl p-8 sm:p-12 border border-white/15 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Ready to Expand into Ethiopia & East Africa?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                We manage complete EFDA regulatory filings, provide 1,200 sq. m WHO GDSP cold-chain warehousing, and ensure timely LC settlements backed by our self-generated agricultural forex buffer.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-emerald-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> WHO-GMP / ISO / CE Compliant</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Exclusive Representation Preferred</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Full Dossier Registration Support</span>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-primary hover:bg-blue-600 text-white font-black text-sm px-8 py-4 rounded-2xl transition-all shadow-xl shadow-primary/30 hover:scale-105"
              >
                <span>Initiate Principal Inquiry</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
