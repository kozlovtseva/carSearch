import {ICar} from "../../interfaces/cars";

export const GET_CARS = 'GET_CARS'
export const GET_CARS_FULFILLED = 'GET_CARS_FULFILLED'


export const getCars = (modelId: number) => {
    return { type: GET_CARS, payload: modelId }
}
export const getCarsSuccess = (response: ICar[]) => ({
    type: GET_CARS_FULFILLED,
    payload: response,
})