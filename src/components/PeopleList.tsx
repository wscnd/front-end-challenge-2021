import { RefreshIcon } from '@heroicons/react/solid';
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

  return (
    <div>
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
      <button onClick={() => query.fetchNextPage()}>fetch more</button>
      <ShowLoading
        Icon={RefreshIcon}
        show={query.isFetchingNextPage}
        text={'Loading More...'}
      />
    </div>
  );
};

export { PeopleList };
