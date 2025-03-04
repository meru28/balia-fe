"use client";
import { motion } from "framer-motion";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import React from "react";

const Products5 = ({ isRelated, title, tag, pt, pb }) => {
  const products = getAllProducts()
    ?.sort((a, b) => b.disc - a.disc)
    .slice(0, 6);

  // Variants untuk container judul
  const titleContainerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Variants untuk container produk
  const productsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Variants untuk setiap item produk
  const productItemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.35
      }
    },
  };

  return (
    <div
      className={`ltn__product-slider-area ltn__product-gutter ${
        pb ? pb : ""
      }  ${pt ? pt : isRelated ? "pb-70" : "pt-115 pb-70"}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <motion.div
              className={`section-title-area ${
                isRelated ? "ltn__section-title-2" : " text-center"
              }`}
              variants={titleContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {tag && (
                <motion.h6
                  className="section-subtitle ltn__secondary-color"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {tag}
                </motion.h6>
              )}
              <motion.h1
                className="section-title"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {title ? title : "Our Bestsellers"}
                {isRelated && <span>.</span>}
              </motion.h1>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="row ltn__product-slider-item-four-active slick-arrow-1"
          variants={productsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products?.map((product, idx) => (
            <motion.div
              key={idx}
              className="col-lg-12"
              variants={productItemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ProductCardPrimary product={product} isShowDisc={true} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Products5;