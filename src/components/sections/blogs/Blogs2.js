"use client";
import { motion } from "framer-motion";
import BlogCard2 from "@/components/shared/cards/BlogCard2";
import getAllBlogs from "@/libs/getAllBlogs";
import React from "react";

const Blogs2 = ({ type, title, pt, pb }) => {
  const blogs = getAllBlogs()?.filter(({ id }) => id < 6);

  // Animasi untuk judul
  const titleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        duration: 0.8
      }
    }
  };

  // Animasi untuk container blog
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3
      }
    }
  };

  // Animasi untuk setiap blog card
  const blogCardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateY: 45
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 15,
        duration: 1
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className={`ltn__blog-area ${pb ? pb : " pb-90"}   ${pt ? pt : "pt-105"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <motion.div
              className="section-title-area ltn__section-title-2 text-center"
              variants={titleVariants}
            >
              <motion.h1
                className="section-title"
                initial={{ background: "linear-gradient(45deg, #333, #333)" }}
                whileInView={{
                  background: "",
                  transition: { duration: 1.5 }
                }}
                style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {title ? title : "Latest Blog"}
              </motion.h1>
            </motion.div>
          </div>
        </div>
        <motion.div
          className={`row ltn__blog-slider-one-active slick-arrow-1 ${
            type === 2 ? "ltn__blog-item-3-normal" : ""
          }`}
          variants={containerVariants}
        >
          {blogs?.map((blog, idx) => (
            <motion.div
              key={idx}
              className="col-lg-12"
              variants={blogCardVariants}
              whileHover="hover"
              custom={idx}
            >
              <motion.div
                initial={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
                whileHover={{
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <BlogCard2 blog={blog} type={type} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blogs2;