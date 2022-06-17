import { useState } from 'react';

import MobileMenuBtn from './mobilemenubtn';

const Searchbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <MobileMenuBtn />
      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="flex-1 flex">
          <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div
                className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                {/* <!-- Heroicon name: solid/search --> */}
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search-field"
                name="search-field"
                className="block bg-purple-300 w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* <!-- Profile dropdown --> */}
          <div className="ml-3 relative">
            <div>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="max-w-xs bg-purple-300 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-purple-300"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="/assets/images/penguin.jpg"
                  alt=""
                />
                <span className="hidden ml-3 text-cyan-400 text-sm font-medium lg:block">
                  <span className="sr-only">Open user menu for </span>Marty
                </span>
                {/* <!-- Heroicon name: solid/chevron-down --> */}
                <svg
                  className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
            <div
              className={`origin-top-right ${
                menuOpen ? 'absolute' : 'hidden'
              } right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-purple-500 ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
              <a
                href="#"
                className="block px-4 py-2 text-sm text-cyan-500"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-0"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-cyan-500"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-1"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-cyan-500"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
