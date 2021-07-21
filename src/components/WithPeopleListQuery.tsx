import * as React from 'react';
import { usePeopleListWithConfigInfinite } from '../hooks/usePeopleList';
import type { UsePersonListInfinite } from '../lib/types/PersonQuery';

type WithPeopleProp = {
  children: React.FunctionComponent<UsePersonListInfinite>;
};

const WithPeopleListQuery: React.FunctionComponent<WithPeopleProp> = ({
  children,
}) => {
  const peopleQuery = usePeopleListWithConfigInfinite(
    {
      keepPreviousData: true,
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      getNextPageParam: (lastPage, pages) => {
        // console.log('pages:', pages)
        return lastPage.info.page + 1;
      },
    },
    {
      params: {
        results: 50,
        page: 30,
      },
    },
  );
  return children(peopleQuery);
};

export { WithPeopleListQuery };
