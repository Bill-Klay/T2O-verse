import { Dispatch, SetStateAction } from "react";

interface Props {
  board_name: string;
  showTicketModal: boolean;
  setShowTicketModal: Dispatch<SetStateAction<boolean>>;
}

const TaskBar = ({
  board_name,
  showTicketModal,
  setShowTicketModal,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex justify-between items-center px-6 py-2">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {board_name}
      </h2>
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
  );
};

export default TaskBar;
