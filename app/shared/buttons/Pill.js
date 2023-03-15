export default function Pill({ children, outlined, className = '' }) {
  return (
    <button
      className={`${
        outlined ? 'bg-white text-black' : 'bg-black  text-white'
      } py-4 px-8 no-underline border-black border-solid border-1 rounded-full font-bold  btn-primary  active:shadow-md ${className}`}
    >
      {children}
    </button>
  );
}
