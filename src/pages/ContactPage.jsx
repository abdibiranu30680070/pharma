import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

export default function ContactPage() {
  return (
    <div className="pt-16">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="bg-blob -top-20 -left-20 animate-float opacity-30"></div>
        <div className="bg-blob-secondary bottom-10 right-10 animate-float-delayed opacity-20"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight animate-slide-in">
            Contact <span className="text-gradient-shine">Pharmakon</span>
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Get in touch with us for inquiries, orders, or strategic partnerships.
          </p>
        </div>
      </div>
      <Contact />
      <FAQ />
    </div>
  );
}
