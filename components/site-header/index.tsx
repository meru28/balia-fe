"use client"
import Link from "next/link"
import React from "react";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from '@/components/site-header/main-nav'
import { Button } from "@/registry/new-york/ui/button"

const Header = () => {
    const [scroll, setScroll] = useState<boolean>(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    return (
        <header className={scroll ? "border-grid fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background/20 fixed top-0 z-50 w-full"}>
            <div className="container-wrapper">
                <div className="flex h-14 items-center justify-center max-w-screen-xl mx-auto">
                    <MainNav scroll={scroll} />
                    <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
                        <div className="w-full flex-1 md:w-auto md:flex-none">
                            <CommandMenu />
                        </div>
                        <nav className="flex items-center gap-0.5">
                            <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                                <Link
                                    href={siteConfig.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icons.user className="h-4 w-4 scale-[1.2]" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                                <Link
                                    href={siteConfig.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icons.shoppingCart className="h-4 w-4 scale-[1.2]" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;
