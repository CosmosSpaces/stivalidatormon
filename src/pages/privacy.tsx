import React from 'react';

import Lorem from '../components/lorem';
import { Main } from '../templates/main';

const Privacy = () => (
  <Main>
    <section className="mx-12 py-8 text-white">
      <h1 className="text-2xl font-semibold text-cyan-400 mb-10">
        {' '}
        Privacy Policy{' '}
      </h1>
      <Lorem />
    </section>
  </Main>
);

export default Privacy;
