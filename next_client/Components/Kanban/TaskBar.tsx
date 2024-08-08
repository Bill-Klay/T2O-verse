import { Board } from "@/types/KanbanTypes";
import { Dispatch, SetStateAction } from "react";
import UpdateKanban_Modal from "../Modals/KanbanModals/UpdateKanban_Modal";

interface Props {
  board: Board;
  showTicketModal: boolean;
  setShowTicketModal: Dispatch<SetStateAction<boolean>>;
  showUpdateKanban: boolean;
  setShowUpdateKanban: Dispatch<SetStateAction<boolean>>;
}

const TaskBar = ({
  board,
  showTicketModal,
  setShowTicketModal,
  showUpdateKanban,
  setShowUpdateKanban,
}: Props) => {
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex justify-between items-center px-6 py-2">
        <div className="flex">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            {board.name}
          </h2>
          <button
            type="submit"
            onClick={() => {
              setShowUpdateKanban(!showUpdateKanban);
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            className="flex w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
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
        <button
          onClick={() => {
            setShowTicketModal(!showTicketModal);
          }}
          className="w-fit rounded-sm border border-primary bg-primary px-4 py-2
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
          Add Task
        </button>
      </div>
    </>
  );
};

export default TaskBar;
