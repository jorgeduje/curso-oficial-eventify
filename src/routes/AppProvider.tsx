import { FC, ReactNode } from "react";

interface AppProvdersProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProvdersProps> = ({ children }) => {
  return <div>{children}</div>;
};
