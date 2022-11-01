interface IRate {
  readonly [rateName: string]: string;
}

export interface IRoutes {
  readonly [routeName: string]: string;
}

export interface IConvertResult {
  readonly from: string;
  readonly to: string;
  readonly amount: number;
}

export default IRate;
