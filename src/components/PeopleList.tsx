import * as React from 'react';
import { useSortContext } from '../context/SortContext';
import type { Person } from '../lib/types/Person';
import type { PersonPage } from '../lib/types/PersonQuery';
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
  pages: PersonPage;
}>;

const PeopleList: PeopleListProps = ({ pages, search, filter }) => {
  const sortOrder = useSortContext()[0];

  const [viewPerson, setViewPerson] = React.useState(false);
  const [selectedPersonInfo, setSelectedPersonInfo] = React.useState<Person>();

  const viewAction = React.useCallback((person: Person) => {
    setViewPerson((previous) => !previous);
    setSelectedPersonInfo(person);
  }, []);

  React.useEffect(() => {
    console.log('sort Order', sortOrder);
  }, [sortOrder]);

  React.useEffect(() => {
    console.log('filters:', filter);
  }, [filter]);

  return (
    <React.Fragment>
      <Table>
        <TableBody
          actions={{ view: viewAction }}
          personList={orderPersonList(
            //NOTE: probably expensive?
            pages.reduce(
              (store: Person[], current) => [...store, ...current.results],
              [],
            ),
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
