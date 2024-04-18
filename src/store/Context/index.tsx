// AppContext.js
import React, { createContext, useState } from "react";

// Create the context
export const Context = createContext({
  value: null,
  changeHandler: (newValue: any) => {},
});

// Create the provider component
export const ContextProvider = ({ children }: { children: any }) => {
  const [value, setValue] = useState(null);

  const changeHandler = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Context.Provider value={{ value, changeHandler }}>
      {children}
    </Context.Provider>
  );
};
