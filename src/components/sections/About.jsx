import { CheckCircle, Target, Eye, Award, Users } from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function About({ showHeader = true }) {
  return (
    <section className="section-shell-tight relative bg-white py-16 md:py-24">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main About — Image Left + Text Right (like screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">

          {/* Left — Image with accent border */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/about-pharmacy.jpg"
                alt="Pharmakon Team"
                className="w-full h-[420px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Accent bar on the right edge of the image */}
            <div className="absolute top-8 -right-3 w-1.5 h-24 bg-primary rounded-full hidden lg:block" />
            <div className="absolute bottom-8 -right-3 w-1.5 h-24 bg-primary rounded-full hidden lg:block" />
          </div>

          {/* Right — Text Content */}
          <div className="space-y-6">
            {showHeader && (
              <>
                <p className="text-xs font-bold text-primary uppercase tracking-widest">About Us</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-slate-900 leading-tight">
                  Welcome to <br />
                  <span className="text-primary">Pharmakon</span>
                </h2>
              </>
            )}

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {siteData.about.description}
            </p>

            <p className="text-slate-500 text-sm leading-relaxed">
              We believe in a holistic approach to healthcare distribution, combining expert knowledge with a deep commitment to our community's health. Our values of integrity, reliability, and excellence guide everything we do.
            </p>

            {/* Bullet points */}
            <div className="space-y-3 pt-2">
              {[
                'Quality-assured pharmaceutical distribution',
                'Comprehensive range of medicines & medical supplies',
                'Dedicated to fostering healthier communities across Ethiopia',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={13} className="text-primary" />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12">
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

        {/* Mission & Vision Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
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

        {/* Core Values */}
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