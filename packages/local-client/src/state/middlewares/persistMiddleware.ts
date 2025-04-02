import { Dispatch, Middleware } from "redux";
import { Action, ActionType } from "../../interfaces";
import { saveCells } from "../actions/actions";
import { RootState } from "../reducers/reducers";

// @ts-expect-error persist middleware is typed differently
export const persistMiddleware: Middleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: NodeJS.Timeout;
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type as ActionType)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 750);
      }
      next(action);
    };
  };
};
