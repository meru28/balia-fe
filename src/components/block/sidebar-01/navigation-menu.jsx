"use client"
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  ChevronDownIcon,
  Grid2x2Check,
  ShoppingCart,
  HandHelping,
  House,
  FileText
} from "lucide-react";
import { useState } from "react";

const menuItems = [[
  // {
  //   name: "Home",
  //   url: "/",
  //   icon: HomeIcon,
  // },
  {
    group: "Product Management",
    items: [
      {
        name: "Products",
        url: "/bdashboard/product-management",
        icon: ShoppingCart,
      },
      {
        name: "Categories",
        url: "/bdashboard/categories",
        icon: Grid2x2Check
      }
    ]
  },
  {
    group: "Promotional Management",
    items: [
      {
        name: "Promo Popup",
        url: "/promo-popup",
        icon: HandHelping
      }
    ]
  },
  {
    group: "Page Control",
    items: [
      {
        name: "Home Pages",
        url: "/home-pages",
        icon: House
      },
      {
        name: "Terms And Conditions",
        url: "/term-conditions",
        icon: FileText
      }
    ]
  }
  // {
  //   name: "Payments",
  //   icon: HandCoins,
  //   children: [
  //     {
  //       name: "Payments",
  //       url: "/payment",
  //       icon: CircleDollarSign,
  //     },
  //     {
  //       name: "Refunds",
  //       url: "/refunds",
  //       icon: TicketSlash,
  //     },
  //   ],
  // },
  // {
  //   name: "Customers",
  //   url: "/customers",
  //   icon: User,
  // },
],
//   [
//   {
//     name: "Resources",
//     url: "/resources",
//     icon: Package,
//   },
//   {
//     name: "Notifications",
//     url: "/notifications",
//     icon: Bell,
//   },
// ], [
//   {
//     name: "Support",
//     url: "/support",
//     icon: HelpCircle,
//   },
//   {
//     name: "Settings",
//     url: "/settings",
//     icon: Settings,
//   },
// ]
];

const NavigationMenu = ({
  isMinimized
}) => {
  const currentPathname = usePathname();
  console.log(currentPathname);
  return (
    (<nav>
      {menuItems.map((section, index) => (
        <div className="tw-flex tw-flex-col tw-gap-4 tw-mb-4" key={index}>
          {section.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Tampilkan group title */}
              {!isMinimized && group.group && (
                <div className="tw-px-4 tw-mt-5 tw-text-xs tw-text-gray-400 tw-uppercase tw-font-semibold tw-mb-2">
                  {group.group}
                </div>
              )}

              <ul className="tw-space-y-1 tw-pl-0">
                {group.items.map((item) => (
                  <NavigationLink
                    isMinimized={isMinimized}
                    key={item.url}
                    item={item}
                    currentPathname={currentPathname}
                  />
                ))}
              </ul>
            </div>
          ))}

          {index + 1 < menuItems.length && (
            <Separator className="tw-bg-transparent tw-border-t tw-border-dotted tw-border-foreground/30" />
          )}
        </div>
      ))}
    </nav>)
  );
};

export default NavigationMenu;

const NavigationLink = ({
  item,
  isMinimized,
  currentPathname
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const isActive = currentPathname === item.url ||
    currentPathname.startsWith(item.url + '/');

  return (
    (<li key={item.url} className="tw-w-full">
      {item.children ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={
            "tw-flex tw-w-44 tw-items-center tw-group/nav-link tw-gap-1 tw-px-0 tw-py-2.5 hover:tw-bg-primary/80 tw-rounded-md hover:tw-text-primary-foreground"
          }>
          <item.icon
            className="tw-text-foreground/70 group/nav-link-hover:tw-text-primary-foreground tw-size-5" />
          <span className={cn(isMinimized && "tw-hidden")}>{item.name}</span>
          <div className={cn(isMinimized && "tw-hidden", "tw-ml-auto")}>
            <ChevronDownIcon
              className={`tw-w-3 tw-h-3 tw-transition-transform ${
                isOpen ? "tw-rotate-180" : ""
              }`} />
          </div>
        </button>
      ) : (
        <a
          href={item.url}
          className={cn(
            "tw-flex tw-items-center tw-w-60  tw-gap-4 tw-p-5 tw-py-2.5 hover:tw-bg-primary/70 tw-rounded-md hover:tw-text-primary-foreground",
            isActive && "tw-bg-neutral-300 tw-text-black"
          )}>
          <item.icon
            className={cn(
              "tw-text-foreground/70 hover:tw-text-white tw-size-4",
              isActive && "tw-text-black hover:tw-text-white"
            )} />
          <span className={cn(isMinimized && "tw-hidden")}>{item.name}</span>
        </a>
      )}
      {item.children && isOpen && (
        <ul
          className={cn(
            "tw-ml-4 tw-space-y-1 tw-relative before:tw-content-[''] before:tw-absolute before:tw-w-[3px] before:tw-h-[calc(100%-20px)] before:tw-border-l before:tw-border-foreground/30",
            isMinimized && "before:hidden ml-0"
          )}>
          {item.children.map((child, index) => (
            <li
              key={index}
              className={cn(
                `tw-relative before:tw-content-[''] before:tw-absolute before:tw-w-[15px] before:tw-h-[5px] before:tw-top-[20px]
      before:tw-border-l before:tw-border-b before:tw-border before:tw-border-l-foreground/30
      before:tw-border-b-foreground/30 before:tw-rounded-bl-[50%] before:tw-border-t-0 before:tw-border-r-0`,
                isMinimized && "before:hidden"
              )}>
              <a
                className={cn(
                  "tw-flex tw-ml-4 group/nav-link tw-items-center tw-gap-4 tw-px-3 tw-h-10 hover:tw-bg-primary tw-rounded-md hover:tw-text-primary-foreground",
                  isMinimized && "tw-ml-0",
                  currentPathname === child.url &&
                    "tw-bg-primary tw-text-primary-foreground"
                )}
                href={child.url}>
                <child.icon
                  className="tw-text-foreground/70 tw-size-5 group/nav-link-hover:tw-text-primary-foreground" />
                <span className={cn(isMinimized && "tw-hidden")}>
                  {child.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>)
  );
};
