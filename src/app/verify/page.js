'use client'

import VerificationMain from "@/components/layout/main/VerificationMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import { useSearchParams } from "next/navigation";
import {useEffect} from "react";

const Verify = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={false}
    >
      <VerificationMain />
    </PageWrapper>
  );
};

export default Verify;
