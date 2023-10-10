import { TUid } from "../../types/helperTypes/helperTypes";

export interface IComment {
    uid: TUid;
    text: string;
    parentUid: TUid | null;
    taskUid: TUid;
    children: IComment[];
}
