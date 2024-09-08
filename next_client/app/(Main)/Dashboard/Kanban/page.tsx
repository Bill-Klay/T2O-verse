"use client";

import PlusSVG from "@/Assets/SVGs/PlusSVG";
import KanbanColumn from "@/Components/Kanban/KanbanColumn";
import KanbanContainer from "@/Components/Kanban/KanbanContainer";
import TaskBar from "@/Components/Kanban/TaskBar";
import CreateColumn_Modal from "@/Components/Modals/KanbanModals/CreateColumn_Modal";
import CreateKanban_Modal from "@/Components/Modals/KanbanModals/CreateKanban_Modal";
import CreateTicket_Modal from "@/Components/Modals/KanbanModals/CreateTicket_Modal";
import UpdateKanban_Modal from "@/Components/Modals/KanbanModals/UpdateKanban_Modal";
import { getBoards, getColumnsNTickets } from "@/handlers/Kanban/handlers";
import { useAuth } from "@/hooks/useAuth";
import { useKanbanCtx } from "@/hooks/useKanbanCtx";
import { ContextTypes } from "@/types/KanbanCtxTypes";
import { Board, ColumnWithTickets, ModalStatusType } from "@/types/KanbanTypes";
import { handleBoardChange } from "@/utils/changeBoard";
import { runErrorToast, runSuccessToast } from "@/utils/toast";
import { DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";

const Kanban = () => {
  const [board, setBoard] = useState<Board>();
  const [modalStatus, setModalStatus] = useState<ModalStatusType>({
    createKanbanModal: false,
    updateKanbanModal: false,
    createColumnModal: false,
    createTicketModal: false,
  });

  const { auth }: any = useAuth();

  const {
    boardsList,
    setBoardsList,
    columnsNTicketsList,
    setColumnsNTicketsList,
  } = useKanbanCtx() as ContextTypes;

  async function handleDragEnd(event: DragEndEvent) {
    const new_col_id = event.over?.id as number;
    const task_id = event.active?.id as number;

    // Find the moved ticket
    const movedTicket = columnsNTicketsList
      .flatMap((col) => col.tickets)
      .find((ticket) => ticket.id === task_id);

    if (!movedTicket) return;

    // Retrieve old position
    const old_position = movedTicket.position;

    if (old_position === new_col_id) return;

    // Update the ticket's position
    const updatedTicket = { ...movedTicket, position: new_col_id };

    const updatedColumnsList = columnsNTicketsList.map((column) => {
      if (column.id === old_position) {
        // Remove the task from the old column
        return {
          ...column,
          tickets: column.tickets.filter((ticket) => ticket.id !== task_id),
        };
      } else if (column.id === new_col_id) {
        // Add the task to the new column
        return {
          ...column,
          tickets: [...column.tickets, updatedTicket],
        };
      } else {
        return column;
      }
    });
    console.log("Updated LIST >>>", updatedColumnsList);
    setColumnsNTicketsList(updatedColumnsList);

    try {
      const res = await fetch(`/api/kanban_ticket`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updatedTicket,
          old_column_id: movedTicket.position,
        }),
      });
      console.log("Updated Ticket: ", updatedTicket);

      if (!res.ok) {
        throw new Error("Failed to update task position");
      }
      runSuccessToast("Updated Successfully");
    } catch (error) {
      console.log("Error updating task position >>", error);
      runErrorToast("Error Updating");
    }
  }

  useEffect(() => {
    (async () => {
      const boards = await getBoards();
      setBoardsList(boards);
    })();
  }, []);

  useEffect(() => {
    if (!!board && board?.name !== "") {
      (async () => {
        const columns_and_tickets = await getColumnsNTickets(board);
        setColumnsNTicketsList(columns_and_tickets as ColumnWithTickets[]);
      })();
    }
  }, [board]);

  return (
    <>
      <CreateKanban_Modal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />
      <UpdateKanban_Modal
        board={board}
        setBoard={setBoard}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />
      <CreateColumn_Modal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        board={board}
      />
      <CreateTicket_Modal
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
        board={board}
      />
      <div>
        <select
          id="kanban_name"
          name="kanban_name"
          onChange={(event) => {
            handleBoardChange(event, setBoard);
          }}
          className="w-55 my-3 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option key={0} value="">
            None
          </option>
          {!!boardsList
            ? boardsList?.map((board) => (
                <option
                  key={board.id}
                  value={board.id}
                  data-id={board.id}
                  data-name={board.name}
                >
                  {board.name}
                </option>
              ))
            : null}
        </select>
        {!!board && board?.name !== "" ? (
          <>
            <TaskBar
              board={board}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
            />
            <KanbanContainer onDragEnd={handleDragEnd}>
              {columnsNTicketsList.map((column) => (
                <KanbanColumn key={column.id} column={column} board={board} />
              ))}
              {auth.roles?.includes("Admin") && (
                <button
                  onClick={() => {
                    setModalStatus({ ...modalStatus, createColumnModal: true });
                  }}
                  className="w-fit h-10 rounded-md border border-gray bg-slate-500 px-3 py-2
        text-white transition hover:bg-opacity-90 flex"
                >
                  <PlusSVG />
                </button>
              )}
            </KanbanContainer>
          </>
        ) : null}
      </div>
      {auth.roles?.includes("Admin") && (
        <button
          onClick={() => {
            setModalStatus({ ...modalStatus, createKanbanModal: true });
          }}
          className="fixed right-5 bottom-2 w-fit rounded-md border border-primary bg-primary px-4 py-2
        text-white transition hover:bg-opacity-90 flex"
        >
          <PlusSVG />
        </button>
      )}
    </>
  );
};

export default Kanban;
