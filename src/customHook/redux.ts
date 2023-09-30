import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {bindActionCreators} from "redux"
import * as projects from "../redux/actions/projects";
import * as tasks from "../redux/actions/tasks";
import * as comments from "../redux/actions/comments";

const actions = {
    ...projects,
    ...tasks,
    ...comments,
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
