import { siteData } from '../../data/siteData';

const imageMap = {
  'Hospitals': '/partners/hospital.jpg',
  'Clinics': '/partners/clinic.jpg',
  'Pharmacies': '/partners/pharmacy.jpg',
  'NGOs': '/partners/ngo.jpg',
  'Government Health Institutions': '/partners/government.jpg',
};

// Partner brand names for the marquee strip (real pharma brands)
const partnerBrands = [
  { name: 'Pfizer', abbr: 'PFZ' },
  { name: 'Novartis', abbr: 'NVR' },
  { name: 'Roche', abbr: 'ROC' },
  { name: 'Johnson & Johnson', abbr: 'J&J' },
  { name: 'AstraZeneca', abbr: 'AZN' },
  { name: 'Sanofi', abbr: 'SNF' },
  { name: 'GlaxoSmithKline', abbr: 'GSK' },
  { name: 'Merck & Co.', abbr: 'MRK' },
  { name: 'Abbott Labs', abbr: 'ABT' },
  { name: 'Bayer AG', abbr: 'BAY' },
];

export default function Partners() {
  // Duplicate array so the loop is seamless
  const marqueeItems = [...partnerBrands, ...partnerBrands];

  return (
    <section className="section-shell-tight relative bg-white overflow-hidden">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Trusted Network</p>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-5 drop-shadow-sm">
            {siteData.partners.title}
          </h2>
          <p className="text-primary font-extrabold max-w-2xl mx-auto text-base md:text-lg leading-relaxed bg-primary/10 p-5 rounded-2xl border border-primary/20 shadow-inner">
            {siteData.partners.description}
          </p>
        </div>

        {/* Partner type cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-10 md:mb-12">
          {siteData.partners.types.map((p) => {
            const imgSrc = imageMap[p.name];
            return (
              <div
                key={p.name}
                className="glass-card p-6 rounded-3xl text-center flex flex-col items-center gap-5 bg-white border border-slate-100 hover:border-primary/50 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:bg-primary/5"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden border border-slate-200 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-md p-1 group-hover:shadow-primary/20">
                  <img src={imgSrc} alt={p.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-sm font-black font-heading text-slate-900 uppercase tracking-wide group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Infinite marquee strip */}
        <div className="relative">
          <p className="text-center text-[12px] font-extrabold text-slate-700 uppercase tracking-[0.25em] mb-6">
            Pharmaceutical Brands We Work With
          </p>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div className="overflow-hidden">
            <div className="flex gap-5 partners-marquee">
              {marqueeItems.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex flex-col items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5 min-w-[160px] hover:border-primary/40 hover:bg-white hover:-translate-y-2 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <span className="text-3xl font-black font-heading text-primary/60 group-hover:text-primary transition-colors tracking-tight">
                    {brand.abbr}
                  </span>
                  <span className="text-sm font-extrabold text-slate-600 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
