import {
  UsePersonListInfinite,
  UsePersonListPaged
} from './PersonQuery';

export type WithPersonListInfiniteQueryType = {
  query: UsePersonListInfinite;
  actions: {
    ["fetchNextPage"]: () => void ,
    ["fetchPreviousPage"]: () => void
  };
};

export type WithPersonListQueryType = {
  query: UsePersonListPaged;
  queryActions: {
    ["fetchNextPage"]: () => void ,
    ["fetchPreviousPage"]: () => void
    ["fetchPage"]: (page: number) => void
  };
};
