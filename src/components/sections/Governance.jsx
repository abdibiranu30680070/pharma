import { Users, Shield, Scale, FileSpreadsheet, Building, Truck, ShoppingCart, Users2, Landmark, CheckCircle } from 'lucide-react';
import { siteData } from '../../data/siteData';

const deptIcons = [
  Truck,          // Import Technical
  Building,       // Wholesale Technical
  ShoppingCart,   // Procurement & Registrations
  Users2,         // HR
  Landmark        // Finance
];

export default function Governance() {
  const { governance } = siteData;

  return (
    <section className="section-shell-tight relative bg-white py-16 md:py-24 border-t border-slate-100">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block mb-3">
            Corporate Structure
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight mb-4">
            {governance.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {governance.subtitle}
          </p>
        </div>

        {/* CEO Apex Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-card rounded-3xl p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700 shadow-xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block bg-primary/30 text-primary border border-primary/40 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                Executive Leadership
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mb-3">
                Chief Executive Officer (CEO)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                {governance.executiveSummary}
              </p>
            </div>
          </div>

          {/* External Advisory Wings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {governance.advisors.map((adv) => (
              <div 
                key={adv.role} 
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 shadow-sm flex items-start gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                  <Scale size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-heading text-slate-900 mb-1">{adv.role} (External)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Operational Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {governance.departments.map((dept, index) => {
            const Icon = deptIcons[index % deptIcons.length];
            return (
              <div 
                key={dept.name}
                className="glass-card rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Department 0{index + 1}</span>
                      <h4 className="text-base font-bold font-heading text-slate-900 group-hover:text-primary transition-colors leading-snug">
                        {dept.name}
                      </h4>
                    </div>
                  </div>

                  <div className="mb-4 pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md inline-block">
                      {dept.head}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {dept.duties.map((duty, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{duty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
