import React from 'react';

const Container: React.FunctionComponent<React.ReactNode> = (props) => {
  return props.children ? (
    <div className="overflow-x-hidden">
      <div className="w-screen min-h-screen bg-bg">{props.children}</div>
    </div>
  ) : null;
};

export { Container };
