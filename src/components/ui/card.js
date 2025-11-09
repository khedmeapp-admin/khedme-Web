// src/components/ui/card.js
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
