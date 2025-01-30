import Blogs2 from "@/components/sections/blogs/Blogs2";
import Features4 from "@/components/sections/features/Features4";
// import Hero1 from "@/components/sections/hero-banners/Hero1";
import HotDeal3 from "@/components/sections/hot-deals/HotDeal3";
import Offer4 from "@/components/sections/offers/Offer4";
import FeaturedProducts from "@/components/sections/products/FeaturedProducts";
import Products3 from "@/components/sections/products/Products3";
import Testimonials3 from "@/components/sections/testimonils/Testimonials3";
import Video from "@/components/sections/videos/Video";
import Hero5 from "@/components/sections/hero-banners/Hero5";
import React from "react";
import WobbleCard from "@/components/shared/cards/WobbleCard";

const IndexMain = () => {
  return (
    <main>
      <Hero5 />
        <div className="tw-max-w-6xl tw-flex tw-justify-center tw-mx-auto">
            <WobbleCard />
        </div>
      {/*<Offer4 />*/}
      <Products3 isDouble={false} title={"Our Products"} pt={" pt-85"} />
      <HotDeal3 />
      <FeaturedProducts />
      <Video />
      <Testimonials3 />
      <Blogs2 type={2} pb="pb-70" title="Leatest Blog" />
      <Features4 />
    </main>
  );
};

export default IndexMain;
