//create react context
import * as React from 'react';
import type { SetState } from '../lib/types/SetState';
import type { SortType } from '../lib/types/SortingTypes';
import { createContext } from './createContext';

type SortContextType = SetState<SortType>;

export const [useSortContext, SortProvider] = createContext<SortContextType>();

export const SortContextProvider: React.FunctionComponent = ({ children }) => {
  const sort = React.useState<SortType>({
    order: 'unordered',
  });

  // React.useEffect(() => {
  //   console.log('sort order from context is ', sort[0]);
  // }, [sort]);

  return <SortProvider value={sort}>{children}</SortProvider>;
};
