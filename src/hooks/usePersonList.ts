import { QueryFunctionContext, useInfiniteQuery, useQuery } from 'react-query';
import { api } from '../lib/services/api';
import type { Person } from '../lib/types/Person';
import type { QueryResult } from '../lib/types/QueryResult';
import type {
  PersonListQueryOptionsInfinite,
  PersonListQueryOptionsPaged,
} from '../lib/types/PersonQuery';
import axios, { AxiosRequestConfig } from 'axios';

export const fetchPerson = () => {
  return api.get('').then((response) => response.data.results);
};

type FetchPeopleWithOptions = Partial<QueryFunctionContext> & {
  fetchOptions?: AxiosRequestConfig;
};

export const fetchPersonWithOptions = ({
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
  return useQuery<Person[]>('person', fetchPerson);
};

export const usePersonInfiniteQueryWithConfig = (
  queryOptions?: PersonListQueryOptionsInfinite,
  fetchOptions?: AxiosRequestConfig,
) => {
  return useInfiniteQuery({
    queryKey: ['person'],
    queryFn: ({ queryKey, pageParam }) =>
      fetchPersonWithOptions({
        fetchOptions,
        queryKey,
        pageParam,
      }),
    ...queryOptions,
  });
};

export const usePersonQueryWithConfig = (
  queryOptions?: PersonListQueryOptionsPaged,
  fetchOptions?: AxiosRequestConfig,
) => {
  return useQuery({
    queryKey: ['person', String(fetchOptions?.params?.page)],
    queryFn: ({ queryKey, pageParam }) => {
      // NOTE: this doesn't have async keyword in it
      const source = axios.CancelToken.source();
      const newFetchOptions = { ...fetchOptions, cancelToken: source.token };

      const promise: Promise<QueryResult> & {
        cancel?: { (): void };
      } = fetchPersonWithOptions({
        fetchOptions: newFetchOptions,
        queryKey,
        pageParam,
      });
      // NOTE: query cancellation
      // new Promise((res) => setTimeout(res, 1000)).then(async () => {
      //   return fetchPersonWithOptions({
      //     fetchOptions: newFetchOptions,
      //     queryKey,
      //     pageParam,
      //   });
      // });

      promise.cancel = () => {
        source.cancel('Query was cancelled by react-query');
      };
      return promise;
    },
    ...queryOptions,
  });
};
