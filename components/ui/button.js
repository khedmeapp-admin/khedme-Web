export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 
        bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
