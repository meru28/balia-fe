'use client';

import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const carouselItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'PURSES',
    href: '/purses'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'SHOES',
    href: '/shoes'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'ACCESSORIES',
    href: '/accessories'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'JEANS',
    href: '/jeans'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'WATCHES',
    href: '/watches'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'SUNGLASSES',
    href: '/sunglasses'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'SCARVES',
    href: '/scarves'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'BELTS',
    href: '/belts'
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'HATS',
    href: '/hats'
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1618274158630-bc47a614b3a8?q=80&w=1200&h=800&auto=format&fit=crop',
    title: 'JEWELRY',
    href: '/jewelry'
  }
];

const MotionCarouselItem = motion(CarouselItem);

export default function CustomCarousel() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="tw-w-full tw-mt-32 tw-mb-24 tw-mx-auto tw-px-20">
      <motion.h1
        className="section-title text-center tw-pb-12 tw-capitalize"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        Browse Categories
      </motion.h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="tw-w-full"
        setApi={setApi}
      >
        <CarouselContent className="-tw-ml-2 md:-tw-ml-4">
          {carouselItems.map((item) => (
            <MotionCarouselItem
              key={item.id}
              className="tw-pl-1 md:tw-pl-2 tw-basis-full md:tw-basis-1/2 lg:tw-basis-1/5"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: false }}
            >
              <Link href={item.href}>
                <motion.div
                  className="tw-relative group"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card className="tw-border-none tw-bg-transparent">
                    <CardContent className="tw-p-1">
                      <div className="tw-relative tw-aspect-square tw-overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="tw-object-cover tw-bg-gray-100"
                          priority
                        />
                        <motion.div
                          className="tw-absolute tw-inset-0 tw-bg-black/40 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-flex tw-items-center tw-justify-center"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <ExternalLink className="tw-w-8 tw-h-8 tw-text-white" />
                        </motion.div>
                      </div>
                      <div className="tw-text-center tw-mt-4">
                        <h3 className="tw-text-lg tw-font-semibold tw-tracking-wide">{item.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </MotionCarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="tw-left-4" />
        <CarouselNext className="tw-right-4" />
      </Carousel>
    </div>
  );
}