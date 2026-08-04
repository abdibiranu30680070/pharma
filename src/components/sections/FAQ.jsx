import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { siteData } from '../../data/siteData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-hidden bg-white section-shell-tight">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl animate-float-reverse" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-none px-5 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center animate-fade-in-up">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-3">
            {siteData.faq.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Find answers to commonly asked questions
          </p>
        </div>

        {/* FAQ accordion – centered for readability */}
        <div className="mx-auto max-w-3xl space-y-3">
          {siteData.faq.questions.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div
                key={faq.question}
                className="group rounded-xl border border-white/60 bg-white/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-white/80 hover:shadow-md hover:-translate-y-0.5"
              >
                <button
                  className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/50"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                >
                  <span className="flex items-center gap-2 font-heading text-sm font-semibold text-slate-800">
                    <HelpCircle
                      size={16}
                      className="shrink-0 text-primary"
                    />
                    {faq.question}
                  </span>
                  {open ? (
                    <ChevronUp size={16} className="shrink-0 text-primary" />
                  ) : (
                    <ChevronDown size={16} className="shrink-0 text-primary" />
                  )}
                </button>

                {open && (
                  <div className="animate-slide-up border-t border-slate-100 bg-slate-50/30 px-5 pb-4">
                    <p className="pt-3 text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}