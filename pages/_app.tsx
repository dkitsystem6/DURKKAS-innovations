// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import PageLoader from "@/components/common/page-loader";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Clear service worker cache in development
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
        });
      }
      
      // Clear browser cache
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
      }
    }
  }, []);

  return (
    <>
      <PageLoader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
