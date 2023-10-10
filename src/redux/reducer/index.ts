import { combineReducers } from "redux";
import comments from "./comments";
import projects from "./projects";
import tasks from "./tasks";

const rootReducer = combineReducers({
    projects,
    tasks,
    comments,
});

export default rootReducer;
