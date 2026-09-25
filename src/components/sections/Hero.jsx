import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteData } from "../../data/siteData";
import {
  Shield,
  ArrowRight,
  Globe2,
} from "lucide-react";

const HERO_SLIDES = [
  "/hero-pharmacy-bg.jpg",
  "/hero-pharmacy-bg_1.jfif",
  "/hero-pharmacy-bg_2.jpg",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Background image cross-fading carousel */}
      <div className="absolute inset-0 bg-[#071224]">
        {HERO_SLIDES.map((slideSrc, idx) => (
          <div
            key={slideSrc}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slideSrc}
              alt={`Pharmakon Slide ${idx + 1}`}
              className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                idx === currentSlide ? "scale-105" : "scale-100"
              }`}
            />
          </div>
        ))}

        {/* Soft overlay for crystal-clear image visibility and contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071224]/85 via-[#071224]/50 to-[#071224]/20" />
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
          <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-400/30 bg-blue-950/50 backdrop-blur-md px-4 py-2 shadow-lg">
            <Shield size={15} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/95">
              {siteData.hero.badge}
            </span>
          </div>

          {/* Main heading */}
          <div className="space-y-2">
            <p className="text-blue-300 font-extrabold uppercase tracking-[0.2em] text-xs md:text-sm drop-shadow-md">
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5"
            >
              <span>Explore Operational Portfolio</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/network"
              className="group inline-flex items-center justify-center gap-3 bg-white/15 hover:bg-white/25 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl border border-white/30 backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:-translate-y-0.5"
            >
              <Globe2 size={18} className="text-blue-300" />
              <span>International Supplier Partnership</span>
            </Link>
          </div>

          {/* Hero Statistics Ribbon */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
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
          </div> */}

        </div>
      </div>
    </section>
  );
}