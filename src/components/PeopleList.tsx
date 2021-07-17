import * as React from 'react';
import { UsePersonList } from '../lib/types/PersonQuery';

const PeopleList: React.FunctionComponent<UsePersonList> = (query) => {
  return (
    <div className="">
      {query.isFetching ? <span>updating...</span> : null}
      <section>
        {query.isLoading ? (
          <span>loading...</span>
        ) : (
          <ul>
            {!!query.data?.pages.length &&
              query.data?.pages.map((pages, index) => (
                <React.Fragment key={index}>
                  {pages.results.map((person) => (
                    <li key={person.login.username}>
                      {person.name.title} {person.name.first} {person.name.last}
                    </li>
                  ))}
                </React.Fragment>
              ))}
          </ul>
        )}
      </section>
      <button onClick={() => query.fetchNextPage()}>fetch more</button>
    </div>
  );
};

export { PeopleList };
