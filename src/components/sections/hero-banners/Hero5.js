const Hero5 = () => {
  return (
    <div
      className="position-relative fix"
      style={{ overflow: "hidden" }}
    >
      <div className="ltn__slide-animation-active">
        {/* <!-- HTML5 VIDEO --> */}
        <video style={{ minHeight: "100%" }} autoPlay muted loop id="myVideo">
          <source src="https://cdn.balia.ae/hero-compress.mp4" type="video/mp4" />
        </video>

        {/* <!-- ltn__slide-item --> */}
        <div
          className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-7 bg-image--- bg-overlay-theme-black-30"
          data-bs-bg={"/img/slider/41.jpg"}
        >
          <div className="ltn__slide-item-inner text-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 align-self-center">
                  <div className="slide-item-info lg:!tw-max-w-[932px]">
                    <div className="slide-item-info-inner ltn__slide-animation">
                      <h6 className="slide-sub-title white-color animated text-uppercase">
                        {/* {"//"} Where the Sun Never Sets on Summer. */}
                      </h6>
                      <h1 className="slide-title white-color animated tw-font-brittany">
                        Summer is here. Always.
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero5;
