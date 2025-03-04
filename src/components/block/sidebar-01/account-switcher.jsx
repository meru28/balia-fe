"use client";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Boxes, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

const Accounts = [
  {
    id: 1,
    name: "Brett",
    email: "brettw@gmail.com",
    image:
      "https://api.dicebear.com/9.x/avataaars/png?seed=Mason&backgroundColor=ffdfbf",
    icon: Boxes,
  },
  {
    id: 2,
    name: "Diwanshu Midha",
    email: "diwanshum@gmail.com",
    image:
      "https://api.dicebear.com/9.x/avataaars/png?seed=Amaya&backgroundColor=ffdfbf",
    icon: Boxes,
  },
  {
    id: 3,
    name: "John Doe",
    email: "johnd@gmail.com",
    image:
      "https://api.dicebear.com/9.x/avataaars/png?seed=Christian&backgroundColor=ffdfbf",
    icon: Boxes,
  },
];

export function AccountSwitcher({
  isMinimized
}) {
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(Accounts[0]);

  return (
    (<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "tw-grid tw-grid-cols-[50px_1fr_20px] tw-bg-card tw-gap-3 tw-p-2 tw-shadow-sm tw-border-border tw-border tw-rounded-lg hover:tw-bg-muted",
          isMinimized && "tw-px-0 tw-border-none"
        )}>
        <div className="tw-relative tw-w-[50px]">
          <Image
            src={selectedAccount.image}
            alt="profile image"
            width={50}
            height={50}
            className="tw-rounded-md tw-size-[50px]" />
          <div
            className="tw-absolute tw-bottom-0 tw-right-0 tw-p-[2px] tw-bg-black tw-text-white tw-size-4 tw-ring-white tw-ring-[1.5px] tw-rounded-sm">
            <selectedAccount.icon className="tw-size-3" />
          </div>
        </div>
        <div
          className={cn(
            "tw-text-start tw-min-w-[150px] tw-flex tw-flex-col tw-h-full tw-justify-center",
            isMinimized && "tw-hidden"
          )}>
          <span className="tw-block tw-text-sm tw-leading-[1.2]">
            {selectedAccount.name}
          </span>
          <span className="tw-block tw-leading-[1.2] tw-text-foreground/70 tw-text-xs ">
            {selectedAccount.email}
          </span>
        </div>
        <div className={cn("tw-self-center", isMinimized && "tw-hidden")}>
          <ChevronsUpDownIcon className="tw-w-4 tw-h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="tw-p-0">
        {Accounts.map((account) => (
          <UserInfo
            onSelect={() => {
              setSelectedAccount(account);
              setOpen(false);
            }}
            key={account.id}
            email={account.email}
            name={account.name}
            image={account.image}
            Icon={account.icon} />
        ))}
      </PopoverContent>
    </Popover>)
  );
}

const UserInfo = ({
  email,
  name,
  image,
  Icon,
  onSelect
}) => {
  return (
    (<button
      onClick={onSelect}
      className="tw-flex tw-w-full tw-cursor-pointer tw-gap-3 tw-p-2 tw-shadow-sm tw-border-border tw-border tw-rounded-lg hover:tw-bg-muted">
      <div className="tw-relative">
        <Image
          src={image}
          alt="profile image"
          width={40}
          height={40}
          className="tw-rounded-md" />
        <div
          className="tw-absolute tw-bottom-0 tw-right-0 tw-p-[2px] tw-bg-black tw-text-white tw-size-4 tw-ring-white tw-ring-[1.5px] tw-rounded-sm">
          <Icon className="tw-size-full" />
        </div>
      </div>
      <div
        className="tw-text-start tw-min-w-[150px] tw-flex tw-flex-1 tw-flex-col tw-h-full tw-justify-center">
        <span className="tw-block tw-text-sm tw-leading-[1.2]">{name}</span>
        <span className="tw-block tw-leading-[1.2] tw-text-foreground/70 tw-text-xs ">
          {email}
        </span>
      </div>
    </button>)
  );
};
