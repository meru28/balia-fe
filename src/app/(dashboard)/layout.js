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
    <div className="tw-flex tw-gap-2">
      <Sidebar1 />
      <main className="tw-w-full">
        <SiteHeader
          isMinimized={isMinimized}
          toggleSidebar={toggleSidebar}
        />
        <div className="tw-p-10 tw-py-3">
          {children}
        </div>
      </main>
    </div>
  );
}
