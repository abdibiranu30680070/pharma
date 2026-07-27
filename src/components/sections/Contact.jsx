import { Mail, Phone, MapPin, Clock, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { siteData } from '../../data/siteData';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-shell-tight bg-slate-50/50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="bg-blob -bottom-20 -left-20 opacity-30 animate-float"></div>
      
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Contact Us</p>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-5 drop-shadow-sm">{siteData.contact.title}</h2>
          <p className="text-primary font-extrabold max-w-2xl mx-auto text-base md:text-lg leading-relaxed bg-primary/10 p-5 rounded-2xl border border-primary/20 shadow-inner">{siteData.contact.description}</p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Side Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-2xl space-y-6 bg-white border border-slate-100 shadow-sm">
              <h3 className="text-base font-bold font-heading text-slate-900 border-b border-slate-100 pb-3.5 flex items-center gap-2">
                <Sparkles size={16} className="text-primary" /> Contact Details
              </h3>
              
              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">HQ Location</h4>
                  <p className="text-slate-700 text-xs md:text-sm mt-0.5 leading-normal">{siteData.contact.info.addressHQ}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Branch Location</h4>
                  <p className="text-slate-700 text-xs md:text-sm mt-0.5 leading-normal">{siteData.contact.info.addressBranch}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Telephone</h4>
                  <p className="text-slate-700 text-xs md:text-sm mt-0.5">{siteData.contact.info.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</h4>
                  <p className="text-slate-700 text-xs md:text-sm mt-0.5">{siteData.contact.info.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-primary/20">
                  <Clock className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Operating Hours</h4>
                  <p className="text-slate-700 text-xs md:text-sm mt-0.5 leading-normal">{siteData.contact.info.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side Panel */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="glass-card p-12 rounded-2xl shadow-sm text-center space-y-3 bg-white border border-slate-100 animate-slide-in">
                <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="text-green-600" size={28} />
                </div>
                <h3 className="text-lg font-bold font-heading text-slate-900">Message Received!</h3>
                <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A representative from our pharmaceutical logistics department will contact you within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="glass-card p-8 rounded-2xl shadow-sm space-y-5 bg-white border border-slate-100">
                <h3 className="text-base font-bold font-heading text-slate-900 border-b border-slate-100 pb-3.5 flex items-center gap-2">
                  <Mail size={16} className="text-primary" /> Send an Inquiry
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl text-xs premium-input outline-none"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2.5 rounded-xl text-xs premium-input outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl text-xs premium-input outline-none"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl text-xs premium-input outline-none resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-600 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
