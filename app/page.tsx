import React from 'react';
import type { Metadata } from 'next'
import LandingPage from '@/components/landing-page';
export const metadata: Metadata = {
    title: 'Balia - Summer is here.',
}

const page = () => {
  return <LandingPage/>
};
export default page;
