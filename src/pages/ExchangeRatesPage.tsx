import React, { useEffect, useState } from 'react';
import { useFormik, FormikProps, FormikHelpers } from 'formik';
import IRate, { IFormExchange, IMakeRequest } from '../interfaces/interfaces';
import { currencySchema } from '../utils/validationSchema';
import useHttp from '../hooks';
import ExchangeRates from '../components/exchangeRates';
import ExchangeRatesForm from '../components/excangeRatesForm';

const ExchangeRatesPage: React.FC = () => {
  return (
    <div className="card w-25  text-center">
      <ExchangeRates />
      <ExchangeRatesForm />
    </div>
  );
};

export default ExchangeRatesPage;
