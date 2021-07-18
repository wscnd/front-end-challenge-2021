import * as React from 'react';

export function createContext<A>() {
  const ctx = React.createContext<A | undefined>(undefined);

  const useContext = () => {
    const context = React.useContext(ctx);
    if (context === undefined)
      throw new Error('useContext must be inside a Provider with a value');
    return context;
  };
  return [useContext, ctx.Provider] as const;
}
