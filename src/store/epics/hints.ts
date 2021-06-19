import {Epic, ofType} from 'redux-observable';
import {from, throwError} from 'rxjs';
import {catchError, filter, map, mergeMap, takeUntil, tap} from 'rxjs/operators';
import axios from "axios";

import {GET_HINTS, getHintsSuccess} from "../actions/hints";
import {IGetHints} from "../../interfaces/hints";
import {AppState} from "../store";


export const hintsEpic: Epic<IGetHints, IGetHints, AppState> = action$ => {
    return action$.pipe(
        ofType(GET_HINTS),
        // debounceTime(1000),
        mergeMap(
            (action: IGetHints) => {
                const CancelToken = axios.CancelToken;
                const source = CancelToken.source();
                return from(
                    axios.request({
                        url: "https://api.sberauto.com/searcher/suggestHints",
                        method: 'POST',
                        data: {
                            text: action.payload
                        },
                        cancelToken: source.token
                    }),
                ).pipe(
                    map(response =>
                        getHintsSuccess(response.data.data.hints)
                    ),
                    takeUntil(
                        action$.pipe(
                        filter((action: IGetHints) => action.type === 'GET_HINTS'),
                        tap(ev => source.cancel('canceled'))
                    )),
                    catchError((error) => throwError(error)),
                )
            }
        ),
    )
}
