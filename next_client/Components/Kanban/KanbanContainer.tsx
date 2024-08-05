import { ReactNode } from "react";

const KanbanContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="overflow-visible grid grid-cols-3 gap-3 mt-10">
      {children}
    </div>
  );
};

export default KanbanContainer;
