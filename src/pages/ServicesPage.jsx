import Services from '../components/sections/Services';
import Distribution from '../components/sections/Distribution';
import PageBanner from '../components/layout/PageBanner';

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <PageBanner
        title="Our Services"
        description="Comprehensive WHO-GMP compliant pharmaceutical distribution and clinical supply chain services."
      />
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
        <Services showHeader={false} />
        <Distribution />
      </div>
    </div>
  );
}
