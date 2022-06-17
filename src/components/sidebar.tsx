import { InformationCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-purple-500 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="w-16 h-16" src="/assets/images/logo.png" alt="logo" />
          <h1 className="text-lg text-white ml-5">Stivalidatormon</h1>
        </div>
        <nav
          className="mt-5 flex-1 flex flex-col divide-y divide-y-2 divide-cyan-400 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="px-2 space-y-1">
            {/* <!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" --> */}
            <Link href="/">
              <a
                className="bg-indigo-500 text-white group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                aria-current="page"
              >
                {/* <!-- Heroicon name: outline/home --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Uptime
              </a>
            </Link>
          </div>
          <div className="mt-6 pt-6">
            <div className="px-2 space-y-1">
              <Link href="/settings">
                <a className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600">
                  {/* <!-- Heroicon name: outline/cog --> */}
                  <svg
                    className="mr-4 h-6 w-6 text-cyan-200"
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </a>
              </Link>

              <Link href="/info">
                <a className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600">
                  {/* <!-- Heroicon name: outline/question-mark-circle --> */}
                  <InformationCircleIcon className="mr-4 h-6 w-6 text-cyan-200" />
                  Info
                </a>
              </Link>

              <Link href="/privacy">
                <a className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600">
                  {/* <!-- Heroicon name: outline/shield-check --> */}
                  <svg
                    className="mr-4 h-6 w-6 text-cyan-200"
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Privacy
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
