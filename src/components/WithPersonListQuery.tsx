import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useCurrentPageFromParams } from '../hooks/useCurrentPageFromParams';
import { usePersonQueryWithConfig } from '../hooks/usePersonList';
import { useSearchParams } from '../hooks/useSearchParams';
import type { WithPersonListQueryType } from '../lib/types/WithPersonListQueryType';

type WithPersonListQueryProps = {
  maxPages: number;
  children: React.FunctionComponent<WithPersonListQueryType>;
};

const WithPersonListQuery: React.FunctionComponent<WithPersonListQueryProps> =
  ({ children, maxPages  }) => {
    /**
     * NOTE: PageQueryParams Related
     **/
    const page = useSearchParams('page').page ?? '1';
    const { currentPage , setCurrentPage , validateCurrentPage  } =
      useCurrentPageFromParams(page, maxPages);

    const history = useHistory();

    React.useEffect(() => {
      const unlisten = history.listen(async () => {
        window.scrollTo(0, 0);
      });
      return unlisten;
    }, [history.action, history]);

    React.useEffect(() => {
      const currentPageNumber = validateCurrentPage(currentPage);
      if (currentPageNumber !== '1') {
        history.replace({
          pathname: '/',
          search: `?page=${validateCurrentPage(currentPage)}`,
        });
      }
    }, [history, validateCurrentPage, currentPage]);

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
          page: currentPage,
        },
      },
    );

    /**
     * NOTE: Controls to fetch next/previous page or specific page
     **/
    const fetchPage = React.useCallback(
      async (page: number) => {
        setCurrentPage(() => {
          return String(page);
        });
      },
      [setCurrentPage],
    );

    const fetchPreviousPage = React.useCallback(async () => {
      setCurrentPage((previous) => {
        return String(Number(previous) - 1);
      });
    }, [setCurrentPage]);

    const fetchNextPage = React.useCallback(async () => {
      setCurrentPage((previous) => {
        return String(Number(previous) + 1);
      });
    }, [setCurrentPage]);

    return children({
      query: personQuery,
      actions: { fetchNextPage, fetchPreviousPage, fetchPage },
    });
  };

export { WithPersonListQuery };
