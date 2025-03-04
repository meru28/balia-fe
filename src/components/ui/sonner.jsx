"use client";
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "tw-group tw-toast group-[.toaster]:tw-bg-blue-100 group-[.toaster]:tw-text-foreground group-[.toaster]:tw-border-border group-[.toaster]:tw-shadow-lg",
          description: "group-[.toast]:tw-text-muted-foreground",
          actionButton:
            "group-[.toast]:tw-bg-primary group-[.toast]:tw-text-primary-foreground",
          cancelButton:
            "group-[.toast]:tw-bg-muted group-[.toast]:tw-text-muted-foreground",
        },
      }}
      {...props} />)
  );
}

export { Toaster }
