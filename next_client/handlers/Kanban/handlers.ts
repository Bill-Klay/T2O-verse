import { base_url } from "@/lib/Constants";
import { Board, Column, ColumnWithTickets } from "@/types/KanbanTypes";

export const getBoards = async () => {
  try {
    const res = await fetch(`${base_url}/boards`, {
      method: "GET",
      credentials: "include",
    });

    const boards = await res.json();
    console.log("Boards >>", boards);
    // setBoardsList(boards);

    return boards;
  } catch (error) {
    console.log("Error >>", error);
  }
};

export const getColumnsNTickets = async (board: Board) => {
  try {
    // Fetch columns
    const res = await fetch(`${base_url}//boards/${board?.id}/columns`, {
      method: "GET",
      credentials: "include",
    });

    const columns = await res.json();
    console.log("Columns >>", columns);

    // Fetch tickets for each column
    const columnsWithTickets = await Promise.all(
      columns.map(async (column: Column) => {
        const ticketsRes = await fetch(
          `${base_url}//columns/${column.id}/tickets`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const tickets = await ticketsRes.json();
        console.log("Tickets >>", tickets + column.id);
        return { ...column, tickets };
      })
    );

    console.log("Columns with tickets >>", columnsWithTickets);

    return columnsWithTickets;
  } catch (error) {
    console.log("Error >>", error);
  }
};
