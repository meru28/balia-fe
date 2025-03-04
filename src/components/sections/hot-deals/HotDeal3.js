'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {motion} from "framer-motion";

const HotDeal3 = () => {
  return (
    <div className="ltn__call-to-action-area ltn__call-to-action-4 section-bg-1 pt-110 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <Image
              src="/img/banner/cewe-garuk.png"
              className="tw-scale-[1] lg:tw-scale-[1.36]"
              height={800}
              width={500}
              alt="#"
            />
          </div>
          <div className="col-lg-7">
            <div className="call-to-action-inner call-to-action-inner-4 text-color-white--- text-center---">
              <div className="section-title-area ltn__section-title-2 text-center---">
                <h6 className="ltn__secondary-color">Todays Hot Deals</h6>
                <motion.h1
                  className="section-title"
                  initial={{opacity: 0, y: -50}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.8}}
                >
                  Stay Ahead of <br/> The Trends
                </motion.h1>
              </div>
              <div
                className="ltn__countdown ltn__countdown-3 bg-white--"
                data-countdown="2026/12/28"
              ></div>
              <div className="btn-wrapper animated">
                <Link
                  href="/shop"
                  className="theme-btn-1 btn btn-effect-1 text-uppercase"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotDeal3;
