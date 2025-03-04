"use client";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import BlogCard2 from "@/components/shared/cards/BlogCard2";
import getAllBlogs from "@/libs/getAllBlogs";
import React, { useRef } from "react";

const Blogs2 = ({ type, title, pt, pb }) => {
  const blogs = getAllBlogs()?.filter(({ id }) => id < 6);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  // Scroll progress animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 30
  });

  // Transform values based on scroll
  const y = useTransform(smoothProgress, [0, 1], [100, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 1], [0, 1, 1]);

  // Parallax effect untuk blog cards
  const generateCardVariants = (idx) => ({
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotateX: 45
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 40,
        delay: idx * 0.2
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  });

  // Animasi untuk container
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`ltn__blog-area ${pb ? pb : " pb-90"} ${pt ? pt : "pt-105"}`}
      style={{
        opacity,
        scale,
        y
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <motion.div
              className="section-title-area ltn__section-title-2 text-center"
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <motion.h1
                className="section-title"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isInView ?
                  { scale: 1, opacity: 1 } :
                  { scale: 0.9, opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.2
                }}
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
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {blogs?.map((blog, idx) => (
            <motion.div
              key={idx}
              className="col-lg-12"
              variants={generateCardVariants(idx)}
              whileHover="hover"
              custom={idx}
              style={{
                perspective: 1000
              }}
            >
              <motion.div
                initial={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
                whileHover={{
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <BlogCard2 blog={blog} type={type} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indikator scroll progress */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(to right, #3498db, #2ecc71)",
          transformOrigin: "0%",
          scaleX: scrollYProgress
        }}
      />
    </motion.div>
  );
};

export default Blogs2;