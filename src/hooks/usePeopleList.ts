import { QueryFunctionContext, useInfiniteQuery, useQuery } from 'react-query';
import { api } from '../lib/services/api';
import type { Person } from '../lib/types/Person';
import type { QueryResult } from '../lib/types/QueryResult';
import type { PersonListQueryOptions } from '../lib/types/PersonQuery';
import { AxiosRequestConfig } from 'axios';

export const fetchPeople = () => {
  return api.get('').then((response) => response.data.results);
};

type FetchPeopleWithOptions = Partial<QueryFunctionContext> & {
  fetchOptions?: AxiosRequestConfig;
};

export const fetchPeopleWithOptions = ({
  pageParam,
  queryKey,
  fetchOptions,
}: FetchPeopleWithOptions) => {
  const newFetchOptions = {
    ...fetchOptions,
    params: {
      ...fetchOptions?.params,
      page: pageParam || fetchOptions?.params.page,
    },
  };

  // console.log('newFetchOptions:', newFetchOptions);
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
      fetchPeopleWithOptions({
        fetchOptions,
        queryKey,
        pageParam,
      }),
    ...queryOptions,
  });
};
