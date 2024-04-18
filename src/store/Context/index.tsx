// AppContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const Context = createContext({
  value: null,
  controller: null,
  changeHandler: (newValue: any) => {},
  stopRequests: () => {},
});

// Create the provider component
export const ContextProvider = ({ children }: { children: any }) => {
  const [value, setValue] = useState(null);
  const [controller, setController] = useState<any>(null);

  const stopRequests = () => {
    if (controller) {
      controller.abort();
      setController(null);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
  }, []);

  const changeHandler = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Context.Provider
      value={{ value, controller, changeHandler, stopRequests }}
    >
      {children}
    </Context.Provider>
  );
};
