import { produce } from "immer";
import { ActionType, Action, BundleState } from "../../interfaces";

const initialBundleState: BundleState = {};

const bundlesReducer = produce(
  (state: BundleState = initialBundleState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          error: "",
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          error: action.payload.bundle.error,
        };
        return state;
      default:
        return state;
    }
  },
  initialBundleState
);

export default bundlesReducer;
