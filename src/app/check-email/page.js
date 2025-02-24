'use client'

import CheckEmailMain from "@/components/layout/main/CheckEmailMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const Verify = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={false}
    >
      <CheckEmailMain />
    </PageWrapper>
  );
};

export default Verify;
