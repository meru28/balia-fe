'use client'
import { AccountSwitcher } from "./account-switcher";
import React, { useState } from "react";
import SearchInput from "./search";
import NavigationMenu from "./navigation-menu";
import { cn } from "@/lib/utils";

const Sidebar1 = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  return (
    (<aside
      onMouseEnter={() => setIsMinimized(false)}
      onMouseLeave={() => setIsMinimized(false)}
      className={cn(
        "tw-flex tw-flex-col tw-w-fit tw-gap-4 tw-border tw-p-3 tw-rounded-lg tw-bg-stone-100 dark:tw-bg-stone-900 tw-h-svh ttw-ransition-all tw-duration-300 tw-sticky tw-top-0 tw-z-10",
        isMinimized ? "tw-w-[75px]" : "tw-w-[300px]"
      )}>
      {/*<AccountSwitcher isMinimized={isMinimized} />*/}
      <SearchInput isMinimized={isMinimized} />
      <NavigationMenu isMinimized={isMinimized} />
    </aside>)
  );
};

export default Sidebar1;
