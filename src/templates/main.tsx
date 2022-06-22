import React, { ReactNode } from 'react';

import CosmosSpacesAd from '../components/cosmosspacesad';
import MobileMenu from '../components/mobilemenu';
import MobileMenuBtn from '../components/mobilemenubtn';
import { ID as ADD_VALIDATOR } from '../components/modals/addvalidator';
import Sidebar from '../components/sidebar';
import useModals from '../stores/usemodals';

const Main = (props: { children: ReactNode }) => {
  const { activate } = useModals();
  return (
    <div className="min-h-full">
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <MobileMenu />

      {/* <!-- Static sidebar for desktop --> */}
      <Sidebar />

      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-purple-300 border-b border-gray-200 lg:border-none">
          {/* <!-- Search bar --> */}
          <MobileMenuBtn />
          <div className="flex-1 px-4 flex justify-end sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <!-- Profile dropdown --> */}
              <div className="ml-3 relative">
                <button
                  type="button"
                  onClick={() => activate(ADD_VALIDATOR)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Add Validator
                </button>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 pb-8 bg-purple-100">
          {props.children}
          <div className="mt-8">
            <CosmosSpacesAd />
          </div>
        </main>
      </div>
    </div>
  );
};

export { Main };
