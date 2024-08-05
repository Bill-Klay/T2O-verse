"use client";

import KanbanColumn from "@/Components/Kanban/KanbanColumn";
import KanbanContainer from "@/Components/Kanban/KanbanContainer";
import KanbanItem from "@/Components/Kanban/KanbanItem";
import TaskBar from "@/Components/Kanban/TaskBar";
import CreateKanban_Modal from "@/Components/Modals/CreateKanban_Modal";
import { base_url } from "@/lib/Constants";
import { Board } from "@/types/KanbanTypes";
import { DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState, useRef, ChangeEvent } from "react";

const Kanban = () => {
  const [taskList, setTaskList] = useState(Lists);
  const [boardsList, setBoardsList] = useState<Board[]>([]);
  const [board, setBoard] = useState<Board>();
  const [showModal, setShowModal] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const [modalStyle, setModalStyle] = useState({});

  function handleDragEnd(event: DragEndEvent) {
    const col_id = event.over?.id as number;
    const task_id = event.active?.id as number;
    const task_col_id = event.active.data.current?.col_id;

    if (task_col_id === col_id) return;

    const updatedList = taskList.map((item) =>
      item.id === task_id ? { ...item, col_id } : item
    );

    setTaskList(updatedList);
  }

  const getBoards = async () => {
    try {
      const res = await fetch(`${base_url}/boards`, {
        method: "GET",
        credentials: "include",
      });

      const boards = await res.json();
      console.log("Boards >>", boards);
      setBoardsList(boards);
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  const handleBoardChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const id = Number(selectedOption.getAttribute("data-id"));
    const name = selectedOption.getAttribute("data-name") || "";
    setBoard({ id, name });
  };

  useEffect(() => {
    if (showModal && boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      setModalStyle({
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.left + window.scrollX + rect.width / 2,
        transform: "translate(-50%, -50%)",
      });
    }
  }, [showModal]);

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <>
      <CreateKanban_Modal
        showModal={showModal}
        modalStyle={modalStyle}
        setShowModal={setShowModal}
      />
      <div ref={boardRef}>
        <select
          id="kanban_name"
          name="kanban_name"
          onChange={handleBoardChange}
          className="w-55 my-3 rounded-lg border border-strokedark bg-transparent py-1 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option key={0} value="">
            Select Board
          </option>
          {boardsList.map((board) => (
            <option
              key={board.id}
              value={board.id}
              data-id={board.id}
              data-name={board.name}
            >
              {board.name}
            </option>
          ))}
        </select>
        <TaskBar />
        <KanbanContainer onDragEnd={handleDragEnd}>
          <KanbanColumn col_id={1} col_name="To Do's">
            {taskList.map((item) =>
              item.col_id === 1 ? (
                <KanbanItem
                  key={item.id}
                  id={item.id}
                  col_id={item.col_id}
                  title={item.title}
                  description={item.description}
                />
              ) : null
            )}
          </KanbanColumn>
          <KanbanColumn col_id={2} col_name="In Progress">
            {taskList.map((item) =>
              item.col_id === 2 ? (
                <KanbanItem
                  key={item.id}
                  id={item.id}
                  col_id={item.col_id}
                  title={item.title}
                  description={item.description}
                />
              ) : null
            )}
          </KanbanColumn>
          <KanbanColumn col_id={3} col_name="Done">
            {taskList.map((item) =>
              item.col_id === 3 ? (
                <KanbanItem
                  key={item.id}
                  id={item.id}
                  col_id={item.col_id}
                  title={item.title}
                  description={item.description}
                />
              ) : null
            )}
          </KanbanColumn>
        </KanbanContainer>
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

const Lists = [
  {
    id: 1,
    col_id: 1,
    title: "Create Task",
    description: "Define the requirements and objectives.",
  },
  {
    id: 2,
    col_id: 2,
    title: "Design Wireframe",
    description: "Create a basic layout for the project.",
  },
  {
    id: 3,
    col_id: 3,
    title: "Develop Feature A",
    description: "Implement the primary functionality.",
  },
  {
    id: 4,
    col_id: 1,
    title: "Review Code",
    description: "Perform code review for quality assurance.",
  },
  {
    id: 5,
    col_id: 2,
    title: "Test Feature A",
    description: "Conduct testing for the new feature.",
  },
  {
    id: 6,
    col_id: 3,
    title: "Deploy to Staging",
    description: "Deploy the application to the staging environment.",
  },
  {
    id: 7,
    col_id: 1,
    title: "Gather Feedback",
    description: "Collect feedback from stakeholders.",
  },
  {
    id: 8,
    col_id: 2,
    title: "Fix Bugs",
    description: "Address issues found during testing.",
  },
  {
    id: 9,
    col_id: 3,
    title: "Prepare Release Notes",
    description: "Document changes for the release.",
  },
  {
    id: 10,
    col_id: 1,
    title: "Release to Production",
    description: "Deploy the application to the production environment.",
  },
  {
    id: 11,
    col_id: 2,
    title: "Monitor Performance",
    description: "Ensure the application is running smoothly.",
  },
  {
    id: 12,
    col_id: 3,
    title: "Plan Next Sprint",
    description: "Prepare tasks for the upcoming sprint.",
  },
  {
    id: 13,
    col_id: 1,
    title: "Update Documentation",
    description: "Ensure all documentation is up to date.",
  },
  {
    id: 14,
    col_id: 2,
    title: "Conduct Retrospective",
    description: "Review the last sprint and identify improvements.",
  },
  {
    id: 15,
    col_id: 3,
    title: "Optimize Database",
    description: "Improve database performance and efficiency.",
  },
];

export default Kanban;
