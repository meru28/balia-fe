"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Features4 = ({ type, mb }) => {
  // Variants untuk container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay antar children
      },
    },
  };

  // Variants untuk item feature
  const featureVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.3
      }
    },
  };

  // Data fitur
  const features = [
    {
      icon: "/img/icons/icon-img/31.png",
      title: "Curated Products",
      description: "Provide free home delivery for all product over $100",
    },
    {
      icon: "/img/icons/icon-img/32.png",
      title: "Handmade",
      description: "We ensure the product quality that is our main goal",
    },
    {
      icon: "/img/icons/icon-img/delivery-04.png",
      title: "Free home delivery",
      description: "We ensure the product quality that you can trust easily",
    },
  ];

  return (
    <div
      className={`ltn__feature-area ${type === 2 ? "" : ""} ${
        mb ? mb : "before-bg-bottom-2"
      } plr--5`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <motion.div
              className="ltn__feature-item-box-wrap ltn__border-between-column white-bg"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="row">
                {features.map((feature, index) => (
                  <div key={index} className="col-xl-4 col-md-6 col-12">
                    <motion.div
                      className="ltn__feature-item ltn__feature-item-8"
                      variants={featureVariants}
                    >
                      <motion.div
                        className="ltn__feature-icon"
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        <Image
                          src={feature.icon}
                          width={51}
                          height={50}
                          alt={feature.title}
                          priority={false}
                        />
                      </motion.div>
                      <div className="ltn__feature-info">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features4;