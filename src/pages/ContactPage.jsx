import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';
import PageBanner from '../components/layout/PageBanner';

export default function ContactPage() {
  return (
    <div className="pt-16">
      <PageBanner
        title="Contact Pharmakon"
        description="Get in touch with us for inquiries, orders, or strategic partnerships."
      />
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
        <Contact showHeader={false} />
        <FAQ />
      </div>
    </div>
  );
}
