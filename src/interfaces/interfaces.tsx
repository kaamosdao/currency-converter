interface IRate {
  readonly [rateName: string]: string;
}

export interface IRoutes {
  readonly [routeName: string]: string;
}

export interface IFormValue {
  readonly converterQuery: string;
}

export interface IParsedQuery {
  readonly from: string;
  readonly to: string;
  readonly amount: string;
}

export default IRate;
