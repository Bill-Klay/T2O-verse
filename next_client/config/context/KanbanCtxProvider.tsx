"use client";

import { Board, ColumnWithTickets } from "@/types/KanbanTypes";
import { createContext, useState, useEffect, ReactNode } from "react";

export const KanbanContext = createContext({});

export const KanbanCtxProvider = ({ children }: { children: ReactNode }) => {
  const [boardsList, setBoardsList] = useState<Board[]>([]);
  const [columnsNTicketsList, setColumnsNTicketsList] = useState<
    ColumnWithTickets[]
  >([]);

  const values = {
    boardsList,
    setBoardsList,
    columnsNTicketsList,
    setColumnsNTicketsList,
  };

  return (
    <KanbanContext.Provider value={values}>{children}</KanbanContext.Provider>
  );
};
