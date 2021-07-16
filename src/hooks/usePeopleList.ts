import { useQuery } from 'react-query';
import { api } from '../lib/services/api';
import { Person } from '../lib/types/Person';

export const fetchPeople = () => {
  return api.get('').then((response) => response.data.results);
};

export const usePeopleList = () => {
  return useQuery<Person[]>('people', fetchPeople);
};
