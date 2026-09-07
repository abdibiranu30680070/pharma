import { CheckCircle, Target, Eye, Award, Users, Building2, Warehouse, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteData } from '../../data/siteData';
import { Link } from 'react-router-dom';

export default function About({ showHeader = true }) {
  return (
    <section className="section-shell-tight relative bg-white py-16 md:py-24">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">

          {/* Left — Image Showcase */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <img
                src="/about-pharmacy.jpg"
                alt="Pharmakon Headquarters & Team"
                className="w-full h-[450px] lg:h-[540px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Floating Infrastructure Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Custom 5-Story Corporate HQ</p>
                    <p className="text-[11px] text-slate-500 font-medium">Addis Ababa, Ethiopia · 1,200 m² Central Hub</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent styling dots */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full filter blur-xl -z-10" />
          </div>

          {/* Right — Text Content */}
          <div className="space-y-6">
            {showHeader && (
              <div>
                <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
                  Corporate Profile
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 leading-tight">
                  Welcome to <br />
                  <span className="text-primary">{siteData.company.name}</span>
                </h2>
              </div>
            )}

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {siteData.about.summary}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              {siteData.about.description}
            </p>

            {/* Core Capability Checklist */}
            <div className="space-y-3 pt-2">
              {[
                'Full regulatory licensing by the Ethiopian Food and Drug Authority (EFDA)',
                '1,200 sq. m central logistics facility aligned with WHO Good Storage Practices',
                'Enterprise-wide Odoo ERP integration for batch traceability & FEFO control',
                'Over 150 completed commercial import operations with 50+ global principals',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={13} className="text-emerald-600" />
                  </div>
                  <span className="text-slate-700 text-xs sm:text-sm font-semibold">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-bold text-sm group"
              >
                <span>Read Full Corporate Profile & History</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Corporate Milestones Timeline */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
              Evolution & Milestones
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
              A Decade of Growth & Strategic Scalability
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {siteData.milestones.map((m, idx) => (
              <div 
                key={m.year}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 hover:bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-md inline-block mb-3">
                    {m.year}
                  </span>
                  <h4 className="text-sm font-bold font-heading text-slate-900 mb-2">{m.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="glass-card p-8 rounded-3xl bg-gradient-to-br from-blue-50/70 to-white border border-blue-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
              <Eye size={24} />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">Our Vision (2034)</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{siteData.about.vision}</p>
          </div>

          <div className="glass-card p-8 rounded-3xl bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-100 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200">
              <Target size={24} />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-900 mb-2">Our Mission</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{siteData.about.mission}</p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
              Ethical Pillars
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
              Our Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.about.coreValues.map((val) => (
              <div 
                key={val.title}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <h4 className="text-sm font-bold font-heading text-slate-900">{val.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}