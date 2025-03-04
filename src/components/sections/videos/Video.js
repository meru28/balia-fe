import Link from "next/link";
import React from "react";

const Video = () => {
  return (
    <div className="ltn__video-popup-area ltn__video-popup-margin tw-pb-20">
      <div className="">
        <div className="row">
          <div className="col-lg-12 ">
            <div
              className="ltn__video-bg-img ltn__video-popup-height-600  bg-image"
              data-bs-bg={"/img/gallery/ring.webp"}
            >
              <Link
                className="ltn__video-icon-2 ltn__video-icon-2-border"
                href="https://www.youtube.com/embed/ATI7vfCgwXE?autoplay=1&showinfo=0"
                data-rel="lightcase:myCollection"
              >
                <i className="fa fa-play"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
