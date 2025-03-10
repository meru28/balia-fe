import CheckoutMain from "@/components/layout/main/CheckoutMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const Checkout = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={false}
    >
      <CheckoutMain />
    </PageWrapper>
  );
};

export default Checkout;
