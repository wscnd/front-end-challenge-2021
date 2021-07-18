import { InfiniteData, UseInfiniteQueryOptions } from 'react-query';
import { usePeopleListWithConfig } from '../../hooks/usePeopleList';
import { QueryResult } from './QueryResult';

export type PersonListQueryOptions = UseInfiniteQueryOptions<QueryResult>;

export type UsePersonList = ReturnType<typeof usePeopleListWithConfig>;

export type PersonPage = InfiniteData<QueryResult>["pages"]