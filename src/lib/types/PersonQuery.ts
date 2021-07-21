import { InfiniteData, UseInfiniteQueryOptions, UseQueryOptions } from 'react-query';
import {
  usePeopleListWithConfigInfinite,
  usePeopleListWithConfigPaged 
} from '../../hooks/usePeopleList';
import { QueryResult } from './QueryResult';

export type PersonListQueryOptionsInfinite = UseInfiniteQueryOptions<QueryResult>;
export type PersonListQueryOptionsPaged = UseQueryOptions<QueryResult>;

export type UsePersonListInfinite = ReturnType<typeof usePeopleListWithConfigInfinite>;
export type UsePersonListPaged = ReturnType<typeof usePeopleListWithConfigPaged>;

export type PersonPage = InfiniteData<QueryResult>["pages"]

export type PersonPagePaged = ReturnType<typeof usePeopleListWithConfigPaged>;

export type PersonInfiniteData = InfiniteData<QueryResult>
