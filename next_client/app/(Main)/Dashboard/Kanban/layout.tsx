import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { KanbanCtxProvider } from "@/config/context/KanbanCtxProvider";
import { ReactNode } from "react";

const Kanban = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto max-w-242.5">
      <Breadcrumb pageName="Kanban" />
      <div>
        <KanbanCtxProvider>{children}</KanbanCtxProvider>
      </div>
    </div>
  );
};

export default Kanban;
