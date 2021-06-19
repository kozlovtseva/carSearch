import {combineEpics, Epic} from "redux-observable";
import {hintsEpic} from "./hints";


const epics: Epic = combineEpics(hintsEpic);

export default epics;