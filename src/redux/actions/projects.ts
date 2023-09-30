import {ADD_PROJECT_ACTION} from "../vars/vars";
import {ICardProject} from "../../components/UI/Card/CardProject/CardProject.interface";

export const addProjectACTION = (item: ICardProject) => ({
    type: ADD_PROJECT_ACTION,
    payload: item,
});