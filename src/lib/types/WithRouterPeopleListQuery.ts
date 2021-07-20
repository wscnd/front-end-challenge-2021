import { UsePersonList } from './PersonQuery';

export type WithRouterPeopleListQueryType = {
  query: UsePersonList;
  actions: { ["fetchMorePeople"]: () => void };
};
