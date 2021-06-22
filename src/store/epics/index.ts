import {combineEpics, Epic} from "redux-observable";
import {hintsEpic} from "./hints";
import {carsEpic} from "./cars";


const epics: Epic = combineEpics(hintsEpic, carsEpic);

export default epics;