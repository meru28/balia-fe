"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {Logo1} from "@/components/svg";
import {Logo2} from "@/components/svg";

export function MainNav({ scroll }: { scroll: boolean }) {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
                {
                    scroll ? <Logo2 className="h-24 w-24" /> : <Logo1 className="h-24 w-24" />
                }
            </Link>
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
                <Link
                    href="/"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/" ? "text-secondary" : "text-foreground/80"
                    )}
                >
                    Homepage
                </Link>
                <Link
                    href="/docs/components"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/docs/components") &&
                        !pathname?.startsWith("/docs/component/chart")
                            ? "text-foreground"
                            : "text-foreground/80"
                    )}
                >
                    About us
                </Link>
                <Link
                    href="/blocks"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/blocks")
                            ? "text-foreground"
                            : "text-foreground/80"
                    )}
                >
                    Shop
                </Link>
                <Link
                    href="/charts"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/docs/component/chart") ||
                        pathname?.startsWith("/charts")
                            ? "text-foreground"
                            : "text-foreground/80"
                    )}
                >
                    Blog/Articles
                </Link>
                <Link
                    href="/themes"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname?.startsWith("/themes")
                            ? "text-foreground"
                            : "text-foreground/80"
                    )}
                >
                    Customer Supports
                </Link>
            </nav>
        </div>
    )
}
