import { Link } from "react-router-dom";
import { siteData } from "../../data/siteData";
import {
  Shield,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0f19] py-16 md:py-20 lg:py-24">
      {/* Background with slow zoom */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Warehouse"
          className="h-full w-full object-cover animate-slow-zoom"
        />
        {/* Softer overlay layers */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/3 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07152f]/60 via-[#07152f]/35 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-none px-5 lg:px-8">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-12">
          {/* Left Content */}
          <div className="space-y-10 animate-fade-in-up lg:col-span-8 lg:pl-12 xl:pl-20">
            {/* Badge (now with a gentle pulse) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md px-4 py-2 animate-pulse-soft">
              <Shield size={14} className="text-sky-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-sky-100">
                WHO-GMP CERTIFIED DISTRIBUTION
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1
                className="text-6xl font-extrabold leading-tight text-white md:text-7xl lg:text-[5.5rem]"
                style={{ textShadow: "0 3px 20px rgba(0,0,0,.5)" }}
              >
                Smart & Reliable
                <br />
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-200 bg-clip-text text-transparent">
                  Pharmaceutical
                </span>
                <br />
                Supply Chain
              </h1>
            </div>

            {/* Description */}
            <p
              className="max-w-2xl text-2xl leading-relaxed text-slate-100 font-medium"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,.5)" }}
            >
              {siteData.hero.subheading}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row mt-6">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-primary/90"
              >
                Explore Products
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/20 hover:border-white/30"
              >
                Contact Logistics
              </Link>
            </div>
          </div>

          {/* Right Image with floating effect */}
          <div className="flex justify-center animate-fade-in-right lg:col-span-4">
            <div className="relative w-full max-w-lg">
              {/* Decorative glow behind the image */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sky-400/20 to-indigo-500/20 blur-2xl" />
              <img
                src="/hero-banner.png"
                alt="Pharmaceutical warehouse"
                className="relative w-full rounded-3xl object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}