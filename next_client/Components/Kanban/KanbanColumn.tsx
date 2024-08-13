"use client";

import { Board } from "@/types/KanbanTypes";
import { useDroppable } from "@dnd-kit/core";
import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import UpdateColumn_Modal from "../Modals/KanbanModals/UpdateColumn_Modal";

interface Props {
  col_id: number;
  col_name: string;
  board: Board | undefined;
}

const KanbanColumn = ({
  children,
  col_name,
  col_id,
  board,
}: PropsWithChildren<Props>) => {
  const [showUpdateColumn, setShowUpdateColumn] = useState(false);
  const { isOver, setNodeRef } = useDroppable({
    id: col_id,
  });

  return (
    <>
      <UpdateColumn_Modal
        showUpdateColumn={showUpdateColumn}
        setShowUpdateColumn={setShowUpdateColumn}
        board={board}
      />
      <div ref={setNodeRef} className="flex flex-col items-start">
        <div className="w-full flex justify-between ">
          <h2 className="text-title-md mb-2 font-semibold text-black dark:text-white">
            {col_name}
          </h2>
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
            <svg
              className="w-4.5 h-4.5 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default KanbanColumn;
