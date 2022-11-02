import React, { useState } from 'react';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import { IFormConvert } from '../interfaces/interfaces';
import validationSchema from '../validationSchema';
import parseQuery from '../parseQuery';
import useHttp from '../hooks';
import MakeRequest from '../makeRequest';

const Convertation: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const httpClient: MakeRequest = useHttp();

  const formik: FormikProps<IFormConvert> = useFormik<IFormConvert>({
    initialValues: { converterQuery: '' },
    validationSchema,
    onSubmit: async (
      values: IFormConvert,
      actions: Readonly<FormikHelpers<IFormConvert>>,
    ) => {
      const query = values.converterQuery.trim();
      const { from, to, amount } = parseQuery(query);
      const convertedResult: number = await httpClient.convertCurrency(from, to, amount);
      setResult(`${query} = ${convertedResult}`);
      actions.resetForm();
    },
  });
  const showTooltip = formik.errors.converterQuery ? 'd-block' : 'd-none';
  const tooltipClass = `invalid-tooltip w-100 ${showTooltip}`;

  return (
    <div className="d-flex flex-column">
      <form
        className="row g-3 align-items-center form needs-validation"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-auto">
          <label htmlFor="converterQuery" className="col-form-label">
            Converter
          </label>
        </div>
        <div className="col-auto position-relative p-0">
          <input
            type="text"
            className="form-control"
            id="converterQuery"
            name="converterQuery"
            placeholder="15 usd in eur"
            onChange={formik.handleChange}
            value={formik.values.converterQuery}
            disabled={formik.isSubmitting}
          />
          <div className={tooltipClass}>
            {formik.errors.converterQuery}
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary ms-3" disabled={formik.isSubmitting}>
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
