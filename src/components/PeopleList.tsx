import { PlusIcon, RefreshIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { ShowRefreshing } from '../components/ShowRefreshing';
import type { PersonPage, UsePersonList } from '../lib/types/PersonQuery';
import { filterByGender, filterByName } from '../lib/utils/filterPerson';
import { ShowLoading } from './ShowLoading';
import { Table, TableBody } from './Table';

type PeopleListProps = React.FunctionComponent<{
  query: UsePersonList;
  search: string;
  filter: { gender: string };
  pages: PersonPage;
}>;

const PeopleList: PeopleListProps = ({ query, search, filter }) => {
  const memoized = React.useMemo(() => {
    //NOTE: probably expensive?
    return (
      query.data?.pages.length &&
      query.data?.pages.map((page) =>
        page.results
          .filter((person) => filterByName(person, search))
          .filter((person) => filterByGender(person, filter.gender)),
      )
    );
  }, [filter.gender, search, query.data?.pages]);

  React.useEffect(() => {
    console.log('memoized:', memoized);
    console.log('filter:', filter);
  });

  const fetchNextPage = React.useCallback(() => {
    query.fetchNextPage();
  }, []);

  return (
    <div>
      {/* <div className="mb-6"> */}
      {/* <div className="fixed flex items-center pointer-events-none bottom-6 right-6">
        <ShowRefreshing
          Icon={RefreshIcon}
          show={
            query.isFetching && !query.isFetchingNextPage && !query.isLoading
          }
        />
      </div> */}
      {/* <section> */}
      <Table>
        {/* {query.data?.pages.length ? memoized : null} */}
        {query.data?.pages.length
          ? query.data?.pages.map((pages, index) => (
              <TableBody
                personList={pages.results
                  //NOTE: probably expensive?
                  .filter((person) => filterByName(person, search))
                  .filter((person) => filterByGender(person, filter.gender))}
                key={index}
              />
            ))
          : null}
      </Table>
      {/* <ShowLoading
          Icon={RefreshIcon}
          show={query.isLoading}
          text={'Loading...'}
        /> */}
      {/* </section> */}
      {/* <div className="flex justify-center w-full h-10">
        {!query.isFetchingNextPage && !query.isLoading ? (
          <button
            type="button"
            onClick={fetchNextPage}
            disabled={query.isFetching}
            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 border border-transparent rounded-md shadow-sm disabled:bg-bg-2 disabled:cursor-not-allowed disabled:text-gray-400 text-bg bg-primary hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Fetch More
          </button>
        ) : (
          <ShowLoading
            Icon={RefreshIcon}
            show={query.isFetchingNextPage}
            text={'Loading More...'}
          />
        )}
      </div> */}
    </div>
  );
};

export { PeopleList };
