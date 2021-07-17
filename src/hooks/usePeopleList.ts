import { QueryFunctionContext, useInfiniteQuery, useQuery } from 'react-query';
import { api } from '../lib/services/api';
import type { Person } from '../lib/types/Person';
import type { QueryResult } from '../lib/types/QueryResult';
import { PersonListQueryOptions } from '../lib/types/PersonQuery';
import { AxiosRequestConfig } from 'axios';
import { deepMerge } from '../lib/utils/deepMerge';

export const fetchPeople = () => {
  return api.get('').then((response) => response.data.results);
};

type FetchPeopleWithOptions = Partial<QueryFunctionContext> & {
  fetchOptions?: AxiosRequestConfig;
};

export const fetchPeopleWithOptions = ({
  pageParam = 1,
  queryKey,
  fetchOptions,
}: FetchPeopleWithOptions) => {

  console.log('queryKey:', queryKey)
  console.log('fetchOptions:', fetchOptions)

  const newFetchOptions = deepMerge({
    params: { page: pageParam },
  }, fetchOptions);

  console.log('newFetchOptions:', newFetchOptions)
  console.log('queryKey:', queryKey);

  return api
    .get<QueryResult>('', newFetchOptions)
    .then((response) => response.data);
};

export const usePeopleList = () => {
  return useQuery<Person[]>('people', fetchPeople);
};

export const usePeopleListWithConfig = (
  queryOptions?: PersonListQueryOptions,
  fetchOptions?: AxiosRequestConfig,
) => {
  return useInfiniteQuery({
    queryKey: ['people'],
    queryFn: ({ queryKey, pageParam }) =>
      fetchPeopleWithOptions({ fetchOptions, queryKey, pageParam }),
    ...queryOptions,
  });
};
