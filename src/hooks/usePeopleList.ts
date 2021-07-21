import { QueryFunctionContext, useInfiniteQuery, useQuery } from 'react-query';
import { api } from '../lib/services/api';
import type { Person } from '../lib/types/Person';
import type { QueryResult } from '../lib/types/QueryResult';
import type {
  PersonListQueryOptionsInfinite,
  PersonListQueryOptionsPaged,
} from '../lib/types/PersonQuery';
import { AxiosRequestConfig } from 'axios';

export const fetchPeople = () => {
  return api.get('').then((response) => response.data.results);
};

type FetchPeopleWithOptions = Partial<QueryFunctionContext> & {
  fetchOptions?: AxiosRequestConfig;
};

export const fetchPeopleWithOptions = ({
  pageParam,
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const usePeopleListWithConfigInfinite = (
  queryOptions?: PersonListQueryOptionsInfinite,
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

export const usePeopleListWithConfigPaged = (
  queryOptions?: PersonListQueryOptionsPaged,
  fetchOptions?: AxiosRequestConfig,
) => {
  console.log('fetchOptions:', fetchOptions?.params.page);
  return useQuery({
    queryKey: ['people', String(fetchOptions?.params?.page)],
    queryFn: ({ queryKey, pageParam }) => {
      return fetchPeopleWithOptions({ fetchOptions, queryKey, pageParam });
    },
    ...queryOptions,
  });
};
