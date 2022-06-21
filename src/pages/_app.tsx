import React from 'react';

import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/main.css';
import ModalEntry from '../components/modalentry';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    <ModalEntry />
  </QueryClientProvider>
);

export default MyApp;
