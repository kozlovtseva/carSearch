import {IHint} from "../../interfaces/hints";

export const GET_HINTS = 'GET_HINTS'
export const GET_HINTS_FULFILLED = 'GET_HINTS_FULFILLED'


export const getHints = (hint: string) => {
    return { type: GET_HINTS, payload: hint }
}
export const getHintsSuccess = (response: IHint[]) => ({
    type: GET_HINTS_FULFILLED,
    payload: response,
})