// components/TidioChat.tsx
'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

export default function TidioChat() {
  const pathname = usePathname();

  useEffect(() => {
    const removeTidioScript = () => {
      // Find and remove Tidio scripts
      const tidioScripts = document.querySelectorAll(
        'script[src*="tidio.co"]'
      );

      tidioScripts.forEach(script => {
        script.remove();
      });

      // Remove Tidio iframes if they exist
      const tidioIframes = document.querySelectorAll(
        'iframe[src*="tidio.co"]'
      );

      tidioIframes.forEach(iframe => {
        iframe.remove();
      });

      // Remove Tidio elements from the body
      const tidioElements = document.querySelectorAll(
        '[id^="tidio"], [class*="tidio"]'
      );

      tidioElements.forEach(el => {
        el.remove();
      });

      // Reset Tidio global object if it exists
      if (window.Tidiochat) {
        delete window.Tidiochat;
      }
    };

    // Execute removal logic if the path contains 'bdashboard'
    if (pathname.includes('bdashboard')) {
      removeTidioScript();
    } else {
      // Re-add the Tidio script if not in 'bdashboard'
      const script = document.createElement('script');
      script.src = '//code.tidio.co/afhy44v1oe2tzcgcz00f73v9enbbupdr.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      removeTidioScript();
    };
  }, [pathname]); // Run effect whenever the path changes

  return null;
}