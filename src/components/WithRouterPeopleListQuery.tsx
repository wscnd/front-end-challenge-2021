import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { usePeopleListWithConfig } from '../hooks/usePeopleList';
import { useSearchParams } from '../hooks/useSearchParams';
import type { PersonInfiniteData } from '../lib/types/PersonQuery';
import type { WithRouterPeopleListQueryType } from '../lib/types/WithRouterPeopleListQuery';

type WithRouterPeopleListQueryProps = {
  children: React.FunctionComponent<WithRouterPeopleListQueryType>;
};

const WithRouterPeopleListQuery: React.FunctionComponent<WithRouterPeopleListQueryProps> =
  ({ children }) => {
    /**
     * NOTE: PageQueryParams Related
     **/

    const history = useHistory();
    const { page } = useSearchParams('page');
    const pageFromUrlParam = React.useState(page)[0];

    /**
     * NOTE: PersonQuery Related
     **/
    const queryClient = useQueryClient();
    const peopleQuery = usePeopleListWithConfig(
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
          page: pageFromUrlParam,
        },
      },
    );

    const fetchMorePeople = React.useCallback(async () => {
      await peopleQuery.fetchNextPage();

      const [latestPageInfo] =
        queryClient
          .getQueryData<PersonInfiniteData>('people')
          ?.pages.slice(-1) ?? [];

      console.log('latestPageInfo:', latestPageInfo.info.page);

      if (latestPageInfo) {
        history.replace({ search: `page=${latestPageInfo.info.page}` });
      }
    }, [peopleQuery, history, queryClient]);

    React.useEffect(() => {
      console.log('pageFromUrlParam:', pageFromUrlParam);
    }, [pageFromUrlParam]);

    return children({ query: peopleQuery, actions: { fetchMorePeople } });
  };

export { WithRouterPeopleListQuery };
