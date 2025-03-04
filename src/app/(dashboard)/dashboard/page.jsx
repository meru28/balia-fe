import Sidebar1 from '@/components/block/sidebar-01/sidebar-01'
export default function Page() {
  return (
    <div className="tw-flex tw-gap-2">
      <Sidebar1 />
      <main className="tw-flex tw-w-full tw-justify-center tw-text-5xl tw-flex-col">
        {/* your page content goes here */}
      </main>
    </div>
  );
}
