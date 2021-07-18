import * as React from 'react';
import type { Person } from '../lib/types/Person';

const Table: React.FunctionComponent = ({ children }) => {
  return (
    <table className="table-fixed text-center w-full border-collapse mb-8">
      <thead className="text-lg bg-table-bg text-primary">
        <tr>
          <th className="border-2 border-secondary w-1/3">Name</th>
          <th className="border-2 border-secondary w-1/6">Gender</th>
          <th className="border-2 border-secondary w-1/6">Birth</th>
          <th className="border-2 border-secondary w-1/3" colSpan={2}>
            Actions
          </th>
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
    <tbody>
      {personList.map((person) => (
        <tr key={person.login.uuid.slice(0, 6)} className="h-10 bg-white">
          <td className="border-2 border-secondary ">
            {person.name.first} {person.name.last}
          </td>
          <td className="border-2 border-secondary">{person.gender}</td>
          <td className="border-2 border-secondary">
            {new Date(person.dob.date).toLocaleDateString()}
          </td>
          <td className="border-2  border-secondary">View</td>
          <td className="border-2  border-secondary">Edit</td>
        </tr>
      ))}
    </tbody>
  );
};

export { Table, TableBody };
