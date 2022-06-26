import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

const Fab = ({
  materialIcon,
  danger,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { materialIcon: string; danger?: boolean }) => {
  return (
    <button
      {...props}
      className={`fixed z-90 bottom-10 right-8 ${
        danger
          ? 'bg-red-500 hover:bg-red-700 '
          : 'bg-cyan-500 hover:bg-blue-700 '
      } w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-2xl hover:animate-bounce duration-100 ${
        props?.className ?? ''
      }`}
    >
      <span className="material-icons">{materialIcon}</span>
    </button>
  );
};

export default Fab;
