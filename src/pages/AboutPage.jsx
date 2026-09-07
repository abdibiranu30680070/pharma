import About from '../components/sections/About';
import StrategicGrowth from '../components/sections/StrategicGrowth';
import Governance from '../components/sections/Governance';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import PageBanner from '../components/layout/PageBanner';
import { siteData } from '../data/siteData';

export default function AboutPage() {
  return (
    <div className="pt-16">
      <PageBanner
        title="Corporate Profile & Governance"
        description="Pharmakon Trading House PLC is a licensed pharmaceutical, medical supply, and laboratory solutions importer and distributor operating from a 5-story headquarters and 1,200 sq. m central logistics facility in Addis Ababa, Ethiopia."
      />
      <div className="w-full max-w-none mx-auto">
        <About showHeader={false} />
        <StrategicGrowth />
        <Governance />
        <WhyChooseUs />
        <Testimonials />
      </div>
    </div>
  );
}
