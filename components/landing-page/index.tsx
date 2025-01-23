'use client';

import LayoutLoader from "@/components/layout-loader";
import { useMounted } from "@/hooks/use-mounted";
import Hero from "@/components/landing-page/hero";
import ShopCollections from "@/components/landing-page/shop-collections";

const LandingPageView = () => {
    const mounted = useMounted();
    if (!mounted) {
        return <LayoutLoader />;
    }
    return (
        <>
            <Hero />
            <ShopCollections />
        </>
    )
}

export default LandingPageView;
