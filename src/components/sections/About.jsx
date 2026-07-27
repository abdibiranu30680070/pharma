import { Award, Users, Target, Eye } from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function About() {
  return (
    <section className="section-shell-tight relative bg-white">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center section-heading mb-10 group cursor-default">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 mb-6 transition-colors duration-300 group-hover:text-primary">{siteData.about.title}</h2>
          <div className="max-w-4xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:shadow-lg group-hover:-translate-y-2 group-hover:scale-[1.02]">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed transition-all duration-300 group-hover:text-primary group-hover:font-bold">{siteData.about.description}</p>
          </div>
        </div>

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