import {ADD_COMMENT_ACTION} from "../vars/vars";
import {TPayload} from "../../types/helperTypes/helperTypes";
import {IComment} from "../../components/Comments/Comment.inerface";

interface IComments {
    commentsItems: IComment[]
}

const initialState: IComments = {
    commentsItems: [],
}

const comments = (state = initialState, action: TPayload<any>) => {
    switch (action.type) {
        case ADD_COMMENT_ACTION: {
            return {
                ...state,
                commentsItems: [
                    ...state.commentsItems,
                    action.payload
                ],
            }
        }

        default:
            return state;
    }
}

export default comments;

