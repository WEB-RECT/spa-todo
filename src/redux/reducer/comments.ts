import { IComment } from "../../components/Comments/Comment.inerface";
import { TPayload } from "../../types/helperTypes/helperTypes";
import { ADD_COMMENT_ACTION } from "../vars/vars";

interface IComments {
    commentsItems: IComment[];
}

const initialState: IComments = {
    commentsItems: [],
};

const comments = (state = initialState, action: TPayload<any>) => {
    switch (action.type) {
        case ADD_COMMENT_ACTION: {
            return {
                ...state,
                commentsItems: [...state.commentsItems, action.payload],
            };
        }

        default:
            return state;
    }
};

export default comments;
