import React, { useEffect } from "react";

const InstagramFeeds = () => {
  useEffect(() => {
    // Add EmbedSocial script
    const script = document.createElement("script");
    script.src = "https://embedsocial.com/embedscript/in.js";
    script.id = "EmbedSocialIframeLightbox";
    document.getElementsByTagName("head")[0].appendChild(script);
  }, []);

  return (
    <div className="widget ltn__instagram-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Instagram Feeds
      </h4>
      <div className="ltn__instafeed ltn__instafeed-grid insta-grid-gutter">
        {/* Replace EMBED_SOCIAL_FEED_ID with your actual feed ID */}
        <div className="embedsocial-instagram" data-ref="c1541675ab36b3d876ea5c6c58d42c02c1f84ce1"></div>
      </div>
    </div>
  );
};

export default InstagramFeeds;
