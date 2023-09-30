import {ADD_COMMENT_ACTION, ADD_PROJECT_ACTION} from "../vars/vars";
import {ICardProject} from "../../components/UI/Card/CardProject/CardProject.interface";
import {IComment} from "../../components/Comments/Comment.inerface";

export const addCommentACTION = (item: IComment) => ({
    type: ADD_COMMENT_ACTION,
    payload: item,
});