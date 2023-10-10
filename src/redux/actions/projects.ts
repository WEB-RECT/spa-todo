import { ICardProject } from "../../components/UI/Card/CardProject/CardProject.interface";
import { ADD_PROJECT_ACTION } from "../vars/vars";

export const addProjectACTION = (item: ICardProject) => ({
    type: ADD_PROJECT_ACTION,
    payload: item,
});
