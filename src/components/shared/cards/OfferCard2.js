"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../../ui/wobble-card";

const OfferCard2 = () => {
    return (
        (<div
            className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-4 tw-max-w-7xl tw-mx-auto tw-w-full">
            <WobbleCard
                containerClassName="tw-col-span-1 lg:tw-col-span-2 tw-h-full !tw-bg-[#47B9A5] tw-min-h-[500px] lg:tw-min-h-[300px]"
                className="">
                <div className="tw-max-w-xs">
                    <h2
                        className="tw-text-left tw-text-balance tw-text-base md:tw-text-xl lg:tw-text-3xl tw-font-semibold tw-tracking-[-0.015em] tw-text-white">
                        Gippity AI powers the entire universe
                    </h2>
                    <p className="tw-mt-4 tw-text-left  tw-text-base/6 tw-text-neutral-200">
                        With over 100,000 mothly active bot users, Gippity AI is the most
                        popular AI platform for developers.
                    </p>
                    <button className="tw-bg-white tw-text-[#545454] tw-px-4 tw-py-3 hover:tw-bg-slate-300">Shop Now</button>
                </div>
                <Image
                    src="/img/gallery/2.webp"
                    width={500}
                    height={500}
                    alt="linear demo image"
                    className="tw-absolute -tw-right-4 lg:-tw-right-[40%] tw-grayscale tw-filter -tw-bottom-10 tw-object-contain tw-rounded-2xl" />
            </WobbleCard>
            <WobbleCard containerClassName="tw-col-span-1 tw-min-h-[300px] !tw-bg-[#E68648]">
                <h2
                    className="tw-max-w-80  tw-text-left tw-text-balance tw-text-base md:tw-text-xl lg:tw-text-3xl tw-font-semibold tw-tracking-[-0.015em] tw-text-white">
                    No shirt, no shoes, no weapons.
                </h2>
                <p className="tw-mt-4 tw-max-w-[26rem] tw-text-left  tw-text-base/6 tw-text-neutral-200">
                    If someone yells “stop!”, goes limp, or taps out, the fight is over.
                </p>
                <button
                    className="tw-bg-white tw-text-[#545454] tw-px-4 tw-py-3 hover:tw-bg-slate-300">Shop
                    Now
                </button>
            </WobbleCard>
            <WobbleCard
                containerClassName="tw-col-span-1 lg:tw-col-span-3 !tw-bg-[#C1B08F] tw-min-h-[500px] lg:tw-min-h-[600px] xl:tw-min-h-[300px]">
                <div className="max-w-sm">
                    <h2
                        className="tw-max-w-sm md:tw-max-w-lg  tw-text-left tw-text-balance tw-text-base md:tw-text-xl lg:tw-text-3xl tw-font-semibold tw-tracking-[-0.015em] tw-text-white">
                        Signup for blazing-fast cutting-edge state of the art Gippity AI
                        wrapper today!
                    </h2>
                    <p className="tw-mt-4 tw-max-w-[26rem] tw-text-left  tw-text-base/6 tw-text-neutral-200">
                        With over 100,000 mothly active bot users, Gippity AI is the most
                        popular AI platform for developers.
                    </p>
                    <button className="tw-bg-white tw-text-[#545454] tw-px-4 tw-py-3 hover:tw-bg-slate-300 tw-cursor-pointer">Explore
                    </button>
                </div>
                <Image
                    src="/img/gallery/3.webp"
                    width={500}
                    height={500}
                    alt="linear demo image"
                    className="tw-absolute -tw-right-10 md:-tw-right-[40%] lg:-tw-right-[20%] -tw-bottom-10 tw-object-contain tw-rounded-2xl" />
            </WobbleCard>
        </div>)
    );
}

export default OfferCard2;
