import * as React from 'react';
import { Person } from '../lib/types/Person';
import { UsePersonList } from '../lib/types/PersonQuery';

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
      {query.isFetching ? <span>updating...</span> : null}
      <section>
        {query.isLoading ? (
          <span>loading...</span>
        ) : (
          <div>
            <Table>
              {!!query.data?.pages.length &&
                query.data?.pages.map((pages, index) => (
                  <TableBody
                    personList={pages.results.filter(filterPeople)}
                    key={index}
                  />
                ))}
            </Table>
          </div>
        )}
      </section>
      <button onClick={() => query.fetchNextPage()}>fetch more</button>
    </div>
  );
};

export { PeopleList };

const Table: React.FunctionComponent = ({ children }) => {
  return (
    <table className="w-full text-center">
      <thead className="text-lg">
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Gender</td>
          <td>Birth</td>
          <td colSpan={2}>Actions</td>
        </tr>
      </thead>
      {children}
    </table>
  );
};

const TableBody: React.FunctionComponent<{
  personList: Person[];
}> = ({ personList }) => {
  return (
    <tbody className="">
      {personList.map((person) => (
        <tr key={person.login.uuid.slice(0, 6)}>
          <td>{person.login.uuid.slice(0, 6)}</td>
          <td>
            {person.name.first} {person.name.last}
          </td>
          <td>{person.gender}</td>
          <td>{new Date(person.dob.date).toLocaleDateString()}</td>
          <td>View</td>
          <td>Edit</td>
        </tr>
      ))}
    </tbody>
  );
};
