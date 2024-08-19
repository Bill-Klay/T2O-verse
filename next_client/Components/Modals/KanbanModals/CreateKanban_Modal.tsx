import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type ModalProps = {
  showModal: boolean;
  modalStyle: object;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  getBoards: () => void;
};

const CreateKanban_Modal = ({
  showModal,
  modalStyle,
  setShowModal,
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

        toast.success(`Board Created Succesfully`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

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
        toast.success(`Column Created Succesfully`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowModal(!showModal);
        getBoards();
      }
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  return (
    <>
      {showModal ? (
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
                    onClick={handleClick}
                    className="cursor-pointer rounded-lg border border-primary bg-primary py-2 px-6 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
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
