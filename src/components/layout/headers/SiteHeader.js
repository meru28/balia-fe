"use client"

import React, {useEffect, useState} from 'react'
import {
  ChevronRight,
  User,
  Settings,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'

const formatBreadcrumbLabel = (path) => {
  return path
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

const SiteHeader = ({
                                                 isMinimized,
                                                 toggleSidebar
                                               }) => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Ubah nilai sesuai kebutuhan
    };

    // Tambahkan event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const breadcrumbs = pathname.split('/').filter(Boolean)
  return (
    <header className={`tw-fixed tw-top-0 tw-right-0 tw-left-[265px] tw-z-30 tw-flex tw-items-center tw-justify-between tw-border-b tw-h-24 tw-transition-all tw-duration-300 ${
      isScrolled
        ? 'tw-bg-white/30 tw-backdrop-blur-lg tw-shadow-md'
        : 'tw-bg-white tw-shadow-lg'
    }`}
    >
      {/* Breadcrumb */}
      <div className="tw-flex tw-items-center tw-px-5">
        <nav aria-label="Breadcrumb" className="tw-flex tw-items-center">
          <Link
            href="/"
            className="tw-text-sm tw-text-gray-500 hover:tw-text-gray-700"
          >
            Home
          </Link>

          {breadcrumbs.map((path, index) => {
            const href = `/${breadcrumbs.slice(0, index + 1).join('/')}`
            const isLast = index === breadcrumbs.length - 1

            return (
              <React.Fragment key={href}>
                <ChevronRight className="tw-mx-2 tw-h-4 tw-w-4 tw-text-gray-400" />
                <Link
                  href={href}
                  className={`tw-text-sm ${
                    isLast
                      ? 'tw-text-gray-900 tw-font-semibold'
                      : 'tw-text-gray-500 hover:tw-text-gray-700'
                  }`}
                >
                  {formatBreadcrumbLabel(path)}
                </Link>
              </React.Fragment>
            )
          })}
        </nav>
      </div>

      {/* Kanan Header */}
      <div className="tw-flex tw-items-center tw-space-x-4 tw-px-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="tw-relative tw-h-8 tw-w-8 tw-rounded-full">
              <Avatar className="tw-h-10 tw-w-10">
                <AvatarImage
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="tw-flex tw-flex-col">
                <span>{session?.user?.name}</span>
                <span className="tw-text-xs tw-text-gray-500">
                  {session?.user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="tw-mr-2 tw-h-4 tw-w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="tw-mr-2 tw-h-4 tw-w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="tw-text-red-500"
            >
              <LogOut className="tw-mr-2 tw-h-4 tw-w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="tw-flex tw-flex-col tw-space-y-1">
          <span className="tw-text-lg">{session?.user?.name}</span>
          <span className="tw-text-xs tw-text-gray-500">{session?.user?.roles}</span>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader