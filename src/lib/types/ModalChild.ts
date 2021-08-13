export type ModalChild<T> = React.FunctionComponent<T> & {
  ChildHead: React.FunctionComponent;
  ChildTitle: React.FunctionComponent;
  ChildDescription: React.FunctionComponent;
  ChildBody: React.FunctionComponent;
};

export type ModalChildProps<T> = { modalContent: T };
