import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { usePageNumberFromParams } from '../hooks/usePageNumberFromParams';
import { usePersonQueryWithConfig } from '../hooks/usePersonList';
import { useSearchParams } from '../hooks/useSearchParams';
import type { WithPersonListQueryType } from '../lib/types/WithPersonListQueryType';

type WithPersonListQueryProps = {
  maxPageNumber: number;
  children: React.FunctionComponent<WithPersonListQueryType>;
};

const WithPersonListQuery: React.FunctionComponent<WithPersonListQueryProps> =
  ({ children, maxPageNumber }) => {
    /**
     * NOTE: PageQueryParams Related
     **/
    const page = useSearchParams('page').page ?? '1';
    const { pageFromUrlParam, setPageFromUrlParam, verifyPageNumber } =
      usePageNumberFromParams(page, maxPageNumber);

    const history = useHistory();

    React.useEffect(() => {
      history.replace({
        pathname: '/',
        search: `?page=${verifyPageNumber(page)}`,
      });
    }, [history, page, pageFromUrlParam, verifyPageNumber]);

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

    /**
     * NOTE: Controls to fetch next/previous page or specific page
     **/
    const fetchPage = React.useCallback(
      async (page: number) => {
        setPageFromUrlParam(() => {
          return String(page);
        });
      },
      [setPageFromUrlParam],
    );

    const fetchPreviousPage = React.useCallback(async () => {
      setPageFromUrlParam((previous) => {
        return String(Number(previous) - 1);
      });
    }, [setPageFromUrlParam]);

    const fetchNextPage = React.useCallback(async () => {
      setPageFromUrlParam((previous) => {
        return String(Number(previous) + 1);
      });
    }, [setPageFromUrlParam]);

    return children({
      query: personQuery,
      actions: { fetchNextPage, fetchPreviousPage, fetchPage },
    });
  };

export { WithPersonListQuery };
