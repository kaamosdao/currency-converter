import React, { useEffect, useState } from 'react';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import IRate, { IFormExchange } from '../interfaces/interfaces';
import { currencySchema } from '../validationSchema';
import useHttp from '../hooks';
import MakeRequest from '../makeRequest';

const ExchangeRates: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>('');
  const [rates, setRates] = useState<IRate>({});
  const httpClient: MakeRequest = useHttp();

  useEffect(() => {
    httpClient.getCurrency().then((base) => setBaseCurrency(base));
  }, [httpClient]);

  useEffect(() => {
    if (baseCurrency) {
      httpClient.getExchangeRates(baseCurrency).then((data) => setRates(data));
    }
  }, [baseCurrency, httpClient]);

  const formik: FormikProps<IFormExchange> = useFormik<IFormExchange>({
    initialValues: { currency: '' },
    validationSchema: currencySchema,
    onSubmit: async (
      values: IFormExchange,
      actions: Readonly<FormikHelpers<IFormExchange>>,
    ) => {
      const currency = values.currency.toUpperCase();
      setBaseCurrency(currency);
      actions.resetForm();
    },
  });
  const showTooltip = formik.errors.currency ? 'd-block' : 'd-none';
  const tooltipClass = `invalid-tooltip w-100 ${showTooltip}`;

  const getConvertedCurency = (
    currency: string,
    convertCurrency: string,
    rate: string,
  ): string => {
    const amount = (1 / Number(rate)).toFixed(2);
    return `1 ${convertCurrency} = ${amount} ${currency}`;
  };

  return (
    <div className="card w-25  text-center">
      <div className="card-body">
        <h5 className="card-title">Exchange Rates</h5>
      </div>
      <ul className="list-group list-group-flush">
        {rates.USD && (
          <li className="list-group-item">
            {getConvertedCurency(baseCurrency, 'USD', rates.USD)}
          </li>
        )}
        {rates.EUR && (
          <li className="list-group-item">
            {getConvertedCurency(baseCurrency, 'EUR', rates.EUR)}
          </li>
        )}
      </ul>
      <div className="card-body">
        <p className="card-text">
          Your base currency:&nbsp;
          <b>{baseCurrency}</b>
        </p>
        <form className="d-flex" onSubmit={formik.handleSubmit}>
          <label htmlFor="currency" className="visually-hidden">
            Currency
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control form-control-sm"
              id="currency"
              name="currency"
              placeholder="new currency"
              onChange={formik.handleChange}
              value={formik.values.currency}
              disabled={formik.isSubmitting}
            />
            <div className={tooltipClass}>{formik.errors.currency}</div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary ms-3 btn-sm" disabled={formik.isSubmitting}>
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExchangeRates;
