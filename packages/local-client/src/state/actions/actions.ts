import { Dispatch } from "redux";
import {
  Action,
  ActionType,
  DeleteCellAction,
  ICell,
  InsertCellAfterAction,
  MoveCellAction,
  TCell,
  TCellMoveDirection,
  UpdateCellAction,
} from "../../interfaces";
import bundleCode from "../../bundler";
import axios from "axios";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (
  id: string,
  direction: TCellMoveDirection,
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: TCell,
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundleCode = (
  cellId: string,
  inputCode: string,
): ((dispatch: Dispatch<Action>) => Promise<void>) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundleCode(inputCode);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data } = await axios.get<ICell[]>("/cells");
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: error.message,
        });
      }
    }
  };
};
