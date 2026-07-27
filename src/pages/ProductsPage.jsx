import React, { useState, useMemo } from 'react';
import {
  Pill, Package, Shield, Microscope, Monitor,
  CheckCircle, Info, PhoneCall, Mail
} from 'lucide-react';
import Distribution from '../components/sections/Distribution';
import PageBanner from '../components/layout/PageBanner';
import { siteData } from '../data/siteData';

// Map icons to Lucide components
const iconMap = {
  Pill,
  Package,
  Shield,
  Microscope,
  Monitor,
};

// Rich details for each product item
const itemDetails = {
  'Antibiotics': {
    category: 'Prescription Medicines',
    description: 'High-grade broad and narrow-spectrum antibacterial formulations targeting respiratory, urinary, and skin infections.',
    usages: ['Bacterial infection management', 'Post-operative prophylaxis', 'Infection control'],
    specs: 'Sourced from WHO-GMP certified laboratories. Available in tablets, capsules, and liquid suspensions.',
    precautions: 'Requires medical doctor prescription. Complete full course to prevent bacterial resistance.',
    sku: 'RX-ANT-882',
    image: '/products/prod1.jpg'
  },
  'Pain Relief': {
    category: 'Prescription Medicines / OTC',
    description: 'Advanced analgesics, NSAIDs, and muscle relaxants for mild, moderate, or chronic pain management.',
    usages: ['Aches and inflammatory pain', 'Post-surgical pain alleviation', 'Fever reduction'],
    specs: 'Formulated in standard strengths (e.g., Paracetamol 500mg, Ibuprofen 400mg).',
    precautions: 'Do not exceed maximum daily limits. Take with food to protect gastric lining.',
    sku: 'OTC-PNR-109',
    image: '/products/prod2.jpg'
  },
  'Cardiovascular': {
    category: 'Prescription Medicines',
    description: 'Essential heart care pharmaceuticals including beta-blockers, ACE inhibitors, and statins for lipid regulation.',
    usages: ['Hypertension management', 'Cholesterol lowering', 'Heart rhythm regulation'],
    specs: 'Strict biological stability standards. Batch-tested for bioavailability.',
    precautions: 'Constant medical supervision required. Do not skip daily dosing.',
    sku: 'RX-CRD-334',
    image: '/products/prod3.jpg'
  },
  'Diabetes Care': {
    category: 'Prescription Medicines',
    description: 'Metabolic solutions comprising insulin formulations (rapid, intermediate, long-acting) and oral hypoglycemic tablets.',
    usages: ['Type 1 & Type 2 Diabetes treatment', 'Glycemic control optimization'],
    specs: 'Insulin requires secure cold-chain distribution (maintained at 2-8°C).',
    precautions: 'Monitor blood sugar levels closely to avoid hypoglycemia.',
    sku: 'RX-DIA-450',
    image: '/products/prod4.jpg'
  },
  'Vitamins': {
    category: 'Over-the-Counter Medicines',
    description: 'Premium vitamins, minerals, and multi-nutrient formulas designed to fill nutritional gaps and boost vitality.',
    usages: ['Immune support', 'Bone health enhancement', 'General wellness promotion'],
    specs: 'High-bioavailability formulas, including Vitamin C, D3, Zinc, and B-Complex.',
    precautions: 'Store in a cool, dry place. Keep out of reach of children.',
    sku: 'OTC-VIT-901',
    image: '/products/prod5.jpg'
  },
  'Cold & Flu': {
    category: 'Over-the-Counter Medicines',
    description: 'Relief solutions for congestion, sore throats, coughs, and typical flu symptoms.',
    usages: ['Nasal congestion clearance', 'Cough suppression', 'Sore throat relief'],
    specs: 'Syrups, chewable tablets, and hot drink soluble powders available.',
    precautions: 'May cause drowsiness. Avoid driving if using antihistamine products.',
    sku: 'OTC-COL-112',
    image: '/products/prod6.jpg'
  },
  'Digestive Care': {
    category: 'Over-the-Counter Medicines',
    description: 'Products addressing gastrointestinal distress, acidity, bloating, and irregular bowel movements.',
    usages: ['Acidity neutralizing (antacids)', 'Probiotic gut support', 'Irritation relief'],
    specs: 'Fast-dissolving tablets, suspensions, and stable shelf probiotics.',
    precautions: 'Consult a physician if stomach pain is severe or prolonged.',
    sku: 'OTC-DIG-556',
    image: '/products/prod1.jpg'
  },
  'First Aid': {
    category: 'Over-the-Counter Medicines',
    description: 'Comprehensive kit requirements for instant emergency treatment of minor physical cuts and scrapes.',
    usages: ['Wound disinfection', 'Minor burn dressings', 'Physical trauma support'],
    specs: 'Includes antiseptic wipes, iodine solutions, sterile gauze, and medical tapes.',
    precautions: 'For external skin application only. If infection occurs, seek clinical care.',
    sku: 'OTC-FST-809',
    image: '/products/prod2.jpg'
  },
  'Gloves': {
    category: 'Medical Supplies',
    description: 'Premium surgical and examination gloves offering high tactile sensitivity and reliable pathogen barriers.',
    usages: ['Medical exams', 'Surgical procedures', 'Laboratory protection'],
    specs: 'Medical-grade latex, nitrile, and vinyl variants. Powder-free and hypoallergenic options.',
    precautions: 'Single-use only. Discard in compliance with medical waste guidelines.',
    sku: 'SPL-GLV-015',
    image: '/products/prod3.jpg'
  },
  'Syringes': {
    category: 'Medical Supplies',
    description: 'Precision clinical syringes and needles designed for smooth injection and minimal patient discomfort.',
    usages: ['Vaccine administration', 'Intravenous/Intramuscular medication delivery'],
    specs: 'Sizes ranging from 1ml (insulin) to 50ml. Clear volume graduation marks.',
    precautions: 'Sterile packing. Do not reuse. Dispose of in dedicated sharps container.',
    sku: 'SPL-SYR-032',
    image: '/products/prod4.jpg'
  },
  'Face Masks': {
    category: 'Medical Supplies',
    description: 'High-filtration medical protective masks shielding against airborne droplets and dust particles.',
    usages: ['Clinical environments', 'Community hygiene control', 'Operating theaters'],
    specs: '3-Ply fluid resistant masks, N95 respirators, and surgical masks (CE Certified).',
    precautions: 'Replace mask immediately if it becomes damp or soiled.',
    sku: 'SPL-MSK-201',
    image: '/products/prod5.jpg'
  },
  'Bandages': {
    category: 'Medical Supplies',
    description: 'Elastic compression and sterile wrapping bandages for dressings support or muscular compression.',
    usages: ['Dressings security', 'Joint sprain stabilization', 'Edema management'],
    specs: 'Woven cotton, elastic crepe, self-adhesive, and water-repellent variations.',
    precautions: 'Do not wrap too tightly to avoid cutting off blood circulation.',
    sku: 'SPL-BDG-404',
    image: '/products/prod6.jpg'
  },
  'Testing Kits': {
    category: 'Laboratory Supplies',
    description: 'Rapid immuno-assay and chemical reagents diagnostic kits for fast patient health diagnostics.',
    usages: ['Infectious disease screen', 'Blood group analysis', 'Urinalysis screening'],
    specs: 'CE & IVD certified. Results manifest in 5 to 15 minutes. Exceptional accuracy.',
    precautions: 'Store at specified temperatures (typically 4-30°C). Check expiration date.',
    sku: 'LAB-TST-602',
    image: '/products/prod1.jpg'
  },
  'Reagents': {
    category: 'Laboratory Supplies',
    description: 'Analytical quality chemical agents for hematology, biochemistry, and molecular biology laboratory assays.',
    usages: ['Pathology lab screenings', 'Research and testing control'],
    specs: 'High purity grades. Sealed packaging with detailed safety datasheets (MSDS).',
    precautions: 'Handle wearing appropriate laboratory gear (goggles, lab coat, gloves).',
    sku: 'LAB-REA-772',
    image: '/products/prod2.jpg'
  },
  'Equipment': {
    category: 'Laboratory / Hospital Equipment',
    description: 'Specialized lab devices including centrifuges, autoclaves, and diagnostic microscopes.',
    usages: ['Blood sample separation', 'Sterilization processes', 'Microscopic analysis'],
    specs: 'Robust steel designs, high speed controllers, digital telemetry displays.',
    precautions: 'Calibrate regularly. Clean in accordance with bio-hazard instructions.',
    sku: 'EQP-LAB-440',
    image: '/products/prod3.jpg'
  },
  'Wheelchairs': {
    category: 'Hospital Equipment',
    description: 'Ergonomically engineered manual and motorized wheelchairs promoting patient mobility and comfort.',
    usages: ['Patient transportation', 'Mobility rehabilitation support'],
    specs: 'Lightweight folding alloy frames, puncture-proof wheels, memory foam seating.',
    precautions: 'Ensure wheel brakes are securely locked before patient sits or stands.',
    sku: 'EQP-WHL-120',
    image: '/products/prod4.jpg'
  },
  'Hospital Beds': {
    category: 'Hospital Equipment',
    description: 'Multi-adjustable ward and ICU beds featuring electric height and posture controls.',
    usages: ['Patient recovery wards', 'Intensive Care Unit (ICU) care'],
    specs: 'Anti-decubitus mattress compatibility, drop-down side rails, cardiac chair positioning.',
    precautions: 'Keep side rails raised when patient is unattended or sleeping.',
    sku: 'EQP-BED-301',
    image: '/products/prod5.jpg'
  },
  'BP Machines': {
    category: 'Hospital Equipment',
    description: 'Clinical automatic digital blood pressure monitors featuring rapid oscillometric measurement.',
    usages: ['Patient vitals monitoring', 'Cardiovascular checkups'],
    specs: 'Large LED screen, arrhythmia detection, double user logs, certified precision.',
    precautions: 'Patient should remain relaxed and seated for 5 minutes prior to testing.',
    sku: 'EQP-BPM-150',
    image: '/products/prod6.jpg'
  },
  'Thermometers': {
    category: 'Hospital Equipment',
    description: 'Non-contact infrared forehead scanners and quick digital oral/underarm sensors.',
    usages: ['Rapid body temperature checking', 'Patient fever screening'],
    specs: 'Infrared measures in 1 second (distance 3-5cm). Precision deviation +/- 0.2°C.',
    precautions: 'Keep scanner lens clean and free of fingerprints/dust.',
    sku: 'EQP-THM-990',
    image: '/products/prod1.jpg'
  }
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);
  
  // Custom contact submission demo state
  const [submittedInquiry, setSubmittedInquiry] = useState(false);

  // Extract all categories from siteData
  const categories = useMemo(() => {
    return ['All', ...siteData.products.categories.map(c => c.name)];
  }, []);

  // Filter items dynamically based on category selection and search query
  const filteredProducts = useMemo(() => {
    const allCategories = siteData.products.categories;
    let list = [];

    // Flatten items with their category icons
    allCategories.forEach(cat => {
      cat.items.forEach(item => {
        list.push({
          name: item,
          categoryName: cat.name,
          icon: cat.icon,
        });
      });
    });

    // Apply category filter
    if (selectedCategory !== 'All') {
      list = list.filter(item => item.categoryName === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => {
        const itemInfo = itemDetails[item.name];
        return (
          item.name.toLowerCase().includes(q) ||
          item.categoryName.toLowerCase().includes(q) ||
          (itemInfo && itemInfo.description.toLowerCase().includes(q))
        );
      });
    }

    return list;
  }, [selectedCategory, searchQuery]);

  const handleOpenDetails = (itemName) => {
    const info = itemDetails[itemName] || {
      category: 'General Supply',
      description: 'Authentic pharmaceutical product distributed by Pharmakon.',
      usages: ['General healthcare assistance'],
      specs: 'Standard specifications compliant with local regulation.',
      precautions: 'Use as directed by healthcare professionals.',
      sku: 'GEN-MED-000'
    };
    setActiveModalItem({ name: itemName, ...info });
    setSubmittedInquiry(false);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setSubmittedInquiry(true);
  };

  return (
    <div className="pt-16 min-h-screen">
      <PageBanner
        title="Medical & Pharmaceutical Catalog"
        description="Explore our smart directory of certified pharmaceuticals, hospital equipment, laboratory reagents, and clinical supplies."
        showSearch={true}
        searchPlaceholder="Search paracetamol, gloves, ECG, prescription..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Catalog Explorer Section */}
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left filter side-panel */}
          <div className="lg:w-1/4 shrink-0 space-y-6">
            <div className="glass-card p-6 rounded-2xl sticky top-24 bg-white border border-slate-100 shadow-sm">
              <h3 className="font-bold font-heading text-slate-900 text-sm md:text-base mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Info size={16} className="text-primary" /> Filter Categories
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-[10px] md:text-xs font-semibold tracking-wide transition-all cursor-pointer w-full flex justify-between items-center ${
                      selectedCategory === cat
                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <CheckCircle size={12} />}
                  </button>
                ))}
              </div>

              {/* Instant Help note */}
              <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2 text-xs leading-relaxed text-slate-700">
                <p className="font-bold flex items-center gap-1 text-slate-900">
                  <Pill size={13} className="text-primary" /> Bulk Wholesales
                </p>
                <p className="text-slate-600">
                  Registered clinical institutions qualify for tiered business-to-business rates. Contact us to establish a credit facility.
                </p>
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:w-3/4 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-heading text-slate-900">
                {selectedCategory} Products
                <span className="text-sm font-normal text-slate-500 ml-2">
                  ({filteredProducts.length} items found)
                </span>
              </h2>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto bg-white border border-slate-100 shadow-sm">
                <Package className="mx-auto text-slate-400 mb-4 animate-bounce" size={48} />
                <h4 className="font-bold font-heading text-slate-900 text-lg mb-2">No matching products</h4>
                <p className="text-slate-600 text-sm mb-4">
                  We couldn't find anything matching your search term. Check spelling or select a different category filter.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                >
                  Reset Catalog filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((item) => {
                  const IconComponent = iconMap[item.icon] || Pill;
                  const itemInfo = itemDetails[item.name] || { description: 'Quality healthcare supply formulation.' };
                  
                  return (
                    <div
                      key={item.name}
                      onClick={() => handleOpenDetails(item.name)}
                      className="glass-card rounded-2xl flex flex-col justify-between cursor-pointer bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 hover:scale-[1.02]"
                    >
                      {/* Product Image Container */}
                      <div className="relative h-44 overflow-hidden bg-slate-50 border-b border-slate-100">
                        <img
                          src={itemInfo.image || '/products/prod2.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/50 flex items-center gap-1.5 shadow-sm">
                          <IconComponent className="text-primary" size={13} />
                          <span className="text-[10px] font-bold text-slate-700">
                            {item.categoryName}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold font-heading text-slate-900 mb-2 group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {itemInfo.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-500 text-[10px]">SKU: {itemInfo.sku || 'GEN-000'}</span>
                          <span className="text-primary hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors">
                            Inspect Details <Info size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      <Distribution />

      {/* Product Details Modal Overlay */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-4">
          <div className="relative rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden bg-white border border-slate-200 animate-slide-in">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-150 text-slate-900 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                  {activeModalItem.category}
                </span>
                <h3 className="text-xl font-bold font-heading mt-0.5 text-slate-900">
                  {activeModalItem.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Product Image inside Modal */}
              <div className="relative h-56 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
                <img
                  src={activeModalItem.image || '/products/prod3.jpg'}
                  alt={activeModalItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Description</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{activeModalItem.description}</p>
              </div>

              {activeModalItem.usages && (
                <div className="space-y-1.5">
                  <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Clinical Applications / Usages</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalItem.usages.map((u, i) => (
                      <span key={i} className="text-xs bg-slate-50 border border-slate-200 text-primary px-2.5 py-1 rounded-lg">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold">Product Specifications</span>
                  <p className="text-xs text-slate-600 leading-normal">{activeModalItem.specs}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] uppercase text-red-600 font-bold">Clinical Precautions</span>
                  <p className="text-xs text-red-700 leading-normal">{activeModalItem.precautions}</p>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="border-t border-slate-250 pt-4">
                {submittedInquiry ? (
                  <div className="bg-green-50 border border-green-200 text-green-750 p-4 rounded-xl text-center space-y-1 animate-slide-in">
                    <CheckCircle className="mx-auto text-green-600" size={24} />
                    <p className="text-xs font-bold text-green-800">Inquiry Sent Successfully!</p>
                    <p className="text-[11px] text-green-700">Our procurement office will contact you within 2 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Quick Wholesale Request</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="email"
                        placeholder="Clinical Email Address"
                        className="w-full premium-input rounded-lg p-2.5 text-xs outline-none"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Estimated Quantity Needed"
                        className="w-full premium-input rounded-lg p-2.5 text-xs outline-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-blue-600 text-white rounded-lg py-2.5 text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      Submit Catalog Request for {activeModalItem.name}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs gap-3">
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-slate-650 font-medium">
                  <PhoneCall size={13} className="text-primary" /> {siteData.contact.info.phone}
                </span>
                <span className="flex items-center gap-1.5 text-slate-650 font-medium">
                  <Mail size={13} className="text-primary" /> {siteData.contact.info.email}
                </span>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer w-full md:w-auto"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
