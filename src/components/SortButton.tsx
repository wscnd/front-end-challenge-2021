import * as React from 'react';

import {
  AdjustmentsIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/solid';
import { useSortContext } from '../context/SortContext';
import { SortType } from '../lib/types/SortingTypes';

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
      className="absolute right-3 hover:text-gray-500 has-tooltip"
      onClick={handleClick}
    >
      <React.Fragment>
        <p className="ml-5 -mt-5 tooltip rounded shadow-lg text-xs bg-gray-100 text-primary ">
          sort {setNextOrder[sorting.order]}
        </p>
        {sorting.order === 'ascending' ? (
          <SortDescendingIcon className=" h-5 w-5 " />
        ) : sorting.order === 'descending' ? (
          <AdjustmentsIcon className=" h-5 w-5" />
        ) : (
          <SortAscendingIcon className=" h-5 w-5" />
        )}
      </React.Fragment>
    </button>
  );
};

export { SortButton };
