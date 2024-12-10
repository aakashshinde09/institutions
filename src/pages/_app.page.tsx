import "@shared/styles/global.scss";

import { ComposeProviders } from "@app/_compose-providers.component";
import { initAxiosInstance } from "@shared/api";
import type { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useEffect } from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  // On startup
  useEffect(() => {
    initAxiosInstance(process.env.NEXT_PUBLIC_SERVER_URL);
  }, []);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-jakarta: ${plusJakartaSans.style.fontFamily};
          }
        `}
      </style>

      <ComposeProviders>
        <Component {...pageProps} />
      </ComposeProviders>
    </>
  );
};

export default MyApp;
