import * as React from 'react';

import {
  AdjustmentsIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/solid';
import { useSortContext } from '../context/SortContext';
import type { SortType } from '../lib/types/SortingTypes';

const SortButton = () => {
  const [sorting, setSorting] = useSortContext();

  const setNextOrder = React.useMemo(
    () => ({
      ascending: 'descending',
      descending: 'unordered',
      unordered: 'ascending',
    }),
    [],
  );

  const mutateOrder = React.useCallback(
    (previousOrderType: SortType['order']) => {
      return setNextOrder[previousOrderType] as SortType['order'];
    },
    [setNextOrder],
  );

  const handleClick = React.useCallback(() => {
    const order = mutateOrder(sorting.order);
    setSorting({ order });
  }, [sorting.order, setSorting, mutateOrder]);

  return (
    <button
      type="button"
      className="absolute right-0 md:right-3 hover:text-gray-500 has-tooltip focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white focus:border-white"
      onClick={handleClick}
    >
      <React.Fragment>
        <p className="ml-5 -mt-5 text-xs bg-gray-100 rounded shadow-lg tooltip text-primary ">
          sort {setNextOrder[sorting.order]}
        </p>
        {sorting.order === 'ascending' ? (
          <SortDescendingIcon className="w-4 h-4 sm:h-5 sm:w-5 " />
        ) : sorting.order === 'descending' ? (
          <AdjustmentsIcon className="w-4 h-4  sm:h-5 sm:w-5" />
        ) : (
          <SortAscendingIcon className="w-4 h-4  sm:h-5 sm:w-5" />
        )}
      </React.Fragment>
    </button>
  );
};

export { SortButton };
