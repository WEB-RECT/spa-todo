import {combineReducers} from "redux";
import projects from "./projects";
import tasks from "./tasks";
import comments from "./comments";

const rootReducer = combineReducers({
    projects,
    tasks,
    comments,
});

export default rootReducer;