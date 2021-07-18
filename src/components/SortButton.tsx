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

  const mutateOrder = React.useCallback(
    (previousOrderType: SortType['order']) => {
      const mutate = {
        ascending: 'descending',
        descending: 'unordered',
        unordered: 'ascending',
      };
      return mutate[previousOrderType] as SortType['order'];
    },

    [],
  );

  const handleClick = React.useCallback(() => {
    const order = mutateOrder(sorting.order);
    setSorting({ order });
  }, [sorting.order, setSorting, mutateOrder]);

  return (
    <button
      type="button"
      className="absolute right-3 hover:text-gray-500 "
      onClick={handleClick}
    >
      {sorting.order === 'ascending' ? (
        <SortDescendingIcon className=" h-5 w-5 " />
      ) : sorting.order === 'descending' ? (
        <AdjustmentsIcon className=" h-5 w-5" />
      ) : (
        <SortAscendingIcon className=" h-5 w-5" />
      )}
    </button>
  );
};

export { SortButton };
