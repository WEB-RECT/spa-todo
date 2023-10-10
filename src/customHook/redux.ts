import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as comments from "../redux/actions/comments";
import * as projects from "../redux/actions/projects";
import * as tasks from "../redux/actions/tasks";
import { RootState } from "../redux/store";

const actions = {
    ...projects,
    ...tasks,
    ...comments,
};

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
