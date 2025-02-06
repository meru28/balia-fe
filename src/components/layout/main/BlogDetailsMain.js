import BlogDetailsPrimary from "@/components/sections/blog-details/BlogDetailsPrimary";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const BlogDetailsMain = () => {
  return (
    <main>
      <HeroPrimary title={"News Details"} text={"News Details"} />
      <BlogDetailsPrimary />
    </main>
  );
};

export default BlogDetailsMain;
