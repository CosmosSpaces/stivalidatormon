import React from 'react';

import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../styles/main.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
);

export default MyApp;
