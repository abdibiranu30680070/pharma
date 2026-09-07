import Services from '../components/sections/Services';
import Distribution from '../components/sections/Distribution';
import StrategicGrowth from '../components/sections/StrategicGrowth';
import PageBanner from '../components/layout/PageBanner';

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <PageBanner
        title="Supply Chain & Technical Services"
        description="End-to-end pharmaceutical importation, EFDA regulatory registrations, WHO GDSP 1,200 m² warehousing, cold-chain telemetry, biomedical technical maintenance, and Odoo ERP batch traceability."
      />
      <div className="w-full max-w-none mx-auto">
        <Services showHeader={false} />
        <Distribution />
        <StrategicGrowth />
      </div>
    </div>
  );
}
