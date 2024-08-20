import { getBoards } from "@/handlers/Kanban/handlers";
import { useKanbanCtx } from "@/hooks/useKanbanCtx";
import { ContextTypes } from "@/types/KanbanCtxTypes";
import { Board } from "@/types/KanbanTypes";
import { runErrorToast, runSuccessToast } from "@/utils/toast";
import { Dispatch, SetStateAction, useState } from "react";

type ModalProps = {
  showUpdateKanban: boolean;
  modalStyle: object;
  setShowUpdateKanban: Dispatch<SetStateAction<boolean>>;
  board: Board | undefined;
  setBoard: Dispatch<SetStateAction<any>>;
};

const UpdateKanban_Modal = ({
  showUpdateKanban,
  modalStyle,
  setShowUpdateKanban,
  board,
  setBoard,
}: ModalProps) => {
  const [kanban_name, setKanbanName] = useState("");

  const { setBoardsList } = useKanbanCtx() as ContextTypes;

  const updateBoard = async () => {
    try {
      if (kanban_name.length <= 2) {
        runErrorToast(`Length Should be Greater Than 2`);
      } else {
        const res = await fetch(`/api/kanban_board`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: board?.id,
            name: kanban_name,
          }),
        });

        if (!res.ok) {
          throw new Error("Something Went Wrong");
        }

        // const res_data = await res.json();
        runSuccessToast("Board Updated Successfully");
        setShowUpdateKanban(!showUpdateKanban);
        const boards = await getBoards();
        setBoardsList(boards);
        setBoard({ ...board, name: kanban_name });
      }
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  const deleteBoard = async () => {
    try {
      const res = await fetch(`/api/kanban_board`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: board?.id,
        }),
      });

      if (!res.ok) {
        // Check for specific response status codes if needed
        if (res.status === 403) {
          throw new Error(
            "Forbidden: You do not have permission to delete this board."
          );
        }
        throw new Error("Something Went Wrong");
      }

      // Uncomment this if you need to parse the response data
      // const res_data = await res.json();
      runSuccessToast(`Board Deleted ${res.status}`);
      setShowUpdateKanban(!showUpdateKanban);
      const boards = await getBoards();
      setBoardsList(boards);
      setBoard(null);
    } catch (error: any) {
      console.error("Error >>", error.message);

      // Optionally, show an error toast
      runErrorToast(`Failed to delete board: ${error.message}`);
    }
  };

  return (
    <>
      {showUpdateKanban ? (
        <>
          <div
            className="fixed z-50  outline-none focus:outline-none "
            style={modalStyle}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="py-4 px-8 rounded-md border border-stroke shadow-default relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <h2 className="mb-5 text-title-md2 font-semibold text-black dark:text-white">
                  Update Board Name
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
                    placeholder={board?.name}
                    onChange={(event) => {
                      setKanbanName(event.target.value);
                    }}
                    className="w-full rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-around pt-4 rounded-b">
                  <button
                    onClick={updateBoard}
                    className="cursor-pointer rounded-lg border border-primary bg-primary py-2 px-6 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    Update
                  </button>
                  <button
                    onClick={deleteBoard}
                    className="cursor-pointer rounded-lg border border-rose-700 bg-rose-800 mx-1 py-2 px-6 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setShowUpdateKanban(false);
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

export default UpdateKanban_Modal;
