
import { from } from "rxjs";
import { switchMap, mergeMap, tap } from "rxjs/operators";

export const FETCH_REQUEST = "FETCH_REQUEST";

export default function fetchEpic(action$) {
    return action$.ofType(FETCH_REQUEST).pipe(
        mergeMap(action => {
            const { type, method, resource, nextType, body, ...rest } = action;
            return from(
                fetch(`https://jsonplaceholder.typicode.com${resource}`, {
                    method,
                    body: JSON.stringify(body),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
            ).pipe(
                switchMap(response => response.json()),
                switchMap(data => {
                    return from([
                        {
                            type: nextType,
                            data
                        }
                    ]);
                })
            );
        })
    );
}
