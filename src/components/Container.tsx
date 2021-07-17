import React from 'react';

const Container: React.FunctionComponent<React.ReactNode> = (props) => {
  return props.children ? (
    <div className="bg-bg min-h-screen">{props.children}</div>
  ) : null;
};

export { Container };
