export interface IHelperArrayService {
  includes<T>(a: T[], b: T): boolean;
  map<T>(a: T[], field: string): Array<any>;
}
