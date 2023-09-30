import {ADD_PROJECT_ACTION} from "../vars/vars";
import {ICardProject} from "../../components/UI/Card/CardProject/CardProject.interface";
import {TPayload} from "../../types/helperTypes/helperTypes";

interface IProjects {
    projectsItems: ICardProject[]
}

const initialState: IProjects = {
    projectsItems: [],
}

const projects = (state = initialState, action: TPayload<any>) => {
    switch (action.type) {
        case ADD_PROJECT_ACTION: {
            return {
                ...state,
                projectsItems: [
                    ...state.projectsItems,
                    action.payload
                ],
            }
        }

        default:
            return state;
    }
}

export default projects;

