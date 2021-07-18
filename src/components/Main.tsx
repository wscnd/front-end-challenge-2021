import * as React from 'react';

const Main: React.FunctionComponent<React.ReactNode> = (props) => {
  return props.children ? (
    <main className="px-32 py-20 ">
      <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">{props.children}</div>
    </main>
  ) : null;
};

export { Main };
