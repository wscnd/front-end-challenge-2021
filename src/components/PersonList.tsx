import * as React from 'react';
import type { Person } from '../lib/types/Person';
import { DisplayPerson } from './DisplayPerson';
import { Table, TableBody } from './Table';

type PersonListProps = React.FunctionComponent<{
  personList: Person[];
}>;

const PersonList: PersonListProps = ({ personList }) => {
  const [viewPerson, setViewPerson] = React.useState(false);
  const [selectedPersonInfo, setSelectedPersonInfo] = React.useState<Person>();

  const viewAction = React.useCallback((person: Person) => {
    setViewPerson((previous) => !previous);
    setSelectedPersonInfo(person);
  }, []);

  return (
    <React.Fragment>
      <Table>
        <TableBody actions={{ view: viewAction }} personList={personList} />
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

export { PersonList };
