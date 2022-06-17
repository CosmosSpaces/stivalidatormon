import { useMobileMenu } from './mobilemenu';

const MobileMenuBtn = () => {
  const { isOpen, setIsOpen } = useMobileMenu();
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
    >
      <span className="sr-only">Open sidebar</span>
      {/* <!-- Heroicon name: outline/menu-alt-1 --> */}
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
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </button>
  );
};

export default MobileMenuBtn;
