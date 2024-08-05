import { PropsWithChildren, ReactNode } from "react";

interface Props {
  col_name: string;
}

const KanbanColumn = ({ children, col_name }: PropsWithChildren<Props>) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <h2 className="text-title-md font-semibold text-black dark:text-white">
        {col_name}
      </h2>
      {children}
    </div>
  );
};

export default KanbanColumn;
