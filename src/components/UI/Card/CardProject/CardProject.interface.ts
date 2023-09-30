import {TUnixDate, TUid} from "../../../../types/helperTypes/helperTypes";

export interface ICardProject {
    uid: TUid
    name: string
    description: string
    dateCreate: TUnixDate
}