"use client";

import KanbanColumn from "@/Components/Kanban/KanbanColumn";
import KanbanContainer from "@/Components/Kanban/KanbanContainer";
import KanbanItem from "@/Components/Kanban/KanbanItem";
import TaskBar from "@/Components/Kanban/TaskBar";
import CreateColumn_Modal from "@/Components/Modals/KanbanModals/CreateColumn_Modal";
import CreateKanban_Modal from "@/Components/Modals/KanbanModals/CreateKanban_Modal";
import CreateTicket_Modal from "@/Components/Modals/KanbanModals/CreateTicket_Modal";
import UpdateKanban_Modal from "@/Components/Modals/KanbanModals/UpdateKanban_Modal";
import { getBoards, getColumnsNTickets } from "@/handlers/Kanban/handlers";
import { useKanbanCtx } from "@/hooks/useKanbanCtx";
import { ContextTypes } from "@/types/KanbanCtxTypes";
import { Board, ColumnWithTickets } from "@/types/KanbanTypes";
import { runErrorToast, runSuccessToast } from "@/utils/toast";
import { DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState, useRef, ChangeEvent } from "react";

const Kanban = () => {
  const [board, setBoard] = useState<Board>();
  const [showModal, setShowModal] = useState(false);
  const [showUpdateKanban, setShowUpdateKanban] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const [modalStyle, setModalStyle] = useState({});

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

      if (!res.ok) {
        throw new Error("Failed to update task position");
      }
      runSuccessToast("Updated Successfully");
    } catch (error) {
      console.log("Error updating task position >>", error);
      runErrorToast("Error Updating");
    }
  }

  const handleBoardChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const id = Number(selectedOption.getAttribute("data-id"));
    const name = selectedOption.getAttribute("data-name") || "";
    setBoard({ id, name });
  };

  useEffect(() => {
    if (
      (showModal && boardRef.current) ||
      (showColumnModal && boardRef.current) ||
      (showTicketModal && boardRef.current) ||
      (showUpdateKanban && boardRef.current)
    ) {
      const rect = boardRef.current.getBoundingClientRect();
      setModalStyle({
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.left + window.scrollX + rect.width / 2,
        transform: "translate(-50%, -50%)",
      });
    }
  }, [showModal, showColumnModal, showTicketModal, showUpdateKanban]);

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
        showModal={showModal}
        modalStyle={modalStyle}
        setShowModal={setShowModal}
        // getBoards={getBoards}
      />
      <UpdateKanban_Modal
        board={board}
        setBoard={setBoard}
        showUpdateKanban={showUpdateKanban}
        setShowUpdateKanban={setShowUpdateKanban}
        modalStyle={modalStyle}
        // getBoards={getBoards}
      />
      <CreateColumn_Modal
        showColumnModal={showColumnModal}
        modalStyle={modalStyle}
        setShowColumnModal={setShowColumnModal}
        board={board}
        // getColumns={getColumnsNTickets}
      />
      <CreateTicket_Modal
        showTicketModal={showTicketModal}
        modalStyle={modalStyle}
        setShowTicketModal={setShowTicketModal}
        board={board}
        // getColumns={getColumnsNTickets}
        // columnsNTicketsList={columnsNTicketsList}
      />
      <div ref={boardRef}>
        <select
          id="kanban_name"
          name="kanban_name"
          onChange={handleBoardChange}
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
              showTicketModal={showTicketModal}
              setShowTicketModal={setShowTicketModal}
              showUpdateKanban={showUpdateKanban}
              setShowUpdateKanban={setShowUpdateKanban}
            />
            <KanbanContainer onDragEnd={handleDragEnd}>
              {columnsNTicketsList.map((column) => (
                <KanbanColumn
                  key={column.id}
                  col_id={column.id}
                  col_name={column.name}
                  board={board}
                >
                  {column.tickets.map((item) => (
                    <KanbanItem
                      key={item.id}
                      col_id={column.id}
                      ticket={item}
                      board={board}
                      // getColumns={getColumnsNTickets}
                      // columnsNTicketsList={columnsNTicketsList}
                    />
                  ))}
                </KanbanColumn>
              ))}
              <button
                onClick={() => {
                  setShowColumnModal(!showColumnModal);
                }}
                className="w-fit h-10 rounded-md border border-gray bg-slate-500 px-3 py-2
        text-white transition hover:bg-opacity-90 flex"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
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
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </button>
            </KanbanContainer>
          </>
        ) : null}
      </div>
      <button
        onClick={() => {
          setShowModal(!showModal);
        }}
        className="absolute right-2 bottom-2 w-fit rounded-md border border-primary bg-primary px-4 py-2
        text-white transition hover:bg-opacity-90 flex"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
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
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </button>
    </>
  );
};

export default Kanban;
