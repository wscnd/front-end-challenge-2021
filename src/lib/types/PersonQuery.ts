import { InfiniteData, UseInfiniteQueryOptions, UseQueryOptions } from 'react-query';
import {
  usePersonInfiniteQueryWithConfig,
  usePersonQueryWithConfig
} from '../../hooks/usePersonList';
import { QueryResult } from './QueryResult';

export type PersonListQueryOptionsInfinite = UseInfiniteQueryOptions<QueryResult>;
export type PersonListQueryOptionsPaged = UseQueryOptions<QueryResult>;

export type UsePersonListInfinite = ReturnType<typeof usePersonInfiniteQueryWithConfig>;
export type UsePersonListPaged = ReturnType<typeof usePersonQueryWithConfig>;

export type PersonPage = InfiniteData<QueryResult>["pages"]

export type PersonPagePaged = ReturnType<typeof usePersonQueryWithConfig>;

export type PersonInfiniteData = InfiniteData<QueryResult>
