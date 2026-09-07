import Distribution from '../components/sections/Distribution';
import SupplierPartnership from '../components/sections/SupplierPartnership';
import Partners from '../components/sections/Partners';
import PageBanner from '../components/layout/PageBanner';

export default function NetworkPage() {
  return (
    <div className="pt-16">
      <PageBanner
        title="Distribution & Global Supplier Network"
        description="Serving hospitals, clinics, wholesale distributors, retail pharmacies, and international NGO agencies through a 1,200 sq. m central facility and partnerships with 50+ global manufacturers."
      />
      <div className="w-full max-w-none mx-auto">
        <Distribution showHeader={false} />
        <SupplierPartnership />
        <Partners showHeader={true} />
      </div>
    </div>
  );
}
