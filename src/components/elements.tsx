export const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
        props?.className ?? ''
      }`}
    />
  );
};
