import { Award, Users, Target, Eye } from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function About({ showHeader = true }) {
  return (
    <section className="section-shell-tight relative bg-white">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {showHeader && (
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">About Us</p>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-5 drop-shadow-sm">{siteData.about.title}</h2>
            <p className="text-primary font-extrabold max-w-2xl mx-auto text-base md:text-lg leading-relaxed bg-primary/10 p-5 rounded-2xl border border-primary/20 shadow-inner">{siteData.about.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-7 md:mb-8">
          {[
            { icon: Award, value: siteData.about.experience, label: 'Industry Experience' },
            { icon: Users, value: siteData.about.team, label: 'Dedicated Staff' },
            { icon: Target, value: 'Mission', label: 'Excellence in Care' },
            { icon: Eye, value: 'Vision', label: 'Trusted Distribution' },
          ].map((item) => (
            <div key={item.label} className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-primary/20">
                <item.icon className="text-primary" size={24} />
              </div>
              <p className="text-xl font-extrabold font-heading text-slate-900 mb-1">{item.value}</p>
              <p className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-7 md:mb-8">
          <div className="glass-card p-7 rounded-2xl">
            <h3 className="text-base font-bold font-heading text-slate-900 mb-3 flex items-center gap-2">
              <Target className="text-primary" size={18} /> Our Mission
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{siteData.about.mission}</p>
          </div>
          <div className="glass-card p-7 rounded-2xl">
            <h3 className="text-base font-bold font-heading text-slate-900 mb-3 flex items-center gap-2">
              <Eye className="text-primary" size={18} /> Our Vision
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{siteData.about.vision}</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Values</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {siteData.about.values.map((v) => (
              <span key={v} className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-lg text-xs font-bold">{v}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}