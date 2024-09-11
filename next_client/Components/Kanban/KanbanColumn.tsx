"use client";

import { Board, ColumnWithTickets } from "@/types/KanbanTypes";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import UpdateColumn_Modal from "../Modals/KanbanModals/UpdateColumn_Modal";
import KanbanItem from "./KanbanItem";
import EditSVG from "@/Assets/SVGs/EditSVG";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  column: ColumnWithTickets;
  board: Board;
}

const KanbanColumn = ({ board, column }: Props) => {
  const [showUpdateColumn, setShowUpdateColumn] = useState(false);
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const { auth }: any = useAuth();

  return (
    <>
      <UpdateColumn_Modal
        showUpdateColumn={showUpdateColumn}
        setShowUpdateColumn={setShowUpdateColumn}
        board={board}
        column={column}
      />
      <div ref={setNodeRef} className="flex flex-col items-start min-h-[55vh]">
        <div className="w-full flex justify-between ">
          <h2 className="text-title-md mb-2 font-semibold text-black dark:text-white">
            {column.name}
          </h2>
          {auth.roles?.includes("Admin") ||
            (auth.roles?.includes("Super Admin") && (
              <button
                type="submit"
                onClick={() => {
                  setShowUpdateColumn(!showUpdateColumn);
                }}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                className="text-left text-sm text-black hover:bg-gray-100"
                role="menuitem"
              >
                <EditSVG />
              </button>
            ))}
        </div>
        {column.tickets.map((item) => (
          <KanbanItem
            key={item.id}
            col_id={column.id}
            ticket={item}
            board={board}
          />
        ))}
      </div>
    </>
  );
};

export default KanbanColumn;
