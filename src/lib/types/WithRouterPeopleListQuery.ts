import {
  UsePersonListInfinite,
  UsePersonListPaged
} from './PersonQuery';

export type WithRouterPeopleListQueryType = {
  query: UsePersonListInfinite;
  actions: {
    ["fetchNextPage"]: () => void ,
    ["fetchPreviousPage"]: () => void
  };
};

export type WithRouterPeopleListQueryTypePaged = {
  query: UsePersonListPaged;
  actions: {
    ["fetchNextPage"]: () => void ,
    ["fetchPreviousPage"]: () => void
    ["fetchPage"]: (page: number) => void
  };
};
