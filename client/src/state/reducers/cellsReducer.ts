import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import { ActionType } from "../../interfaces/ActionTypes";
import { CellsState } from "../../interfaces/CellsState";
import { Action } from "../actions";
import { ICell } from "../../interfaces";

const initialCellState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellsState = initialCellState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL: {
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      }
      case ActionType.DELETE_CELL: {
        delete state.data[action.payload];
        state.order.filter((id) => id !== action.payload);
        return state;
      }
      case ActionType.MOVE_CELL: {
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      }
      case ActionType.INSERT_CELL_BEFORE: {
        const cell: ICell = {
          content: "",
          type: action.payload.type,
          id: uuidv4(),
        };

        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(foundIndex, 0, cell.id);
        }

        return state;
      }
      default:
        return state;
    }
  },
  initialCellState
);

export default reducer;
