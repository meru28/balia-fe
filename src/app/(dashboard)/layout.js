import Sidebar1 from '@/components/block/sidebar-01/sidebar-01'
export default function DashboardLayout({children}) {
  return (
    <div className="tw-flex tw-gap-2">
      <Sidebar1 />
      <main className="tw-w-full tw-p-10">
        {children}
      </main>
    </div>
  );
}
