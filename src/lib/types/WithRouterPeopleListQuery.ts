import { UsePersonList } from './PersonQuery';

export type WithRouterPeopleListQueryType = {
  query: UsePersonList;
  fetchMorePeople?: () => void;
};
