import { useEffect, useState } from 'react';

import Link from 'next/link';

const LINKS = [
  { url: '/', label: 'Uptime' },
  { url: '/info/', label: 'Info' },
  { url: '/settings/', label: 'Settings' },
  { url: '/privacy/', label: 'Privacy' },
];

const NormalHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<string>('');

  const links = LINKS.map(({ url, label }) => (
    <Link key={label} href={url}>
      <a
        {...(url === currentLink
          ? {
              className:
                'bg-purple-100 text-white px-3 py-2 rounded-md text-sm font-medium',
              'aria-current': 'page',
            }
          : {
              className:
                'text-gray-300 hover:bg-purple-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium',
            })}
      >
        {label}
      </a>
    </Link>
  ));

  const mobileLinks = LINKS.map(({ url, label }) => (
    <Link key={label} href={url}>
      <a
        {...(url === currentLink
          ? {
              'aria-current': 'page',
              className:
                'bg-purple-100 text-white block px-3 py-2 rounded-md text-base font-medium',
            }
          : {
              className:
                'text-gray-300 hover:bg-purple-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"',
            })}
      >
        {label}
      </a>
    </Link>
  ));

  const handleToggleNav = () => setIsOpen(!isOpen);

  useEffect(() => {
    setCurrentLink(window.location.pathname);
  }, []);

  return (
    <nav className="bg-purple-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={handleToggleNav}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0 md:mr-8">
              <img
                className="w-10 h-10"
                src="/assets/images/logo.png"
                alt="logo"
              />
              <h1 className="text-2xl text-white mx-auto relative">
                Valmon
                <span
                  style={{ fontSize: '9px' }}
                  className="text-red-500 absolute"
                >
                  beta
                </span>
              </h1>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">{links}</div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="bg-purple-500 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={isOpen ? 'sm:hidden' : 'hidden'}>
        <div className="px-2 pt-2 pb-3 space-y-1">{mobileLinks}</div>
      </div>
    </nav>
  );
};

export default NormalHeader;
