import { useQuery } from 'react-query';
import { api } from '../lib/services/api';
import { Person } from '../lib/types/Person';
import { PersonListQueryOptions } from '../lib/types/PersonQuery';
import { AxiosRequestConfig } from 'axios';

export const fetchPeople = () => {
  return api.get('').then((response) => response.data.results);
};

export const fetchPeopleWithOptions = (fetchOptions?: AxiosRequestConfig) => {
  return api.get('', fetchOptions).then((response) => response.data.results);
};

export const usePeopleList = () => {
  return useQuery<Person[]>('people', fetchPeople);
};

export const usePeopleListWithConfig = (
  queryOptions?: PersonListQueryOptions,
  fetchOptions?: AxiosRequestConfig,
) => {
  return useQuery<Person[]>(
    'people',
    () => fetchPeopleWithOptions(fetchOptions),
    {
      ...queryOptions,
    },
  );
};
