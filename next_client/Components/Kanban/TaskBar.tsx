import EditSVG from "@/Assets/SVGs/EditSVG";
import PlusSVG from "@/Assets/SVGs/PlusSVG";
import { useAuth } from "@/hooks/useAuth";
import { Board, ModalStatusType } from "@/types/KanbanTypes";
import { Dispatch, SetStateAction } from "react";

interface Props {
  board: Board;
  modalStatus: ModalStatusType;
  setModalStatus: Dispatch<SetStateAction<ModalStatusType>>;
}

const TaskBar = ({ board, modalStatus, setModalStatus }: Props) => {
  const { auth }: any = useAuth();

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex justify-between items-center px-6 py-2">
        <div className="flex">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            {board.name}
          </h2>
          {auth.roles?.includes("Admin") && (
            <button
              type="submit"
              onClick={() => {
                setModalStatus({ ...modalStatus, updateKanbanModal: true });
              }}
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              className="flex w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
              role="menuitem"
            >
              <EditSVG />
            </button>
          )}
        </div>
        <button
          onClick={() => {
            setModalStatus({ ...modalStatus, createTicketModal: true });
          }}
          className="w-fit rounded-sm border border-primary bg-primary px-4 py-2
        text-white transition hover:bg-opacity-90 flex"
        >
          <PlusSVG />
          Add Task
        </button>
      </div>
    </>
  );
};

export default TaskBar;
