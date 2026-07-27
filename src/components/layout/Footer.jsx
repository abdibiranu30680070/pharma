import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, ArrowRight, ShieldCheck, Award, Clock } from 'lucide-react';
import { siteData } from '../../data/siteData';

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    aria-label={label}
    className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary/80 hover:border-primary/60 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
  >
    {children}
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="group flex items-center gap-2 text-slate-400 hover:text-white text-[13px] font-medium transition-colors duration-200"
    >
      <ArrowRight
        size={11}
        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary"
      />
      {children}
    </Link>
  </li>
);

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Main footer grid */}
      <div className="relative w-full max-w-none mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <img
                src="/logo.png"
                alt="Pharmakon Logo"
                className="h-10 w-auto object-contain brightness-[1.15]"
              />
              <p className="text-slate-400 text-[13px] leading-relaxed mt-4 max-w-sm">
                {siteData.company.description}
              </p>
            </div>

            {/* Trust badges with subtle hover effect */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, label: 'WHO-GMP Certified' },
                { icon: Award, label: 'ISO 9001:2015' },
                { icon: Clock, label: '24/7 Support' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 bg-white/5 border border-white/8 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                >
                  <Icon size={11} className="text-primary" />
                  {label}
                </span>
              ))}
            </div>

            {/* Social icons */}
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                <SocialIcon href={siteData.contact.social.facebook} label="Facebook">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </SocialIcon>
                <SocialIcon href={siteData.contact.social.twitter} label="Twitter / X">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                </SocialIcon>
                <SocialIcon href={siteData.contact.social.linkedin} label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </SocialIcon>
                <SocialIcon href={siteData.contact.social.instagram} label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </SocialIcon>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-extrabold text-white uppercase tracking-widest border-b border-white/8 pb-3">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {siteData.footer.quickLinks.map((link) => (
                <FooterLink key={link.name} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Products & Services */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-extrabold text-white uppercase tracking-widest border-b border-white/8 pb-3">
              Products
            </h4>
            <ul className="space-y-3">
              {siteData.footer.products.map((link) => (
                <FooterLink key={link.name} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
            <h4 className="text-[11px] font-extrabold text-white uppercase tracking-widest border-b border-white/8 pb-3 pt-4">
              Services
            </h4>
            <ul className="space-y-3">
              {siteData.footer.services.map((link) => (
                <FooterLink key={link.name} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Contact with interactive icons */}
          <div className="space-y-5">
            <h4 className="text-[11px] font-extrabold text-white uppercase tracking-widest border-b border-white/8 pb-3">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                  <MapPin size={13} className="text-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-400 text-[13px] leading-relaxed">
                    <strong className="text-white">HQ:</strong> {siteData.contact.info.addressHQ}
                  </span>
                  <span className="text-slate-400 text-[13px] leading-relaxed">
                    <strong className="text-white">Branch:</strong> {siteData.contact.info.addressBranch}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                  <Phone size={13} className="text-primary" />
                </div>
                <a
                  href={`tel:${siteData.contact.info.phone}`}
                  className="text-slate-400 hover:text-white text-[13px] transition-colors"
                >
                  {siteData.contact.info.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                  <Mail size={13} className="text-primary" />
                </div>
                <a
                  href={`mailto:${siteData.contact.info.email}`}
                  className="text-slate-400 hover:text-white text-[13px] transition-colors"
                >
                  {siteData.contact.info.email}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                  <Globe size={13} className="text-primary" />
                </div>
                <span className="text-slate-400 text-[13px]">www.pharmakon.com</span>
              </li>
            </ul>

            {/* Business hours card with lift effect */}
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 mt-2 hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                Business Hours
              </p>
              <p className="text-slate-300 text-[12px] font-medium">
                {siteData.contact.info.hours}
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Saturday: 9:00 AM – 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar – refined divider */}
      <div className="relative border-t border-white/5">
        <div className="w-full max-w-none mx-auto px-5 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-[12px]">
              {siteData.footer.copyright} &nbsp;·&nbsp; Built with ❤️ for Healthcare Excellence.
            </p>

            <div className="flex items-center gap-5 text-[12px] text-slate-500">
              {['Privacy Policy', 'Terms of Service', 'WHO Compliance', 'Cookie Policy'].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-5">
                  <span className="hover:text-white cursor-pointer transition-colors">
                    {item}
                  </span>
                  {i < arr.length - 1 && <span className="text-slate-700">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}