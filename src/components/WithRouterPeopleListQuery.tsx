import * as React from 'react';
import { usePeopleListWithConfigPaged } from '../hooks/usePeopleList';
import { useSearchParams } from '../hooks/useSearchParams';
import type { WithRouterPeopleListQueryTypePaged } from '../lib/types/WithRouterPeopleListQuery';

type WithRouterPeopleListQueryProps = {
  children: React.FunctionComponent<WithRouterPeopleListQueryTypePaged>;
};

const WithRouterPeopleListQuery: React.FunctionComponent<WithRouterPeopleListQueryProps> =
  ({ children }) => {
    /**
     * NOTE: PageQueryParams Related
     **/

    const { page } = useSearchParams('page');
    const [pageFromUrlParam, setPageFromUrlParam] = React.useState(() => {
      return page || '0';
    });

    /**
     * NOTE: PersonQuery Related
     **/
    const personQuery = usePeopleListWithConfigPaged(
      {
        keepPreviousData: true,
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        refetchOnWindowFocus: false,
      },
      {
        params: {
          results: 50,
          page: pageFromUrlParam,
        },
      },
    );

    const fetchPage = React.useCallback(async (page: number) => {
      setPageFromUrlParam(() => {
        return String(page);
      });
    }, []);

    const fetchPreviousPage = React.useCallback(async () => {
      setPageFromUrlParam((previous) => {
        return String(Number(previous) - 1);
      });
    }, []);

    const fetchNextPage = React.useCallback(async () => {
      setPageFromUrlParam((previous) => {
        return String(Number(previous) + 1);
      });
    }, []);

    return children({
      query: personQuery,
      actions: { fetchNextPage, fetchPreviousPage, fetchPage },
    });
  };

export { WithRouterPeopleListQuery };
