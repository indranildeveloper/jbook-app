import { ICell } from "../../interfaces";
import { ActionType } from "../../interfaces/actionTypes";
import { Action } from "../actions";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: ICell;
  };
}

const initialCellState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: CellsState = initialCellState,
  action: Action
): CellsState => {
  return state;
};

export default reducer;
