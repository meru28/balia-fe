'use client'

import Sidebar1 from '@/components/block/sidebar-01/sidebar-01'
import SiteHeader from "@/components/layout/headers/SiteHeader";
import {useState} from "react";
export default function DashboardLayout({children}) {
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="tw-flex tw-over">
      <Sidebar1 />
      <main className="tw-pt-24 tw-w-full tw-pl-[265px] tw-bg-gray-200 tw-min-h-screen tw-overflow-auto">
        <SiteHeader
          isMinimized={isMinimized}
          toggleSidebar={toggleSidebar}
        />
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}
