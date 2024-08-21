import { getColumnsNTickets } from "@/handlers/Kanban/handlers";
import { useKanbanCtx } from "@/hooks/useKanbanCtx";
import { ContextTypes } from "@/types/KanbanCtxTypes";
import { Board, ColumnWithTickets, ModalStatusType } from "@/types/KanbanTypes";
import { runErrorToast, runSuccessToast } from "@/utils/toast";
import { Dispatch, SetStateAction, useState } from "react";

type ModalProps = {
  modalStatus: ModalStatusType;
  setModalStatus: Dispatch<SetStateAction<ModalStatusType>>;
  board: Board | undefined;
};

const CreateTicket_Modal = ({
  modalStatus,
  setModalStatus,
  board,
}: ModalProps) => {
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketColumnId, setTicketColumnId] = useState("");

  const { columnsNTicketsList, setColumnsNTicketsList } =
    useKanbanCtx() as ContextTypes;

  const handleClick = async () => {
    try {
      if (ticketTitle.length <= 2) {
        runErrorToast("Title should be greater than 2 characters");
      } else {
        if (!!board?.id && ticketColumnId) {
          const res = await fetch(`/api/kanban_ticket`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              column_id: ticketColumnId,
              title: ticketTitle,
              description: ticketDescription,
            }),
          });

          if (!res.ok) {
            throw new Error("Something went wrong");
          }

          const res_data = await res.json();
          runSuccessToast(`Ticket ${res_data.id} created successfully`);
          const columns_and_tickets = await getColumnsNTickets(board);
          setColumnsNTicketsList(columns_and_tickets as ColumnWithTickets[]);
          setModalStatus({ ...modalStatus, createTicketModal: false });
        }
      }
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  return (
    <>
      {modalStatus.createTicketModal ? (
        <>
          <div
            className="fixed z-50 outline-none focus:outline-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              position: "fixed",
              zIndex: 50,
            }}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="py-4 px-8 rounded-md border border-stroke shadow-default relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <h2 className="mb-5 text-title-md2 font-semibold text-black dark:text-white">
                  Create Kanban Ticket
                </h2>
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="ticketTitle"
                    className="mb-2.5 font-medium text-black dark:text-white"
                  >
                    Ticket Title:{" "}
                  </label>
                  <input
                    id="ticketTitle"
                    name="ticketTitle"
                    type="text"
                    onChange={(event) => {
                      setTicketTitle(event.target.value);
                    }}
                    className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="ticketDescription"
                    className="mb-2.5 font-medium text-black dark:text-white"
                  >
                    Ticket Description:{" "}
                  </label>
                  <input
                    id="ticketDescription"
                    name="ticketDescription"
                    type="text"
                    onChange={(event) => {
                      setTicketDescription(event.target.value);
                    }}
                    className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="ticketColumn"
                    className="mb-2.5 font-medium text-black dark:text-white"
                  >
                    Select Column:{" "}
                  </label>
                  <select
                    id="ticketColumn"
                    name="ticketColumn"
                    onChange={(event) => {
                      setTicketColumnId(event.target.value);
                    }}
                    className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select a column</option>
                    {columnsNTicketsList.map((column) => (
                      <option key={column.id} value={column.id}>
                        {column.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-around pt-4 rounded-b">
                  <button
                    onClick={handleClick}
                    className="cursor-pointer rounded-lg border border-primary bg-primary py-2 px-6 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setModalStatus({
                        ...modalStatus,
                        createTicketModal: false,
                      });
                    }}
                    className="cursor-pointer rounded-lg border border-rose-700 py-2 px-6 text-rose-700 transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateTicket_Modal;
