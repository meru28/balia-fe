import BlogsMain from "@/components/layout/main/BlogsMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const Blogs = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={false}
    >
      <BlogsMain />
    </PageWrapper>
  );
};

export default Blogs;
