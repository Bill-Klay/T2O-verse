import KanbanColumn from "@/Components/Kanban/KanbanColumn";
import KanbanContainer from "@/Components/Kanban/KanbanContainer";
import KanbanItem from "@/Components/Kanban/KanbanItem";
import TaskBar from "@/Components/Kanban/TaskBar";
import React from "react";

const Kanban = () => {
  return (
    <>
      <TaskBar />
      <KanbanContainer>
        <KanbanColumn col_name="To Do's">
          <KanbanItem title="Create Task" description="Make Modal" />
        </KanbanColumn>
        <KanbanColumn col_name="In Progress">
          <KanbanItem title="Set Board" description="Complete Design" />
        </KanbanColumn>
        <KanbanColumn col_name="Done">
          <KanbanItem title="Structure" description="Make A Skeleton" />
        </KanbanColumn>
      </KanbanContainer>
    </>
  );
};

export default Kanban;
