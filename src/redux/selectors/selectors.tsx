import {RootState} from "../store";
import comments from "../reducer/comments";

export const projectsGET = (state: RootState) => state.projects

export const projectsItemsGET = (state: RootState) => projectsGET(state).projectsItems

export const tasksGET = (state: RootState) => state.tasks

export const tasksItemsGET = (state: RootState) => tasksGET(state).tasksItems
export const activeTaskGET = (state: RootState) => tasksGET(state).activeTask
export const editTaskGET = (state: RootState) => tasksGET(state).editTask

export const commentsGET = (state: RootState) => state.comments

export const commentsItemsGET = (state: RootState) => commentsGET(state).commentsItems