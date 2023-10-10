import { TUid, TUnixDate } from "../../../../types/helperTypes/helperTypes";

export interface ICardProject {
    uid: TUid;
    name: string;
    description: string;
    dateCreate: TUnixDate;
}
