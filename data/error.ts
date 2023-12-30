export interface ApiError {
    status: number;
    data: {
        [key: string]: string[];
    };
}