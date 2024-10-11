export type BaseApiResponse<T extends object> = {
  count: number;
  results: T[];
} & NavigationParams;

export type NavigationParams = {
  next: string | null;
  previous: string | null;
};

export type Ship = {
  name: string;
  model: string;
  url: string;
  // ...
};

export enum ApiFilterParams {
  search = 'search',
  page = 'page',
}
