import localFont from "next/font/local";
import { Rajdhani } from "next/font/google";
import "@/assets/css/font-icons.css";
import "@/assets/css/plugins.css";
import "./globals.css";
import "@/assets/css/responsive.css";
import Script from "next/script";
import { Suspense } from "react";
const open_sans = localFont({
  src: [
    {
      path: "../../public/fonts/GlacialIndifference-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GlacialIndifference-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--ltn__body-font",
});
const brittany = localFont({
  src: "../../public/fonts/BrittanySignatureScript.ttf",
  weight: "400",
  style: "normal",
  variable: "--brittany-font",
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--ltn__heading-font",
});

export const metadata = {
  title: "Balia - Summer is here. Always",
  description: "Balia - Summer is here. Always",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${rajdhani.variable} ${open_sans.variable} ${brittany.variable}`}
    >
      <body className={open_sans.className}>
        <Suspense fallback={<div></div>}>
          {children}

          <Script src="/plugins.js" />
          <Script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCeeHDCOXmUMja1CFg96RbtyKgx381yoBU"
            async
          />
        </Suspense>
      </body>
    </html>
  );
}
