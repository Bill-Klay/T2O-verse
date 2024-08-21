import { Board } from "@/types/KanbanTypes";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleBoardChange = (
  event: ChangeEvent<HTMLSelectElement>,
  setBoard: Dispatch<SetStateAction<Board | undefined>>
) => {
  const selectedIndex = event.target.selectedIndex;
  const selectedOption = event.target.options[selectedIndex];
  const id = Number(selectedOption.getAttribute("data-id"));
  const name = selectedOption.getAttribute("data-name") || "";
  setBoard({ id, name });
};
