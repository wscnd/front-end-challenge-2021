import * as React from 'react';
import { usePersonQueryWithConfig } from '../hooks/usePersonList';
import { useSearchParams } from '../hooks/useSearchParams';
import type { WithPersonListQueryType } from '../lib/types/WithPersonListQueryType';

type WithPersonListQueryProps = {
  children: React.FunctionComponent<WithPersonListQueryType>;
};

const WithPersonListQuery: React.FunctionComponent<WithPersonListQueryProps> =
  ({ children }) => {
    /**
     * NOTE: PageQueryParams Related
     **/

    const page = useSearchParams('page').page ?? '1';
    const [pageFromUrlParam, setPageFromUrlParam] = React.useState(() => {
      return page;
    });

    /**
     * NOTE: PersonQuery Related
     **/
    const personQuery = usePersonQueryWithConfig(
      {
        keepPreviousData: true,
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        onError: (error) => {
          console.error('error:', error);
        },
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

export { WithPersonListQuery };
