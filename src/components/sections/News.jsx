import { Calendar, ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteData } from '../../data/siteData';

export default function News({ showHeader = true }) {
  const navigate = useNavigate();

  return (
    <section className="section-shell-tight section-tint relative bg-slate-50/50">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-10 md:mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Latest Updates</p>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-5 drop-shadow-sm">{siteData.news.title}</h2>
            <p className="text-primary font-extrabold max-w-2xl mx-auto text-base md:text-lg leading-relaxed bg-primary/10 p-5 rounded-2xl border border-primary/20 shadow-inner">Stay updated with our latest news and industry insights</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {siteData.news.articles.map((a) => (
            <div
              key={a.id}
              onClick={() => navigate(`/news/${a.id}`)}
              className="glass-card rounded-2xl overflow-hidden flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden bg-slate-50 border-b border-slate-100">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/50 shadow-sm">
                  <span className="text-[10px] font-bold text-primary">{a.category}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                    <span className="flex items-center gap-1"><Calendar size={11} className="text-primary" />{a.date}</span>
                    {a.readTime && <span className="flex items-center gap-1"><Clock size={11} className="text-primary" />{a.readTime}</span>}
                  </div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 mb-2 group-hover:text-primary transition-colors leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{a.description}</p>
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 mt-4 group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

