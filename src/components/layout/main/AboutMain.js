import About5 from "@/components/sections/about/About5";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import Services4 from "@/components/sections/services/Services4";
import Testimonials3 from "@/components/sections/testimonils/Testimonials3";

const AboutMain = () => {
  return (
    <main>
      <HeroPrimary title="About Us" text="About Us" bg="/img/bg/fashion-thing.png" />
      <About5 pt={"pt-0"} />
      <Services4 />
      <Testimonials3 pt="pt-115" />
      <Features4 />
    </main>
  );
};

export default AboutMain;
