import { produce } from "immer";
import { ActionType, Action, BundlesState } from "../../interfaces";

const initialBundleState: BundlesState = {};

const bundlesReducer = produce(
  (state: BundlesState = initialBundleState, action: Action): BundlesState => {
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
