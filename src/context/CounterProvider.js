import React from "react";

export const CounterContext = React.createContext();
export const CounterDispatcherContext = React.createContext();

function CounterProvider({ children }) {
  const [state, setState] = React.useState(0);

  return (
    <CounterContext.Provider value={state} setValue={setState}>
        {children}
    </CounterContext.Provider>
  );
}

export { CounterProvider };
