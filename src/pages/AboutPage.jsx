import About from '../components/sections/About';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import PageBanner from '../components/layout/PageBanner';
import { siteData } from '../data/siteData';

export default function AboutPage() {
  return (
    <div className="pt-16">
      <PageBanner
        title="About Us"
        description={siteData.about.description}
      />
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
        <About showHeader={false} />
        <WhyChooseUs />
        <Testimonials />
      </div>
    </div>
  );
}
