import { Calendar, ArrowRight, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteData } from '../../data/siteData';
import { formatImageUrl } from '../../utils/image';
import { useState, useEffect } from 'react';

export default function News({ showHeader = true }) {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/news`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setArticles(data.data);
        }
      })
      .catch((err) => console.error('Failed to fetch news:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-shell-tight section-tint relative bg-slate-50/50">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              Latest Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-3">
              {siteData.news.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Stay updated with our latest news and industry insights
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {loading ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm font-semibold">Loading News...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500">
              <p className="text-sm font-semibold">No news articles found.</p>
            </div>
          ) : articles.map((a) => (
            <div
              key={a._id || a.id}
              onClick={() => navigate(`/news/${a._id || a.id}`)}
              className="glass-card rounded-2xl overflow-hidden flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-44 overflow-hidden bg-slate-50 border-b border-slate-100">
                <img
                  src={formatImageUrl(a.image)}
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

