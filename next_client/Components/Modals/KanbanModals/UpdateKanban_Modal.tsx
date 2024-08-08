import { Board } from "@/types/KanbanTypes";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type ModalProps = {
  showUpdateKanban: boolean;
  modalStyle: object;
  setShowUpdateKanban: Dispatch<SetStateAction<boolean>>;
  board: Board | undefined;
  setBoard: Dispatch<SetStateAction<any>>;
  getBoards: () => void;
};

const UpdateKanban_Modal = ({
  showUpdateKanban,
  modalStyle,
  setShowUpdateKanban,
  board,
  setBoard,
  getBoards,
}: ModalProps) => {
  const [kanban_name, setKanbanName] = useState("");

  const handleClick = async () => {
    try {
      if (kanban_name.length <= 2) {
        toast.error(`Length Should be Greater Than 2`, {
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
        toast.success(`Board Updated Succesfully`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowUpdateKanban(!showUpdateKanban);
        getBoards();
        setBoard({ ...board, name: kanban_name });
      }
    } catch (error) {
      console.log("Error >>", error);
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
                    onClick={handleClick}
                    className="cursor-pointer rounded-lg border border-primary bg-primary py-2 px-6 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    Update
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
