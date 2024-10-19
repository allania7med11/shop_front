export interface ApiError {
  originalStatus: number;
  data: {
    [key: string]: string[];
  };
}
