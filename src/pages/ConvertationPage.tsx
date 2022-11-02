import React, { useState } from 'react';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import axios from 'axios';
import routes from '../routes';
import { IFormValue } from '../interfaces/interfaces';
import validationSchema from '../validationSchema';
import parseQuery from '../parseQuery';

const Convertation: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const convertCurrency = async (from: string, to: string, amount: string) => {
    const response = await axios.get(routes.convert, {
      params: { from, to, amount },
      headers: { apikey: process.env.REACT_APP_RATES_KEY },
    });
    return response.data.result;
  };

  const formik: FormikProps<IFormValue> = useFormik<IFormValue>({
    initialValues: { query: '' },
    validationSchema,
    onSubmit: (
      values: IFormValue,
      actions: Readonly<FormikHelpers<IFormValue>>,
    ): void => {
      const setCurrency = async (query: string) => {
        const { from, to, amount } = parseQuery(query);
        const convertedResult: number = await convertCurrency(from, to, amount);
        setResult(`${query} = ${convertedResult}`);
      };
      const query = values.query.trim();
      setCurrency(query);
      actions.resetForm();
    },
  });
  const showTooltip = formik.touched.query && formik.errors.query ? 'd-block' : 'd-none';
  const tooltipClass = `invalid-tooltip ${showTooltip}`;

  return (
    <div className="d-flex flex-column">
      <form
        className="row g-3 align-items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-auto">
          <label htmlFor="converter" className="col-form-label">
            Converter
          </label>
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            id="converter"
            name="converter"
            placeholder="15 usd in eur"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.query}
          />
          <div className={tooltipClass}>
            {formik.touched.query && formik.errors.query}
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary ms-3">
            Convert
          </button>
        </div>
      </form>
      <p className="result mt-3">
        Convertation:&nbsp;
        {result}
      </p>
    </div>
  );
};

export default Convertation;
