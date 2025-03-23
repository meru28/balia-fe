import Adress from "@/components/sections/address/Adress";
import ContactPrimary from "@/components/sections/contacts/ContactPrimary";
import Features4 from "@/components/sections/features/Features4";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import Map2 from "@/components/shared/map/Map2";
import React from "react";

const ContactMain = () => {
  return (
    <main>
      <HeroPrimary title={"Contact Us"} text="Contact" />
      <Adress />
      <ContactPrimary />
      {/*<Map2 />*/}
      <div className="tw-mt-36">
        <Features4 />
      </div>
    </main>
  );
};

export default ContactMain;
