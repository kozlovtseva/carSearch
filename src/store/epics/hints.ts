import {Epic, ofType} from 'redux-observable';
import {from, throwError} from 'rxjs';
import {catchError, filter, map, switchMap, takeUntil} from 'rxjs/operators';
import axios, {CancelTokenSource} from "axios";

import {GET_HINTS, getHintsSuccess} from "../actions/hints";
import {IGetHints} from "../../interfaces/hints";
import {AppState} from "../store";

export const hintsEpic: Epic<IGetHints, IGetHints, AppState> = action$ => {
    let cancelToken:CancelTokenSource;
    return action$.pipe(
        ofType(GET_HINTS),
        // debounceTime(1000),
        switchMap(
            (action: IGetHints) => {
                if (cancelToken !== undefined) {
                    cancelToken.cancel("Cancel request");
                }
                cancelToken = axios.CancelToken.source();
                return from(
                    axios.request({
                        url: "https://api.sberauto.com/searcher/suggestHints",
                        method: 'POST',
                        data: {
                            text: action.payload
                        },
                        cancelToken: cancelToken.token
                    })
                ).pipe(
                    map(response =>
                        getHintsSuccess(response.data.data.hints)
                    ),
                    takeUntil(
                        action$.pipe(
                            filter((action: IGetHints) => action.type !== GET_HINTS),
                    )),
                    catchError((error) => throwError(error)),
                )
            }
        ),
        catchError((error) => throwError(error)),
    )
}
