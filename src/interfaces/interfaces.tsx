interface IRate {
  readonly [rateName: string]: string;
}

export interface IRoutes {
  readonly [routeName: string]: string;
}

export interface IFormConvert {
  readonly converterQuery: string;
}

export interface IFormExchange{
  readonly currency: string;
}

export interface IParsedQuery {
  readonly from: string;
  readonly to: string;
  readonly amount: string;
}

export default IRate;
