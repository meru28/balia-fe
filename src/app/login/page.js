import LoginMain from "@/components/layout/main/LoginMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Login = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={false}
    >
      <LoginMain />
    </PageWrapper>
  );
};

export default Login;
