import { Person } from '../types/Person';

const filterPersonByProp = (
  person: Person,
  filterType: 'byName' | 'byGender',
  filterKey: string,
) => {
  const machine = {
    byName: () => {
      const fullName = `${person.name.first} ${person.name.last}`;
      return fullName.toLowerCase().includes(filterKey.toLowerCase());
    },
    byGender: () => {
      return person.gender.toLowerCase() === filterKey.toLowerCase();
    },
    noFilter: () => person,
  };

  return filterKey ? machine[filterType]() : machine.noFilter();
};

const filterByName = (person: Person, name: string) => {
  return filterPersonByProp(person, 'byName', name);
};

const filterByGender = (person: Person, gender: string) => {
  return filterPersonByProp(person, 'byGender', gender);
};

export { filterPersonByProp, filterByGender, filterByName };
