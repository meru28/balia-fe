"use client";
import {motion} from "framer-motion";
import Image from "next/image";

const logoImage = "/img/logo.png";
const logoImage2 = "/img/logo-2.png";
import Link from "next/link";
import {useFooterContex} from "@/providers/FooterContext";

const FooterAbout2 = () => {
  const {footerBg} = useFooterContex() || {};
  return (
    <div className="col-xl-3 col-md-6 col-sm-6 col-12">
      <div className="footer-widget footer-about-widget">
        <div className="footer-logo mb-10">
          <div className="site-logo">
            <motion.div
              animate={{
                y: [-3, 3, -3],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                display: "inline-block",
                willChange: "transform",
                perspective: 1000
              }}
            >
              <Image
                src={footerBg === "dark" ? logoImage2 : logoImage}
                alt="Logo"
                width={154}
                height={42}
                style={{
                  backfaceVisibility: "hidden"
                }}
              />
            </motion.div>
        </div>
      </div>
        <p>
          Balia Fashion is a trendy clothing store offering a modern collection
          for all occasions. We provide elegant and high-quality styles
          to boost your confidence.
        </p>
      <div className="footer-address">
        <ul>
          <li>
            <div className="footer-address-icon">
              <i className="icon-placeholder"></i>
            </div>
            <div className="footer-address-info">
              <p>Dubai, Uni Emirate Arab</p>
            </div>
          </li>
          <li>
            <div className="footer-address-icon">
              <i className="icon-call"></i>
            </div>
            <div className="footer-address-info">
              <p>
                <Link href="tel:+0123-456789">+0123-456789</Link>
              </p>
            </div>
          </li>
          <li>
            <div className="footer-address-icon">
              <i className="icon-mail"></i>
            </div>
            <div className="footer-address-info">
              <p>
                <Link href="mailto:example@example.com">
                  example@example.com
                </Link>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="ltn__social-media mt-20">
        <ul>
          <li>
            <Link href="https://www.facebook.com" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
          </li>
          {" "}
          <li>
            <Link href="https://x.com" title="Twitter">
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          {" "}
          <li>
            <Link href="https://www.linkedin.com" title="Linkedin">
              <i className="fab fa-linkedin"></i>
            </Link>
          </li>
          {" "}
          <li>
            <Link href="https://www.youtube.com" title="Youtube">
              <i className="fab fa-youtube"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
</div>
);
};

export default FooterAbout2;
