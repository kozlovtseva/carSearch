import {AnyAction, Reducer} from "redux";
import {GET_HINTS_FULFILLED} from "../actions/hints";
import {IHint} from "../../interfaces/hints";

export interface HintsState {
    list: IHint[];
}

const initialState: HintsState = {
    list: [],
};

export const hintsReducer: Reducer<HintsState> = (
    state = initialState,
    action: AnyAction
) => {
    switch (action.type) {
        case GET_HINTS_FULFILLED: {
            state = {
                ...state,
                list: action.payload
            };
            break;
        }
        default: {
            state = { ...state };
        }
    }
    return state;
};
