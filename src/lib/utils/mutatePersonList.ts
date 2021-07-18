/* eslint-disable @typescript-eslint/no-unused-vars */

import { Person } from '../types/Person';
import { SortType } from '../types/SortingTypes';

function orderByKey(sortKey: 'name', sortObject: Person[], asc: boolean) {
  const unsorted = { ...sortObject };
  const sorted = Object.entries<Person>(unsorted)
    .sort(([key1, firstPerson], [key2, nextPerson]) => {

      //NOTE can make this generic to work with any sortKey
      const a = `${firstPerson[sortKey].first} ${firstPerson[sortKey].last}`;
      const b = `${nextPerson[sortKey].first} ${nextPerson[sortKey].last}`;
      const comparator = new Intl.Collator('en', { numeric: true });
      return asc ? comparator.compare(a, b) : comparator.compare(b, a);
    })
    .map(([key, person]) => person);
  return sorted;
}

const mutatePersonList = (
  personList: Person[],
  order: SortType['order'],
  key: 'name',
) => {
  const machine = {
    ascending: () => {
      return orderByKey(key, personList, true);
    },
    descending: () => {
      return orderByKey(key, personList, false);
    },
    noMutate: () => personList,
  };

  return order !== 'unordered' ? machine[order]() : machine.noMutate();
};

export { mutatePersonList };
