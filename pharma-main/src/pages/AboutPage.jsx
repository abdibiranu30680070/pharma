import About from '../components/sections/About';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';

export default function AboutPage() {
  return (
    <div className="pt-16">
      <About />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
