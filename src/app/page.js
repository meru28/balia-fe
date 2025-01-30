import IndexMain from "@/components/layout/main/IndexMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

export default function Home() {
  return (
    <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={false}>
      <IndexMain />
    </PageWrapper>
  );
}
