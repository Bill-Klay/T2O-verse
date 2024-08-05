"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { PropsWithChildren, ReactNode } from "react";

interface Props {
  onDragEnd: (event: DragEndEvent) => void;
}

const KanbanContainer = ({ children, onDragEnd }: PropsWithChildren<Props>) => {
  return (
    <div className="overflow-visible grid grid-cols-3 gap-10 mt-10">
      <DndContext onDragEnd={onDragEnd}>{children}</DndContext>
    </div>
  );
};

export default KanbanContainer;
