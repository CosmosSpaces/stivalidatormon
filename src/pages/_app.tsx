import React from 'react';

import { AppProps } from 'next/app';

import '../styles/main.css';
import ModalEntry from '../components/modalentry';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    <ModalEntry />
  </>
);

export default MyApp;
