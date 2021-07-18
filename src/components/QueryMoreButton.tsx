import { PlusIcon } from '@heroicons/react/solid';
import React from 'react';
import { WithRouterPeopleListQueryType } from '../lib/types/WithRouterPeopleListQuery';

export const QueryMoreButton: React.FunctionComponent<WithRouterPeopleListQueryType> =
  ({ query, fetchMorePeople }) => {
    return (
      <button
        type="button"
        onClick={fetchMorePeople}
        disabled={query.isFetching}
        className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 border border-transparent rounded-md shadow-sm disabled:bg-bg-2 disabled:cursor-not-allowed disabled:text-gray-400 text-bg bg-primary hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        Fetch More?
      </button>
    );
  };