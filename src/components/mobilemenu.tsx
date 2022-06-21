import Link from 'next/link';
import create from 'zustand';

interface MobileMenuStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const useMobileMenu = create<MobileMenuStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

const MobileMenu = () => {
  const { isOpen, setIsOpen } = useMobileMenu();
  return (
    <div
      className={`relative z-40 ${isOpen ? 'fixed' : 'hidden'} lg:hidden`}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
      <div className="inset-0 flex z-40">
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-purple-500">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Close sidebar</span>
              {/* <!-- Heroicon name: outline/x --> */}
              <svg
                className="h-6 w-6 text-white"
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

          <div className="flex-shrink-0 flex items-center px-4">
            <img
              className="w-16 h-16"
              src="/assets/images/logo.png"
              alt="logo"
            />
            <h1 className="text-cyan-200 ml-4 relative">
              Valmon
              <span
                style={{ fontSize: '9px' }}
                className="text-red-500 mb-5 absolute top-0"
              >
                beta
              </span>
            </h1>
          </div>
          <nav
            className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="px-2 space-y-1">
              {/* <!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" --> */}
              <Link href="/">
                <a
                  className="bg-purple-500 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
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
                  <a className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600">
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
                  <a className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600">
                    {/* <!-- Heroicon name: outline/question-mark-circle --> */}
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Info
                  </a>
                </Link>

                <Link href="/privacy">
                  <a className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600">
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

        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
