import { Board, Column } from "@/types/KanbanTypes";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type ModalProps = {
  showTicketModal: boolean;
  modalStyle: object;
  setShowTicketModal: Dispatch<SetStateAction<boolean>>;
  board: Board | undefined;
  getColumns: (board: Board) => void;
  columnsList: Column[];
};

const CreateTicket_Modal = ({
  showTicketModal,
  modalStyle,
  setShowTicketModal,
  board,
  getColumns,
  columnsList,
}: ModalProps) => {
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketColumnId, setTicketColumnId] = useState("");

  const handleClick = async () => {
    try {
      if (ticketTitle.length <= 2) {
        toast.error(`Title should be greater than 2 characters`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
          toast.success(`Ticket ${res_data.id} created successfully`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          getColumns(board);
          setShowTicketModal(!showTicketModal);
        }
      }
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  return (
    <>
      {showTicketModal ? (
        <>
          <div
            className="fixed z-50 outline-none focus:outline-none"
            style={modalStyle}
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
                    {columnsList.map((column) => (
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
                      setShowTicketModal(false);
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
