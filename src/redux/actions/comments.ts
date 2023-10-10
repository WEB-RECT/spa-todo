import { IComment } from "../../components/Comments/Comment.inerface";
import { ADD_COMMENT_ACTION } from "../vars/vars";

export const addCommentACTION = (item: IComment) => ({
    type: ADD_COMMENT_ACTION,
    payload: item,
});
