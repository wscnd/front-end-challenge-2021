import { InfiniteData, UseInfiniteQueryOptions, UseQueryOptions } from 'react-query';
import {
  usePeopleListWithConfigInfinite,
} from '../../hooks/usePeopleList';
import { QueryResult } from './QueryResult';

export type PersonListQueryOptionsInfinite = UseInfiniteQueryOptions<QueryResult>;

export type UsePersonListInfinite = ReturnType<typeof usePeopleListWithConfigInfinite>;

export type PersonPage = InfiniteData<QueryResult>["pages"]


export type PersonInfiniteData = InfiniteData<QueryResult>
