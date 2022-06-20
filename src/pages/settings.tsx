import React from 'react';

import { Main } from '../templates/main';

const Settings = () => (
  <Main>
    <div className="bg-purple-300 shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <p className="text-white text-xl">Settings</p>
        </div>
      </div>
    </div>
    <div className="mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-white text-sm">Coming soon!</p>
      </div>
    </div>
  </Main>
);

export default Settings;
