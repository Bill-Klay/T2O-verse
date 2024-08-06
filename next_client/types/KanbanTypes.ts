export type Board = {
  id: number;
  name: string;
};

export type Column = {
  id: number;
  name: string;
  position: string;
};

export type Ticket = {
  id: number;
  position: number;
  title: string;
  description: string;
};

export type ColumnWithTickets = Column & {
  tickets: Ticket[];
};
