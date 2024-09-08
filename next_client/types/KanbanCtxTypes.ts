import { Dispatch, SetStateAction } from "react";
import { Board, ColumnWithTickets } from "./KanbanTypes";

export type ContextTypes = {
  boardsList: Board[];
  setBoardsList: Dispatch<SetStateAction<Board>>;
  columnsNTicketsList: ColumnWithTickets[];
  setColumnsNTicketsList: Dispatch<SetStateAction<ColumnWithTickets[]>>;
};
