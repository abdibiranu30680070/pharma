import { Link } from "react-router-dom";
import { siteData } from "../../data/siteData";
import {
  Shield,
  ArrowRight,
  Building2,
  Briefcase,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-pharmacy-bg.jpg"
          alt="Pharmakon Pharmaceutical"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for readability — inspired by the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/75 via-[#0a1628]/55 to-[#0a1628]/30" />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Top accent bar with Ethiopian flag colors */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-20 flex">
        <div className="flex-1 bg-green-500" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-red-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-none px-6 lg:px-16 xl:px-24 py-20">
        <div className="max-w-3xl space-y-8 animate-fade-in-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2">
            <Shield size={14} className="text-green-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/90">
              WHO-GMP CERTIFIED DISTRIBUTION
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.1] text-white"
            style={{ textShadow: "0 3px 25px rgba(0,0,0,.4)" }}
          >
            {siteData.hero.heading.split('&')[0]}&
            <br />
            <span className="text-white/90">
              {siteData.hero.heading.split('&')[1]}
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="max-w-2xl text-lg md:text-xl leading-relaxed text-white/85 font-medium"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,.4)" }}
          >
            {siteData.hero.subheading}
          </p>

          {/* CTA Buttons — styled like the screenshot with icon circles */}
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <Link
              to="/products"
              className="group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <ArrowRight size={20} className="text-white" />
              </div>
              <div>
                <span className="block text-sm font-bold text-white uppercase tracking-wide">
                  Our Products
                </span>
                <span className="block text-xs text-white/60 mt-0.5">
                  Explore our pharmaceutical catalog.
                </span>
              </div>
            </Link>

            <Link
              to="/contact"
              className="group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <ArrowRight size={20} className="text-white" />
              </div>
              <div>
                <span className="block text-sm font-bold text-white uppercase tracking-wide">
                  Contact Us
                </span>
                <span className="block text-xs text-white/60 mt-0.5">
                  Get in touch with our logistics team.
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}