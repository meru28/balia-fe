'use client'
import React, { useState } from "react";
import NavigationMenu from "./navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
const logoImage1 = "/img/logo.png";

const Sidebar1 = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  return (
    (<aside
      onMouseEnter={() => setIsMinimized(false)}
      onMouseLeave={() => setIsMinimized(false)}
      className={cn(
        "tw-flex tw-flex-col tw-w-fit tw-border tw-p-3 tw-rounded-lg tw-bg-stone-100 tw-cursor-pointer dark:tw-bg-stone-900 tw-h-svh tw-transition-all tw-duration-300 tw-sticky tw-top-0 tw-z-10",
        isMinimized ? "tw-w-[75px]" : "tw-w-[300px]"
      )}>
      <div className="tw-border-b-2 tw-border-stone-300 dark:tw-border-stone-700">
          <Image
            src={logoImage1}
            alt="Logo"
            width={154}
            height={4}
            className="tw-object-cover tw-h-20"
          />
      </div>
      {/*<SearchInput isMinimized={isMinimized} />*/}
      <NavigationMenu isMinimized={isMinimized} />
    </aside>)
  );
};

export default Sidebar1;
