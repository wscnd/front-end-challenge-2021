import {
  UsePersonListInfinite,
} from './PersonQuery';

export type WithRouterPeopleListQueryType = {
  query: UsePersonListInfinite;
  actions: {
    ["fetchNextPage"]: () => void ,
    ["fetchPreviousPage"]: () => void
  };
};

