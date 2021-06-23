export interface IGetCars {
    type: string;
    payload: ICar[];
}

export interface ICar {
    id: number;
    title: string;
    price: number;
}