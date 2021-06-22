import {createStore, combineReducers, applyMiddleware} from "redux";
import { createEpicMiddleware } from 'redux-observable';
import epics from "./epics";
import {hintsReducer, HintsState} from "./reducers/hintsReducer";
import {carsReducer, CarsState} from "./reducers/carsReducer";


const epicMiddleware = createEpicMiddleware();

export interface AppState {
    hints: HintsState;
    cars: CarsState;
}

const rootReducer = combineReducers<AppState>({
    hints: hintsReducer,
    cars: carsReducer
});



const initialState = {};

export default function configureStore() {

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(epics);

    return store;
}

