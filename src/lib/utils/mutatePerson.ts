import { Person } from '../types/Person';

const mutatePerson = (
  person: Person,
  mutateType: 'filterByName' | 'filterByGender',
  mutateKey: string,
) => {
  const machine = {
    filterByName: () => {
      const fullName = `${person.name.first} ${person.name.last}`;
      return fullName.toLowerCase().includes(mutateKey.toLowerCase());
    },
    filterByGender: () => {
      return person.gender.toLowerCase() === mutateKey.toLowerCase();
    },
    noMutate: () => person,
  };
  return mutateKey ? machine[mutateType]() : machine.noMutate();
};

const filterByName = (person: Person, name: string) => {
  return mutatePerson(person, 'filterByName', name);
};

const filterByGender = (person: Person, gender: string) => {
  return mutatePerson(person, 'filterByGender', gender);
};

export { mutatePerson, filterByGender, filterByName };
