import {AnyAction, Reducer} from "redux";
import {GET_CARS_FULFILLED} from "../actions/cars";
import {ICar} from "../../interfaces/cars";

export interface CarsState {
    list: ICar[];
}

const initialState: CarsState = {
    list: [],
};

export const carsReducer: Reducer<CarsState> = (
    state = initialState,
    action: AnyAction
) => {
    switch (action.type) {
        case GET_CARS_FULFILLED: {
            let newList = state.list.concat(action.payload)
            state = {
                ...state,
                list: newList,
            };
            break;
        }
        default: {
            state = { ...state };
        }
    }
    return state;
};
