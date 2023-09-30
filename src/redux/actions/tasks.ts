import {
    ADD_TASKS_ACTION,
    ADD_PROJECT_ACTION,
    CHANGE_ACTIVE_TASK_ACTION,
    CHANGE_SUBTASKS_ACTION,
    EDIT_TASK_ACTION,
    UPDATE_TASK_ACTION, UPDATE_COL_TO_TASK_ACTION
} from "../vars/vars";
import {ICardTask, ISubTasks} from "../../components/UI/Card/CardTask/CardTask.interface";
import {TUid} from "../../types/helperTypes/helperTypes";
import {IColTasksData} from "../../pages/tasks";
import CardTask from "../../components/UI/Card/CardTask/CardTask";

export const addTasksACTION = (item: ICardTask) => ({
    type: ADD_TASKS_ACTION,
    payload: item,
});

export const changeActiveTaskACTION = (item: ICardTask | null) => ({
    type: CHANGE_ACTIVE_TASK_ACTION,
    payload: item,
});

export const editTaskACTION = (item: ICardTask | null) => ({
    type: EDIT_TASK_ACTION,
    payload: item,
});
export const updateTaskACTION = (item: ICardTask) => ({
    type: UPDATE_TASK_ACTION,
    payload: item,
});

export const changeSubTasksACTION = (taskUid: TUid, subTasks: ISubTasks[]) => ({
    type: CHANGE_SUBTASKS_ACTION,
    payload: {
        taskUid,
        subTasks,
    },
});
export const updateColToTaskACTION = (col: IColTasksData, task: ICardTask) => ({
    type: UPDATE_COL_TO_TASK_ACTION,
    payload: {
        col,
        task,
    },
});