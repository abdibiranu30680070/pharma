import { Link } from "react-router-dom";
import { siteData } from "../../data/siteData";
import {
  Shield,
  ArrowRight,
  Globe2,
  CheckCircle2,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Full-screen background image as before */}
      <div className="absolute inset-0">
        <img
          src="/hero-pharmacy-bg.jpg"
          alt="Pharmakon Trading House PLC"
          className="h-full w-full object-cover"
        />
        {/* Soft overlay for crystal-clear image visibility and contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/75 via-[#0a1628]/55 to-[#0a1628]/30" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Top accent bar with Ethiopian national colors */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-20 flex shadow-sm">
        <div className="flex-1 bg-emerald-500" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-rose-500" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-none px-6 lg:px-16 xl:px-24 py-20">
        <div className="max-w-4xl space-y-7 animate-fade-in-up">

          {/* Compliance & Identity Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/15 backdrop-blur-md px-4 py-2 shadow-lg">
            <Shield size={15} className="text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/95">
              {siteData.hero.badge}
            </span>
          </div>

          {/* Main heading */}
          <div className="space-y-2">
            <p className="text-emerald-300 font-extrabold uppercase tracking-[0.2em] text-xs md:text-sm drop-shadow-md">
              {siteData.company.tagline}
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black leading-[1.08] text-white tracking-tight"
              style={{ textShadow: "0 4px 28px rgba(0,0,0,0.65)" }}
            >
              PHARMAKON <br />
              <span className="text-white/95">
                TRADING HOUSE PLC
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <p
            className="max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/90 font-medium"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}
          >
            {siteData.hero.subheading}
          </p>

          {/* Key Bullet Highlights */}
          <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm text-white font-semibold pt-1">
            {[
              '150+ Commercial Imports Completed',
              '5-Story Custom HQ in Addis Ababa',
              '1,200 m² Distribution Hub',
              'Enterprise Odoo ERP Automated',
            ].map((highlight) => (
              <div key={highlight} className="flex items-center gap-2" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5"
            >
              <span>Explore Operational Portfolio</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/network"
              className="group inline-flex items-center justify-center gap-3 bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl border border-white/30 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:-translate-y-0.5"
            >
              <Globe2 size={18} className="text-emerald-300" />
              <span>International Supplier Partnership</span>
            </Link>
          </div>

          {/* Hero Statistics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
            {siteData.hero.stats.map((st) => (
              <div key={st.label} className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-md hover:bg-white/15 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight drop-shadow-md">
                  {st.value}
                </div>
                <div className="text-[11px] font-semibold text-white/80 uppercase tracking-wider mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}