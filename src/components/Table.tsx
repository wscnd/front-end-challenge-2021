import { UserCircleIcon } from '@heroicons/react/solid';
import * as React from 'react';
import type { Person } from '../lib/types/Person';
import { Button } from './Button';

import { SortButton } from './SortButton';

const Table: React.FunctionComponent = ({ children }) => {
  return (
    <table className="w-full mb-8 text-center border-collapse table-fixed">
      <thead className="text-xs border-collapse lg:prose-lg md:prose bg-table-bg text-primary">
        <tr>
          <th className="w-1/3 px-1 border-2 border-secondary">
            <div className="relative flex items-center justify-center">
              <span>Name</span>
              <SortButton />
            </div>
          </th>
          <th className="w-1/6 border-2 border-secondary">Nat</th>
          <th className="w-1/6 border-2 border-secondary">Gender</th>
          <th className="w-1/4 border-2 border-secondary">Birth</th>
          <th className="w-1/6 border-2 border-secondary">Actions</th>
          {/* <th className="w-1/3 border-2 border-secondary" colSpan={2}>
            Actions
          </th> */}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

const TableBody: React.FunctionComponent<{
  personList: Person[];
  actions: {
    view: (person: Person) => void;
  };
}> = ({ personList, actions }) => {
  return (
    <React.Fragment>
      {personList.map((person) => (
        <tr
          key={person.login.uuid.slice(0, 6)}
          className="h-10 text-xs bg-white sm:prose lg:prose-lg "
        >
          <td className="border-2 border-secondary ">
            {person.name.first} {person.name.last}
          </td>
          <td className="border-2 border-secondary">{person.nat}</td>
          <td className="border-2 border-secondary">{person.gender}</td>
          <td className="border-2 border-secondary">
            {new Date(person.dob.date).toLocaleDateString()}
          </td>
          <td className="border-2  border-secondary">
            <Button
              disabled={false}
              text="View"
              onClick={() => actions.view(person)}
              Icon={UserCircleIcon}
            />
          </td>
          {/* <td className="border-2 border-secondary">Edit</td> */}
        </tr>
      ))}
    </React.Fragment>
  );
};

export { Table, TableBody };
