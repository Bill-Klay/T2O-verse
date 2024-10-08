import { getBoards } from "@/handlers/Kanban/handlers";
import { useKanbanCtx } from "@/hooks/useKanbanCtx";
import { ContextTypes } from "@/types/KanbanCtxTypes";
import { ModalStatusType } from "@/types/KanbanTypes";
import { runErrorToast, runSuccessToast } from "@/utils/toast";
import { Dispatch, SetStateAction, useState } from "react";

type ModalProps = {
  modalStatus: ModalStatusType;
  setModalStatus: Dispatch<SetStateAction<ModalStatusType>>;
};

const CreateKanban_Modal = ({ modalStatus, setModalStatus }: ModalProps) => {
  const [kanban_name, setKanbanName] = useState("");

  const { setBoardsList } = useKanbanCtx() as ContextTypes;

  const createBoard = async () => {
    try {
      if (kanban_name.length <= 2) {
        runErrorToast("Length Should be Greater Than 2");
      } else {
        const res = await fetch(`/api/kanban_board`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: kanban_name,
          }),
        });

        if (!res.ok) {
          throw new Error("Something Went Wrong");
        }

        runSuccessToast("Board Created Succesfully");

        const res_data = await res.json();
        const response = await fetch(`/api/kanban_column`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            board_id: res_data.id,
            name: `To Do's`,
            position: 1,
          }),
        });

        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }

        const col_res_data = await response.json();
        runSuccessToast("Column Created Successfully");
        setModalStatus({ ...modalStatus, createKanbanModal: false });
        const boards = await getBoards();
        setBoardsList(boards);
      }
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  return (
    <>
      {modalStatus.createKanbanModal ? (
        <>
          <div
            className="fixed z-50  outline-none focus:outline-none "
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
                  Create Kanban Board
                </h2>
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="kanban_name"
                    className="mb-2.5 font-medium text-black dark:text-white"
                  >
                    Kanban Name:{" "}
                  </label>
                  <input
                    id="kanban_name"
                    name="kanban_name"
                    type="text"
                    onChange={(event) => {
                      setKanbanName(event.target.value);
                    }}
                    className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-around pt-4 rounded-b">
                  <button
                    onClick={createBoard}
                    className="cursor-pointer rounded-lg border border-primary bg-primary py-2 px-6 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setModalStatus({
                        ...modalStatus,
                        createKanbanModal: false,
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

export default CreateKanban_Modal;
