"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

const SearchInput = ({
  isMinimized
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (isMinimized) {
    return (
      (<div>
        <Button
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
          className="tw-size-[50px] tw-p-3 tw-h-10">
          <Search className=" tw-size-4 tw-text-foreground/60" />
        </Button>
        <SearchDialog isOpen={open} onOpenChange={setOpen} />
      </div>)
    );
  }

  return (
    (<div>
      <div className="tw-relative">
        <div className="tw-absolute tw-top-1/2 -tw-translate-y-1/2 tw-left-2">
          <Search className="tw-size-3 tw-text-foreground/60" />
        </div>
        <Input
          onFocus={(e) => {
            setOpen(true);
            e.target.blur();
          }}
          placeholder="Search"
          className="tw-pl-7 tw-bg-card tw-h-10" />
        <div
          className="tw-absolute tw-h-full tw-flex tw-items-center tw-justify-center tw-top-1/2 -tw-translate-y-1/2 tw-right-2">
          <kbd
            className="tw-pointer-events-none tw-inline-flex tw-h-[50%] tw-select-none tw-items-center tw-gap-1 tw-rounded tw-border tw-bg-muted tw-px-1.5 tw-font-mono tw-text-[10px] tw-font-medium tw-text-muted-foreground tw-opacity-100">
            <span className="tw-text-[10px]">⌘</span>K
          </kbd>
        </div>
      </div>
      <SearchDialog isOpen={open} onOpenChange={setOpen} />
    </div>)
  );
};

export default SearchInput;

const SearchDialog = ({
  isOpen,
  onOpenChange
}) => {
  return (
    (<CommandDialog open={isOpen} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="tw-mr-2 tw-h-4 tw-w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="tw-mr-2 tw-h-4 tw-w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="tw-mr-2 tw-h-4 tw-w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="tw-mr-2 tw-h-4 tw-w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="tw-mr-2 tw-h-4 tw-w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="tw-mr-2 tw-h-4 tw-w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>)
  );
};
