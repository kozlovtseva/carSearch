export interface IHint {
    brand_id: number;
    cars_count: number;
    folder_id: number;
    model_id: number;
    title: string;
}

export interface IGetHints {
    type: string;
    payload: IHint[];
}