import React from 'react';
import { useLocation } from 'react-router-dom';

export function useSearchParams<ParamNames extends string[]>(
  ...parameterNames: ParamNames
): Record<ParamNames[number], string | null> {
  const { search } = useLocation();
  return React.useMemo(() => {
    // recalculate only when 'search' or arguments changed
    const searchParams = new URLSearchParams(search);
    return parameterNames.reduce(
      (accumulator, parameterName: ParamNames[number]) => {
        accumulator[parameterName] = searchParams.get(parameterName);
        return accumulator;
      },
      {} as Record<ParamNames[number], string | null>,
    );
  }, [search, parameterNames.join(',')]); // join for sake of reducing array of strings to simple, comparable string
}
