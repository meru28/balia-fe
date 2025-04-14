import IndexMain from "@/components/layout/main/IndexMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import PromoWrapper from "@/components/shared/Popup/PromoWrapper";
import PromoPopup from "@/components/shared/Popup/PromoPopup";

export default function Home() {
  return (
    <PageWrapper
        isNotHeaderTop={true}
        isHeaderRight={true}
        isTextWhite={true}
        isNavbarAppointmentBtn={false}>
      <PromoWrapper />
      <IndexMain />
    </PageWrapper>
  );
}
