export interface IGetCars {
    type: string;
    payload: any;
}

export interface ICar {
    id: number;
    title: string;
    price: number;
}