import * as React from 'react';
import type { PersonPage } from '../lib/types/PersonQuery';
import { filterByGender, filterByName } from '../lib/utils/filterPerson';
import { Table, TableBody } from './Table';

type PeopleListProps = React.FunctionComponent<{
  search: string;
  filter: { gender: string };
  pages: PersonPage;
}>;

const PeopleList: PeopleListProps = ({ pages, search, filter }) => {

  React.useEffect(() => {
    console.log('filter:', filter);
  });

  return (
    <Table>
      {pages.length
        ? pages.map((pages, index) => (
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
  );
};

export { PeopleList };
