"use client";

import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren, ReactNode } from "react";

interface Props {
  col_id: number;
  col_name: string;
}

const KanbanColumn = ({
  children,
  col_name,
  col_id,
}: PropsWithChildren<Props>) => {
  const { isOver, setNodeRef } = useDroppable({
    id: col_id,
  });

  return (
    <div ref={setNodeRef} className="flex flex-col items-start">
      <h2 className="text-title-md mb-2 font-semibold text-black dark:text-white">
        {col_name}
      </h2>
      {children}
    </div>
  );
};

export default KanbanColumn;
