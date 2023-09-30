import {TUnixDate, TUid} from "../../../../types/helperTypes/helperTypes";
import {IFile} from "../../Form/Files/Files";

export type TCardTaskStatus = "Queue" | "Development" | "Done"

interface IDate {
    create: TUnixDate
    work: TUnixDate | null
    end: TUnixDate | null
}

export interface ISubTasks {
    uid: TUid
    status: boolean
    text: string
}

export interface ICardTask {
    id: number
    uid: TUid
    colTasksUid: TUid
    projectUid: TUid
    name: string
    description: string
    date: IDate
    priority: boolean
    files: IFile[]
    status: TCardTaskStatus
    subTasks: ISubTasks[]
}
