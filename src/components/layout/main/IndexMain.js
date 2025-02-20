import Blogs2 from "@/components/sections/blogs/Blogs2";
import Features4 from "@/components/sections/features/Features4";
import HotDeal3 from "@/components/sections/hot-deals/HotDeal3";
import FeaturedProducts from "@/components/sections/products/FeaturedProducts";
import Products3 from "@/components/sections/products/Products3";
import Video from "@/components/sections/videos/Video";
import Hero5 from "@/components/sections/hero-banners/Hero5";
import React from "react";
import OfferCard2 from "@/components/shared/cards/OfferCard2";

const IndexMain = () => {
  return (
    <main>
      <Hero5 />
      <Products3 isDouble={false} title={""} pt={" pt-85"} />
        <div className="tw-max-w-6xl tw-flex tw-justify-center tw-mx-auto tw-pb-[140px]">
          <OfferCard2 />
        </div>
      <HotDeal3 />
      <FeaturedProducts />
      <Video />
      {/* <Testimonials3 /> */}
      <Blogs2 type={2} pb="pb-70" title="Latest Blog" />
      <Features4 />
    </main>
  );
};

export default IndexMain;
