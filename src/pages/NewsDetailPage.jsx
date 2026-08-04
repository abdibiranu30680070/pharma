import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatImageUrl } from '../utils/image';

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [otherArticles, setOtherArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch all news and then find the specific one + others
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/news`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const allNews = data.data;
          const current = allNews.find((a) => a._id === id || a.id === id);
          setArticle(current);
          setOtherArticles(allNews.filter((a) => a._id !== id && a.id !== id).slice(0, 3));
        }
      })
      .catch((err) => console.error('Failed to fetch news detail:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center flex-col gap-6 bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 text-sm font-semibold">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center flex-col gap-6 bg-white">
        <h1 className="text-3xl font-extrabold font-heading text-slate-900">Article Not Found</h1>
        <p className="text-slate-600 text-sm">The article you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate('/news')}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
        >
          Back to News
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-white">

      {/* Hero Banner */}
      <div className="relative h-[420px] md:h-[520px] overflow-hidden bg-slate-900">
        <img
          src={formatImageUrl(article.image)}
          alt={article.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-12 max-w-5xl mx-auto">
          <span className="inline-block bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-slate-300 text-xs font-semibold">
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-blue-400" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-blue-400" />
              {article.date}
            </span>
            {article.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-blue-400" />
                {article.readTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="w-full max-w-none mx-auto px-5 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main content */}
          <article className="lg:w-2/3">
            {/* Description lead */}
            <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8 pb-8 border-b border-slate-100">
              {article.description}
            </p>

            {/* Full article paragraphs */}
            {article.content && (
              <div className="space-y-6 text-slate-600 text-[15px] leading-[1.85]">
                {article.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}

            {/* Tags & Share */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category:</span>
                <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-lg">
                  {article.category}
                </span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
              >
                <Share2 size={13} /> {copied ? 'Link Copied!' : 'Share Article'}
              </button>
            </div>
          </article>

          {/* Sidebar — Related articles */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-5">
              <h3 className="text-sm font-extrabold font-heading text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
                Related Articles
              </h3>
              {otherArticles.map((rel) => (
                <div
                  key={rel._id || rel.id}
                  onClick={() => navigate(`/news/${rel._id || rel.id}`)}
                  className="flex gap-4 group cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <img
                      src={formatImageUrl(rel.image)}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide">{rel.category}</span>
                    <h4 className="text-xs font-bold font-heading text-slate-800 mt-0.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                      <Calendar size={9} />{rel.date}
                    </span>
                  </div>
                </div>
              ))}

              {/* Back to all news */}
              <Link
                to="/news"
                className="flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full mt-4"
              >
                <ArrowLeft size={13} /> All News Articles
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
