import React, { ReactNode } from 'react';

import MobileMenu from '../components/mobilemenu';
import Searchbar from '../components/searchbar';
import Sidebar from '../components/sidebar';

const Main = (props: { children: ReactNode }) => (
  <div className="min-h-full">
    {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
    <MobileMenu />

    {/* <!-- Static sidebar for desktop --> */}
    <Sidebar />

    <div className="lg:pl-64 flex flex-col flex-1">
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-purple-300 border-b border-gray-200 lg:border-none">
        {/* <!-- Search bar --> */}
        <Searchbar />
      </div>
      <main className="flex-1 pb-8 bg-purple-100">{props.children}</main>
    </div>
  </div>
);

export { Main };
