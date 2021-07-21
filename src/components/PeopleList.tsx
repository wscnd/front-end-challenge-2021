import * as React from 'react';
import { useSortContext } from '../context/SortContext';
import type { Person } from '../lib/types/Person';
import { QueryResult } from '../lib/types/QueryResult';
import {
  filterByGender,
  filterByName,
  filterByNationality,
} from '../lib/utils/mutatePerson';
import { mutatePersonList as orderPersonList } from '../lib/utils/mutatePersonList';
import { DisplayPerson } from './DisplayPerson';
import { Table, TableBody } from './Table';

type PeopleListProps = React.FunctionComponent<{
  search: string;
  filter: { gender: string; nationality: string };
  pages: QueryResult;
}>;

const PeopleList: PeopleListProps = ({ pages, search, filter }) => {
  const sortOrder = useSortContext()[0];

  const [viewPerson, setViewPerson] = React.useState(false);
  const [selectedPersonInfo, setSelectedPersonInfo] = React.useState<Person>();

  const viewAction = React.useCallback((person: Person) => {
    setViewPerson((previous) => !previous);
    setSelectedPersonInfo(person);
  }, []);

  return (
    <React.Fragment>
      <Table>
        <TableBody
          actions={{ view: viewAction }}
          personList={orderPersonList(
            //NOTE: probably expensive?
            pages.results,
            sortOrder.order,
            'name',
          )
            .filter((person) => filterByName(person, search))
            .filter((person) => filterByNationality(person, filter.nationality))
            .filter((person) => filterByGender(person, filter.gender))}
        />
      </Table>
      {selectedPersonInfo ? (
        <DisplayPerson
          openState={[viewPerson, setViewPerson]}
          person={selectedPersonInfo}
        />
      ) : null}
    </React.Fragment>
  );
};

export { PeopleList };
