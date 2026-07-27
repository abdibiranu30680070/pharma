import Hero from '../components/sections/Hero';
import companyLogo from '../assets/company_logo.png';
import About from '../components/sections/About';
import ProductsSummary from '../components/sections/ProductsSummary';
import Services from '../components/sections/Services';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Partners from '../components/sections/Partners';
import Distribution from '../components/sections/Distribution';
import News from '../components/sections/News';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <div className="pt-14 md:pt-16">
      <Hero />
      <About />
      <ProductsSummary />
      <Services />
      <WhyChooseUs />
      <Partners />
      <Distribution />
      <News />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
