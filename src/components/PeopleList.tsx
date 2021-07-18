import * as React from 'react';
import { useSortContext } from '../context/SortContext';
import { Person } from '../lib/types/Person';
import type { PersonPage } from '../lib/types/PersonQuery';
import { filterByGender, filterByName } from '../lib/utils/mutatePerson';
import { mutatePersonList as orderPersonList } from '../lib/utils/mutatePersonList';
import { Table, TableBody } from './Table';

type PeopleListProps = React.FunctionComponent<{
  search: string;
  filter: { gender: string };
  pages: PersonPage;
}>;

const PeopleList: PeopleListProps = ({ pages, search, filter }) => {
  const sortOrder = useSortContext()[0];

  React.useEffect(() => {
    console.log('sort Order', sortOrder);
  }, [sortOrder]);

  return (
    <Table>
      <TableBody
        //NOTE: probably expensive?
        personList={orderPersonList(
          pages.reduce(
            (store: Person[], current) => [...store, ...current.results],
            [],
          ),
          sortOrder.order,
          'name',
        )
          .filter((person) => filterByName(person, search))
          .filter((person) => filterByGender(person, filter.gender))}
      />
    </Table>
  );
};

export { PeopleList };
