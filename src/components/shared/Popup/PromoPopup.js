'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function PopupDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [disableFor24h, setDisableFor24h] = useState(false);

  useEffect(() => {
    // Check if popup was disabled within last 24h
    const disabledUntil = localStorage.getItem('popupDisabledUntil');
    if (disabledUntil && new Date(disabledUntil) > new Date()) {
      return;
    }

    // Show popup after scrolling 100px
    const handleScroll = () => {
      if (window.scrollY > 100 && !isMinimized) {
        setIsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMinimized]);

  const handleClose = () => {
    if (disableFor24h) {
      const disableUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      localStorage.setItem('popupDisabledUntil', disableUntil);
    }
    setIsOpen(false);
    setIsMinimized(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:tw-max-w-[425px] !tw-p-0 tw-z-[9999]" hideCloseButton>
          <DialogHeader>
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"
              alt="Fashion model"
              width={800} // Ganti sesuai kebutuhan
              height={400} // Ganti sesuai kebutuhan
              className="tw-w-full tw-h-64 tw-object-cover tw-rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="tw-absolute tw-right-4 tw-top-4 tw-bg-white tw-rounded-full"
              onClick={handleClose}
            >
              <X className="tw-h-4 tw-w-4" />
            </Button>
          </DialogHeader>
          <div className="tw-space-y-6 tw-p-6">
            <h1 className="tw-text-center">Don&rsquo;t miss out</h1>
            <p className="tw-text-lg tw-text-center">
              Be the first one to get the new product at early bird prices.
            </p>
            <input
              type="email"
              placeholder="Email *"
              className="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md"
            />
            <Button className="tw-w-full" onClick={handleClose}>
              Keep me updated
            </Button>
            <div className="tw-flex tw-items-center tw-space-x-2">
              <Checkbox
                id="disable24h"
                checked={disableFor24h}
                onCheckedChange={(checked) => setDisableFor24h(checked)}
              />
              <label
                htmlFor="disable24h"
                className="tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
              >
                Don&rsquo;t show this popup for 24 hours
              </label>
            </div>
            <button
              className="tw-text-center tw-w-full tw-text-sm tw-text-gray-500 tw-underline"
              onClick={handleClose}
            >
              Not interested
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Minimized button */}
      {isMinimized && !isOpen && (
        <Button
          className={cn(
            'tw-fixed tw-bottom-4 tw-left-4 tw-shadow-lg tw-transition-all tw-duration-300',
            'hover:tw-shadow-xl hover:tw-scale-105 tw-animate-bounce tw-z-[9999]'
          )}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
        >
          <MessageSquare className="tw-h-4 tw-w-4 tw-mr-2" />
          New Offer
        </Button>
      )}
    </>
  );
}