import { useState } from 'react';

import { searchString } from '../lib/util';
import useModals from '../stores/usemodals';
import useValidators from '../stores/usevalidators';
import MobileMenuBtn from './mobilemenubtn';

const Searchbar = () => {
  const { activate } = useModals();
  const [searchInput, setSearchInput] = useState<string>('');
  const validatorsStore = useValidators();
  return (
    <>
      <MobileMenuBtn />
      <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="flex-1 flex">
          <form
            className="w-full flex md:ml-0"
            action="#"
            method="GET"
            onSubmit={(e) => {
              e.preventDefault();
              validatorsStore.validators?.forEach((validator) => {
                if (
                  searchString(
                    searchInput.toUpperCase(),
                    validator?.validator?.description?.moniker.toUpperCase() ??
                      ''
                  ) ||
                  searchString(
                    searchInput.toUpperCase(),
                    validator?.chain?.chain_name.toUpperCase() ?? ''
                  )
                ) {
                  // console.log('found');
                }
              });
            }}
          >
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
                value={searchInput}
                onChange={(e) => {
                  if (e.target instanceof HTMLInputElement) {
                    setSearchInput(e.target.value);
                  }
                }}
              />
            </div>
          </form>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* <!-- Profile dropdown --> */}
          <div className="ml-3 relative">
            <button
              type="button"
              onClick={() => activate('test')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Add Validator
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
