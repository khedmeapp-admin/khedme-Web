import * as React from "react";

export function Tabs({ defaultValue, children, className }) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { value, setValue })
          : child
      )}
    </div>
  );
}

export function TabsList({ children, className }) {
  return (
    <div className={`flex border-b ${className || ""}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value: tabValue, value, setValue, children, className }) {
  return (
    <button
      onClick={() => setValue(tabValue)}
      className={`px-4 py-2 font-medium border-b-2 transition ${
        value === tabValue
          ? "border-orange-500 text-orange-600"
          : "border-transparent text-gray-500 hover:text-orange-600"
      } ${className || ""}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value: tabValue, value, children }) {
  if (value !== tabValue) return null;
  return <div>{children}</div>;
}
