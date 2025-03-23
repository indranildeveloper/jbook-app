export type TCell = "code" | "text";

export type TCellMoveDirection = "up" | "down";

export interface ICell {
  id: string;
  type: TCell;
  content: string;
}
