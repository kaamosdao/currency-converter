import React from 'react';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import {
  useAppDispatch,
  useAppSelector,
} from '../hooks';
import { IFormExchange } from '../interfaces/interfaces';
import { currencySchema } from '../utils/validationSchema';
import { setBaseCurrency } from '../slices/exchangeRatesSlice';

const ExchangeRatesForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const baseCurrency: string = useAppSelector((state) => state.rates.baseCurrency);

  const formik: FormikProps<IFormExchange> = useFormik<IFormExchange>({
    initialValues: { currency: '' },
    validationSchema: currencySchema,
    onSubmit: async (
      values: IFormExchange,
      actions: Readonly<FormikHelpers<IFormExchange>>,
    ) => {
      const currency = values.currency.toUpperCase();
      dispatch(setBaseCurrency(currency));
      actions.resetForm();
    },
  });
  const showTooltip = formik.errors.currency ? 'd-block' : 'd-none';
  const tooltipClass = `invalid-tooltip w-100 ${showTooltip}`;

  return (
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
          <button
            type="submit"
            className="btn btn-primary ms-3 btn-sm"
            disabled={formik.isSubmitting}
          >
            Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExchangeRatesForm;
