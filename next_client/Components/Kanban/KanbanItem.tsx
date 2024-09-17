"use client";

import { Board, ColumnWithTickets, Ticket } from "@/types/KanbanTypes";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import UpdateTicket_Modal from "../Modals/KanbanModals/UpdateTicket_Modal";
import { runSuccessToast } from "@/utils/toast";
import { useKanbanCtx } from "@/hooks/useKanbanCtx";
import { ContextTypes } from "@/types/KanbanCtxTypes";
import { getColumnsNTickets } from "@/handlers/Kanban/handlers";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  col_id: number;
  ticket: Ticket;
  board: Board;
}

const KanbanItem = ({ col_id, ticket, board }: Props) => {
  const { auth }: any = useAuth();
  const flag: boolean = auth.roles?.includes("Admin") ? false : true;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket.id,
    disabled: flag,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showUpdateTicket, setShowUpdateTicket] = useState(false);
  const optionsRef = useRef<any>(null);

  const { setColumnsNTicketsList } = useKanbanCtx() as ContextTypes;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    console.log("Hello");
    try {
      const res = await fetch(`/api/kanban_ticket`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ticket.id,
          col_id,
        }),
      });

      if (!res.ok) {
        throw new Error(`${res.headers}`);
      }

      runSuccessToast("Deleted Successfully");
      const column_and_tickets = await getColumnsNTickets(board);
      setColumnsNTicketsList(column_and_tickets as ColumnWithTickets[]);
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!optionsRef.current) return;
      if (!isOpen || optionsRef.current.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!isOpen || keyCode !== 27) return;
      setIsOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
      <UpdateTicket_Modal
        showUpdateTicket={showUpdateTicket}
        setShowUpdateTicket={setShowUpdateTicket}
        board={board}
        ticket={ticket}
      />
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{ transform: CSS.Translate.toString(transform) }}
        className="my-2 w-full bg-white shadow-md rounded-lg p-4 relative"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-black">{ticket.title}</h2>
          {auth.roles?.includes("Admin") ||
            (auth.roles?.includes("Super Admin") && (
              <button
                onClick={toggleDropdown}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-black"
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
                    strokeWidth="2"
                    d="M6 12h.01m6 0h.01m5.99 0h.01"
                  />
                </svg>
              </button>
            ))}
        </div>
        <p className="text-black">{ticket.description}</p>

        {isOpen && (
          <div
            className="absolute right-0 top-12 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            role="menu"
            ref={optionsRef}
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <button
                type="submit"
                onClick={() => {
                  setShowUpdateTicket(!showUpdateTicket);
                }}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                className="flex w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
                role="menuitem"
              >
                <svg
                  className="w-4.5 h-4.5 mr-4 text-black"
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
                Edit
              </button>
              <button
                type="submit"
                onClick={() => handleDelete()}
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                className="flex w-full px-4 py-2 text-left text-sm text-rose-700 hover:bg-gray-100"
                role="menuitem"
              >
                <svg
                  className="w-4 h-4.5 mr-4 text-rose-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KanbanItem;
