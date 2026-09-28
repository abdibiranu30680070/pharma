import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { siteData } from "../../data/siteData";
import {
  Shield,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";

const HERO_IMAGES = [
  {
    src: "/logo.png",
    alt: "Pharmakon Trading House PLC Logo",
    isLogo: true,
  },
  {
    src: "/hero-banner.png",
    alt: "Pharmaceutical & Medical Healthcare Supply",
    isLogo: false,
  },
  {
    src: "/hero-pharmacy-bg.jpg",
    alt: "Medical Diagnostics & Clinical Supplies",
    isLogo: false,
  },
  {
    src: "/about-pharmacy.jpg",
    alt: "Central Distribution Hub & Cold-Chain Logistics",
    isLogo: false,
  },
  {
    src: "/services-distribution.jpg",
    alt: "Direct Importation & Wholesale Delivery",
    isLogo: false,
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center bg-[#051129]">
      {/* Dynamic multi-layered ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#061536] via-[#092252] to-[#040d21]" />
      
      {/* Glowing radial light fields */}
      <div className="absolute top-1/4 left-1/12 w-[550px] h-[550px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/12 w-[600px] h-[600px] bg-cyan-400/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle fine geometric dot matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      {/* Top accent bar with Ethiopian national colors & subtle glow */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-20 flex shadow-lg shadow-emerald-500/10">
        <div className="flex-1 bg-emerald-500" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-rose-500" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Subheading & CTAs (order-2 on mobile, order-1 on lg) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-7 text-center lg:text-left animate-fade-in-up">
            
            {/* Regulatory & Compliance Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-gradient-to-r from-blue-900/60 to-slate-900/60 backdrop-blur-xl px-4 py-2 shadow-xl shadow-blue-950/40">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <Shield size={15} className="text-cyan-400 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-200">
                {siteData.hero.badge}
              </span>
            </div>

            {/* Main Corporate Headline */}
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-cyan-300 font-extrabold uppercase tracking-[0.22em] text-xs md:text-sm">
                <Sparkles size={16} className="text-amber-400 animate-pulse shrink-0" />
                <span>{siteData.company.tagline}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.1rem] font-black leading-[1.06] text-white tracking-tight font-heading">
                PHARMAKON <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-white drop-shadow-sm">
                  TRADING HOUSE PLC
                </span>
              </h1>
            </div>

            {/* Subtitle Description */}
            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
              {siteData.hero.subheading}
            </p>

            {/* High-Impact Action CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 hover:-translate-y-0.5 cursor-pointer overflow-hidden"
              >
                <span>Explore Operational Portfolio</span>
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                to="/network"
                className="group inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-2xl border border-white/20 hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-lg"
              >
                <Globe2 size={18} className="text-cyan-300 group-hover:rotate-12 transition-transform duration-300" />
                <span>Supplier Partnership</span>
              </Link>
            </div>

            {/* Trust Validation Points */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-y-3 gap-x-6 text-xs font-semibold text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>EFDA Registered Importer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>WHO-GDP Quality Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>5-Story HQ & 1,200m² Hub</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Rotating Logo & Showcase Images (order-1 on mobile, order-2 on lg) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center text-center space-y-6">
            
            {/* Dynamic Image Container */}
            <div className="relative w-full max-w-sm sm:max-w-md h-52 sm:h-64 md:h-72 flex items-center justify-center group">
              {/* Back ambient radiant glow */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-3xl transform scale-110 opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Dynamic Slides Cross-fading */}
              {HERO_IMAGES.map((img, idx) => {
                const isActive = idx === currentImageIndex;
                return (
                  <div
                    key={img.src}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                      isActive
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {img.isLogo ? (
                      /* Clean Logo presentation without bounding box */
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="max-h-36 sm:max-h-48 md:max-h-56 w-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)] transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      /* High-clarity rounded showcase image container */
                      <div className="w-full h-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900/50 backdrop-blur-md p-1.5">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover rounded-2xl shadow-inner transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination indicator dots */}
            <div className="flex items-center gap-2 pt-1">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentImageIndex
                      ? "w-8 bg-cyan-400 shadow-lg shadow-cyan-400/50"
                      : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slogan & Corporate Identity */}
            <div className="space-y-2.5 max-w-md">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[11px] font-extrabold uppercase tracking-[0.25em] text-cyan-300">
                <Award size={13} className="text-amber-400" />
                <span>Official Slogan</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-heading italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 drop-shadow-md">
                "{siteData.company.slogan}"
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-cyan-200/90 leading-relaxed drop-shadow-sm">
                {siteData.company.tagline}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}