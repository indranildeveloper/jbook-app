import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actions } from "../state";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
