import { Star, Quote } from 'lucide-react';
import { siteData } from '../../data/siteData';

export default function Testimonials() {
  return (
    <section className="section-shell-tight bg-slate-50/50">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-3">
            {siteData.testimonials.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            What our clients say about us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {siteData.testimonials.testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="glass-card p-8 rounded-2xl relative flex flex-col justify-between bg-white border border-slate-100"
            >
              <Quote className="text-primary/10 absolute top-5 right-5" size={32} />
              
              <div className="space-y-4">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={16} />
                  ))}
                </div>
                
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="font-bold font-heading text-slate-900 text-sm">
                  {testimonial.name}
                </h4>
                <p className="text-slate-500 text-xs mt-0.5">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
