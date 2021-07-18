import { PlusIcon, RefreshIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { ShowRefreshing } from '../components/ShowRefreshing';
import type { Person } from '../lib/types/Person';
import type { UsePersonList } from '../lib/types/PersonQuery';
import { ShowLoading } from './ShowLoading';
import { Table, TableBody } from './Table';

type PeopleListProps = React.FunctionComponent<{
  query: UsePersonList;
  search: string;
}>;

const PeopleList: PeopleListProps = ({ query, search }) => {
  React.useEffect(() => {
    console.log(search);
  });

  const filterPeople = (person: Person) => {
    if (search) {
      const fullName = `${person.name.first} ${person.name.last}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    } else return person;
  };

  const fetchNextPage = React.useCallback(() => {
    query.fetchNextPage();
  }, []);

  return (
    <div className="mb-6">
      <div className="pointer-events-none fixed bottom-6 right-6 flex items-center">
        <ShowRefreshing
          Icon={RefreshIcon}
          show={
            query.isFetching && !query.isFetchingNextPage && !query.isLoading
          }
        />
      </div>
      <section>
        <Table>
          {query.data?.pages.length
            ? query.data?.pages.map((pages, index) => (
                <TableBody
                  personList={pages.results.filter(filterPeople)}
                  key={index}
                />
              ))
            : null}
        </Table>
        <ShowLoading
          Icon={RefreshIcon}
          show={query.isLoading}
          text={'Loading...'}
        />
      </section>
      <div className="w-full h-10 flex justify-center">
        {!query.isFetchingNextPage && !query.isLoading ? (
          <button
            type="button"
            onClick={fetchNextPage}
            disabled={query.isFetching}
            className=" inline-flex disabled:bg-bg-2 disabled:cursor-not-allowed disabled:text-gray-400 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-bg bg-primary hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
      </div>
    </div>
  );
};

export { PeopleList };
