"use client";

import { useContext } from "react";
import { KanbanContext } from "@/config/context/KanbanCtxProvider";

export const useKanbanCtx = () => {
  return useContext(KanbanContext);
};
