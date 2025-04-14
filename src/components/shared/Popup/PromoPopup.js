'use client';

import {useState, useEffect, useMemo} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function PopupDialog({ promoData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [disableFor24h, setDisableFor24h] = useState(false);
  const [cachedImageUrl, setCachedImageUrl] = useState('');
  const [imageIsPreloaded, setImageIsPreloaded] = useState(false);
  const promo = promoData || [];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fungsi untuk melakukan pre-load gambar dan menangani caching
    const preloadImage = async () => {
      // Cek cache dulu
      const storedImageUrl = localStorage.getItem('promoImageUrl');
      const storedTimestamp = localStorage.getItem('promoImageTimestamp');
      const now = Date.now();
      const cacheValid = storedImageUrl && storedTimestamp &&
        (now - parseInt(storedTimestamp) < 24 * 60 * 60 * 1000);

      // Tentukan URL mana yang akan digunakan
      const currentPromoImage = promo[0]?.image;
      const imageToUse = cacheValid ? storedImageUrl : currentPromoImage;

      if (!imageToUse) return;

      // Pre-load gambar dengan HTMLImageElement
      return new Promise((resolve) => {
        const imgElement = document.createElement('img');
        imgElement.onload = () => {
          setCachedImageUrl(imageToUse);
          setImageIsPreloaded(true);

          // Update cache jika menggunakan gambar baru
          if (!cacheValid && currentPromoImage) {
            localStorage.setItem('promoImageUrl', currentPromoImage);
            localStorage.setItem('promoImageTimestamp', now.toString());
          }

          resolve();
        };
        imgElement.src = imageToUse;
      });
    };

    // Jalankan pre-load segera (tanpa menunggu event scroll)
    preloadImage();

  }, [promo]);

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

  const handleMinimizedClick = () => {
    setIsOpen(true);
    setIsMinimized(false);
    localStorage.setItem('popupMinimized', 'false');
  };

  const imageUrl = useMemo(() => {
    // Gunakan cache jika tersedia dan telah pre-loaded
    if (cachedImageUrl && imageIsPreloaded) {
      return cachedImageUrl;
    }
    // Gunakan gambar dari API jika tidak ada cache
    return promo[0]?.image || '';
  }, [cachedImageUrl, imageIsPreloaded, promo]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:tw-max-w-[900px] !tw-p-0 tw-z-[9999]" hideCloseButton>
          <div className="tw-flex tw-flex-row">
            {/* Image posisi kiri */}
            <div className="tw-w-1/2 tw-relative">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Fashion model"
                  width={350}
                  height={500}
                  priority={true}
                  loading="eager"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/wAALCAAIAAoBAREA/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAiEAACAQIFBQAAAAAAAAAAAAABAgMABAUSITFRBhMUFiP/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABwRAAEFAQEBAAAAAAAAAAAAAAEAAgMRIQQxQf/9oADAMBAAIRAxEAPwC9a17rLJZbayBZ55WCxqN2Y7AdSdhQPgwnGMZ+Tis9tlAy0kKzNGO5FoGWTcNygJBI22qNo9mVI8chJ+inZ3olJD7ahUuyNnDKbJ/A+6//2Q=="
                  className="tw-w-full tw-h-full tw-object-cover tw-rounded-l-lg"
                />
              )
              }
            </div>

            {/* Content wording posisi kanan */}
            <div className="tw-w-1/2 tw-relative">
              <Button
                variant="ghost"
                size="icon"
                className="tw-absolute tw-right-5 tw-top-4 tw-bg-white tw-rounded-full"
                onClick={handleClose}
              >
                <X className="tw-h-4 tw-w-4" />
              </Button>

              <DialogHeader>
                <DialogTitle className="tw-hidden !tw-p-0 !tw-m-0" />
              </DialogHeader>
              <div className="tw-space-y-6 tw-flex tw-flex-col tw-justify-center tw-h-full tw-item tw-p-6">
                <h1 className="tw-text-center">{promo[0]?.header}</h1>
                <p className="tw-text-lg tw-text-center">
                  {promo[0]?.description}
                </p>
                <input
                  type="email"
                  placeholder="Email *"
                  className="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-md"
                />
                <Button className="tw-w-full" onClick={handleClose}>
                  {promo[0]?.buttonLabel}
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
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Minimized button */}
      {isMinimized && !isOpen && !localStorage.getItem('popupDisabledUntil') && (
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
          <MessageSquare className="tw-h-4 tw-w-4 tw-mr-2"/>
          {promo[0]?.buttonLabelMinimal}
        </Button>
      )}

      {promo[0]?.image && !imageIsPreloaded && (
        <div style={{ display: 'none' }}>
          <img
            src={promo[0].image}
            alt="Preload"
            onLoad={() => {
              if (!imageIsPreloaded) {
                setCachedImageUrl(promo[0].image);
                setImageIsPreloaded(true);
                localStorage.setItem('promoImageUrl', promo[0].image);
                localStorage.setItem('promoImageTimestamp', Date.now().toString());
              }
            }}
          />
        </div>
      )}
    </>
  );
}