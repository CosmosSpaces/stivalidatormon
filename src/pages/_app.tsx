import React from 'react';

import { AppProps } from 'next/app';
import '../styles/main.css';
import Script from 'next/script';

import ModalEntry from '../components/modalentry';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-453R76TK2B"
    />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-453R76TK2B');
      `}
    </Script>
    <Component {...pageProps} />
    <ModalEntry />
    {/* Global site tag (gtag.js) - Google Analytics */}
  </>
);

export default MyApp;
