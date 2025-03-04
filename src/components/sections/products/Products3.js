"use client";

import {motion} from "framer-motion";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import makePath from "@/libs/makePath";
import Link from "next/link";

const Products3 = ({
                     title,
                     desc,
                     isSmallTitle,
                     pt,
                     type,
                     isDouble,
                   }) => {
  const getFilteredProducts = (category) =>
    getAllProducts()?.filter(
      ({collection}) => makePath(collection) === makePath(category)
    );

  const drinksProducts = getFilteredProducts("Food & Drinks");
  const drinksProducts1 = drinksProducts?.slice(0, 6);
  const drinksProducts2 = drinksProducts?.slice(6, 12);

  const vegetablesProducts = getFilteredProducts("Vegetables");
  const vegetablesProducts1 = vegetablesProducts?.slice(0, 6);
  const vegetablesProducts2 = vegetablesProducts?.slice(6, 12);

  const driedProducts = getFilteredProducts("Dried Foods");

  // Variants untuk animasi
  const cardVariant = {
    hidden: {opacity: 0, y: 100},
    visible: {opacity: 1, y: 0},
  };

  return (
    <section>
      <div
        className={`ltn__product-tab-area ltn__product-gutter  pb-70 ${
          pt ? pt : "pt-115"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className={`section-title-area  ${
                  type === 2
                    ? ""
                    : isSmallTitle
                      ? "text-center"
                      : "ltn__section-title-2 text-center"
                }`}
              >
                <h1 className="section-title">{title || ""}</h1>
                {desc && (
                  <p>
                    A highly efficient slip-ring scanner for {"today's"}{" "}
                    diagnostic requirements.
                  </p>
                )}
              </div>
              <div
                className={`ltn__tab-menu ltn__tab-menu-2 ${
                  type === 2 ? "ltn__tab-menu-top-right" : ""
                }  text-uppercase text-center`}
              >
                <div className="nav">
                  <Link
                    className="active show"
                    data-bs-toggle="tab"
                    href="#liton_tab_3_1"
                  >
                    Handbag
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_2">
                    Home & Living
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_3">
                    Accessories
                  </Link>
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade active show" id="liton_tab_3_1">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {drinksProducts1?.map((product, idx) => (
                        <motion.div
                          key={idx}
                          className="col-lg-12"
                          variants={cardVariant}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{
                            once: true, // Animasi hanya terjadi 1x selama scroll
                            amount: 0.3, // Sebesar 30% elemen terlihat sebelum animasi di-trigger
                          }}
                          transition={{
                            duration: 0.4,
                            delay: idx * 0.2, // Efek stagger
                          }}
                        >
                          <ProductCardPrimary product={product}/>
                          {isDouble && drinksProducts2?.[idx] && (
                            <ProductCardPrimary product={drinksProducts2[idx]}/>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="liton_tab_3_2">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {vegetablesProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product}/>
                          {isDouble && vegetablesProducts2?.[idx] && (
                            <ProductCardPrimary
                              product={vegetablesProducts2[idx]}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="liton_tab_3_3">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {driedProducts?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary product={product}/>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {type === 2 ? null : (
                  <div className="tab-pane fade" id="liton_tab_3_4">
                    <div className="ltn__product-tab-content-inner">
                      <div className="row ltn__tab-product-slider-one-active slick-arrow-1"></div>
                    </div>
                  </div>
                )}
                <div className="tab-pane fade" id="liton_tab_3_5">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products3;
