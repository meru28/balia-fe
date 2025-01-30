import CartMain from "@/components/layout/main/CartMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Cart = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={false}
    >
      <CartMain />
    </PageWrapper>
  );
};

export default Cart;
