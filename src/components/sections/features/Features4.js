import Image from "next/image";

const Features4 = ({ type, mb }) => {
  return (
    <div
      className={`ltn__feature-area  ${type === 2 ? "" : ""}  ${
        mb ? mb : "before-bg-bottom-2"
      } plr--5`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__feature-item-box-wrap ltn__border-between-column white-bg">
              <div className="row">
                <div className="col-xl-4 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/31.png"}
                        width={51}
                        height={50}
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Curated Products</h4>
                      <p>
                        Provide free home delivery for all product over $100
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/32.png"}
                        width={51}
                        height={50}
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">
                      <h4>Handmade</h4>

                      <p>We ensure the product quality that is our main goal</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6 col-12">
                  <div className="ltn__feature-item ltn__feature-item-8">
                    <div className="ltn__feature-icon">
                      <Image
                        src={"/img/icons/icon-img/delivery-04.png"}
                        width={51}
                        height={50}
                        alt="#"
                        priority={false}
                      />
                    </div>
                    <div className="ltn__feature-info">

                      <h4>Free home delivery</h4>
                      <p>
                        We ensure the product quality that you can trust easily
                      </p>
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

export default Features4;
