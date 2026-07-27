import Distribution from '../components/sections/Distribution';
import Partners from '../components/sections/Partners';
import PageBanner from '../components/layout/PageBanner';
import { siteData } from '../data/siteData';

export default function NetworkPage() {
  return (
    <div className="pt-16">
      <PageBanner
        title="Distribution & Partners"
        description="Pharmakon serves pharmacies, hospitals, clinics, and healthcare providers through an efficient distribution network designed for reliable and timely delivery."
      />
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
        <Distribution showHeader={false} />
        <Partners showHeader={false} />
      </div>
    </div>
  );
}
