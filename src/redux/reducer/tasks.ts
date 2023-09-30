import {
    CHANGE_ACTIVE_TASK_ACTION,
    ADD_TASKS_ACTION,
    CHANGE_SUBTASKS_ACTION,
    EDIT_TASK_ACTION,
    UPDATE_TASK_ACTION, UPDATE_COL_TO_TASK_ACTION
} from "../vars/vars";
import {ICardProject} from "../../components/UI/Card/CardProject/CardProject.interface";
import {TPayload} from "../../types/helperTypes/helperTypes";
import {ICardTask} from "../../components/UI/Card/CardTask/CardTask.interface";
import {colTasks, IColTasksData} from "../../pages/tasks";

interface ITasks {
    tasksItems: ICardTask[]
    activeTask: ICardTask | null
    editTask: ICardTask | null
}

const initialState: ITasks = {
    tasksItems: [],
    activeTask: null,
    editTask: null,
}

const tasks = (state = initialState, action: TPayload<any>) => {
    switch (action.type) {
        case ADD_TASKS_ACTION: {
            return {
                ...state,
                tasksItems: [
                    ...state.tasksItems,
                    action.payload
                ],
            }
        }
        case CHANGE_ACTIVE_TASK_ACTION: {
            return {
                ...state,
                activeTask: action.payload
            }
        }
        case CHANGE_SUBTASKS_ACTION: {
            const currentTasksItems = state.tasksItems
            const currentActiveTask = state.activeTask

            if (currentActiveTask) {
                currentTasksItems.forEach(item => {
                    if (item.uid === action.payload.taskUid) {
                        item.subTasks = action.payload.subTasks
                        currentActiveTask.subTasks = action.payload.subTasks
                    }
                })
            }

            return {
                ...state,
                tasksItems: [
                    ...currentTasksItems
                ],
                activeTask: {
                    ...currentActiveTask
                }
            }
        }
        case EDIT_TASK_ACTION: {
            return {
                ...state,
                editTask: action.payload
            }
        }
        case UPDATE_TASK_ACTION: {
            const currentTasksItems = [...state.tasksItems]
            currentTasksItems.forEach((item, index) => {
                if (item.uid === action.payload.uid) {
                    currentTasksItems[index] = {
                        ...action.payload
                    }
                }
            })

            return {
                ...state,
                tasksItems: currentTasksItems
            }
        }
        case UPDATE_COL_TO_TASK_ACTION: {
            let currentItems = [...state.tasksItems]
            const col: IColTasksData = action.payload.col
            const task: ICardTask = action.payload.task
            const copedTask: ICardTask | undefined = currentItems.find(item => item.uid === task.uid)
            let indexDelete: number | null = null

            if (copedTask) {
                copedTask.colTasksUid = col.uid
                copedTask.status = col.name

                if (col.name === 'Queue') {
                    copedTask.date.work = null
                    copedTask.date.end = null
                }
                if (col.name === 'Development') {
                    copedTask.date.work = Date.now()
                    copedTask.date.end = null
                }
                if (col.name === 'Done') {
                    copedTask.date.end = Date.now()
                }

                currentItems.forEach((item, index) => {
                    if (item.uid === task.uid) {
                        indexDelete = index
                    }
                })
                if (typeof indexDelete === 'number') {
                    delete currentItems[indexDelete]
                    currentItems = currentItems.filter(item => item)
                }

                currentItems.push(copedTask)
            }
            return {
                ...state,
                tasksItems: currentItems
            }
        }
        default:
            return state;
    }
}

export default tasks;

