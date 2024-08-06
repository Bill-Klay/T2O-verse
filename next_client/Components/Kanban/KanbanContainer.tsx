"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

interface Props {
  onDragEnd: (event: DragEndEvent) => void;
}

const KanbanContainer = ({ children, onDragEnd }: PropsWithChildren<Props>) => {
  return (
    <div className="grid grid-flow-col auto-cols-fr gap-4 overflow-visible mt-10">
      <DndContext onDragEnd={onDragEnd}>{children}</DndContext>
    </div>
  );
};

export default KanbanContainer;
