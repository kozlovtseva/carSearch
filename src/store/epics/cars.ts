import {Epic, ofType} from 'redux-observable';
import {from, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import axios from "axios";

import {GET_CARS, getCarsSuccess} from "../actions/cars";
import {IGetCars} from "../../interfaces/cars";

export const carsEpic: Epic = action$ => {
    return action$.pipe(
        ofType(GET_CARS),
        switchMap(
            (action: IGetCars) => {
                return from(
                    axios.request({
                        url: "https://api.sberauto.com/searcher/getCars",
                        method: 'POST',
                        data: {
                            page: 1,
                            per_page: 10,
                            filter: {
                                catalog: [
                                    {
                                        model_id: [action.payload],
                                    }
                                ],
                            }
                        },
                    })
                ).pipe(
                    map(response => {
                            const carsList = response.data.data.results;
                            let result = [];
                            for (let i = 0; i < carsList.length; i++) {
                                result.push({
                                    title: carsList[i].title,
                                    price: carsList[i].price
                                })
                            }
                            return getCarsSuccess(result)
                        }
                    ),
                    catchError((error) => throwError(error)),
                )
            }
        ),
        catchError((error) => throwError(error)),
    )
}
